const { user, profile, chat } = require("../../models");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");

const connectedUser = {};
const socketIo = (io) => {
  io.use((socket, next) => {
    if (socket.handshake.auth && socket.handshake.auth.token) {
      next();
    } else {
      next(new Error("Not Authorized"));
    }
  });

  io.on("connection", (socket) => {
    console.log("client connect:", socket.id);
    const userId = socket.handshake.query.id;
    connectedUser[userId] = socket.id;

    socket.on("load admin contact", async () => {
      try {
        const adminContact = await user.findOne({
          where: {
            status: "admin",
          },
          include: [
            {
              model: profile,
              as: "profiles",
              attributes: {
                exclude: ["createdAt", "updatedAt"],
              },
            },
            {
              model: chat,
              as: "recipientMessage",
              attributes: {
                exclude: ["createdAt", "updatedAt"],
              },
            },
            {
              model: chat,
              as: "senderMessage",
              attributes: {
                exclude: ["createdAt", "updatedAt"],
              },
            },
          ],
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
          },
        });
        socket.emit("admin contact", adminContact);
      } catch (err) {
        console.log(err);
      }
    });

    socket.on("load custommer contacts", async () => {
      try {
        let custommerContacts = await user.findAll({
          include: [
            {
              model: profile,
              as: "profiles",
              attributes: {
                exclude: ["createdAt", "updatedAt"],
              },
            },
            {
              model: chat,
              as: "recipientMessage",
              attributes: {
                exclude: ["createdAt", "updatedAt"],
              },
            },
            {
              model: chat,
              as: "senderMessage",
              attributes: {
                exclude: ["createdAt", "updatedAt"],
              },
            },
          ],
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
          },
        });
        socket.emit("custommer contacts", custommerContacts);
      } catch (err) {
        console.log(err);
      }
    });

    socket.on("load messages", async (payload) => {
      try {
        const token = socket.handshake.auth.token;

        const tokenKey = process.env.Token;
        const verified = jwt.verify(token, tokenKey);

        const idRecipient = payload;
        const idSender = verified.id;

        const data = await chat.findAll({
          where: {
            idSender: {
              [Op.or]: [idRecipient, idSender],
            },
            idRecipient: {
              [Op.or]: [idRecipient, idSender],
            },
          },
          include: [
            {
              model: user,
              as: "recipient",
              attributes: {
                exclude: ["createdAt", "updatedAt", "password"],
              },
            },
            {
              model: user,
              as: "sender",
              attributes: {
                exclude: ["createdAt", "updatedAt", "password"],
              },
            },
          ],
          order: [["createdAt", "ASC"]],
          attributes: {
            exclude: ["createdAt", "updatedAt", "idRecipient", "idSender"],
          },
        });
        socket.emit("messages", data);
      } catch (error) {
        console.log(error);
      }
    });

    socket.on("send messages", async (payload) => {
      try {
        const token = socket.handshake.auth.token;

        const tokenKey = process.env.Token;
        const verified = jwt.verify(token, tokenKey);

        // Ambil id sender dari token
        const idSender = verified.id;
        const { message, idRecipient } = payload;

        await chat.create({
          message,
          idRecipient,
          idSender,
        });

        console.log("socket id " + socket.id);
        console.log("connect user " + connectedUser[idRecipient]);

        io.to(socket.id)
          .to(connectedUser[idRecipient])
          .emit("new message", idRecipient);
      } catch (error) {
        console.log(error);
      }
    });

    socket.on("disconnect", () => {
      console.log("client disconnect");
      delete connectedUser[userId];
    });
  });
};

module.exports = socketIo;
