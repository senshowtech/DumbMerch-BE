const { user, profile, chat } = require("../../models");

const socketIo = (io) => {
  io.on("connection", (socket) => {
    console.log("client connect:", socket.id);

    socket.on("load admin contact", async () => {
      try {
        const adminContact = await user.findOne({
          where: {
            status: "admin",
          },
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

        // custommerContacts = JSON.parse(JSON.stringify(custommerContacts));

        // custommerContacts = custommerContacts.map((item) => {
        //   return {
        //     ...item,
        //   };
        // });

        socket.emit("custommer contacts", custommerContacts);
      } catch (err) {
        console.log(err);
      }
    });

    socket.on("disconnect", () => {
      console.log("client disconnect");
    });
  });
};

module.exports = socketIo;
