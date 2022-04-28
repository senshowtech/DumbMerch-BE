"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "products",
      [
        {
          title: "products",
          desc: "desc",
          image:
            "http://localhost:5000/uploads/1651151393901-Screenshotfrom2022-04-2815-58-41.png",
          price: 100,
          qty: 100,
          kurir: JSON.stringify([
            {
              idkota: "252",
            },
            {
              namakota: "Majalengka",
            },
            {
              kurir: "jne",
            },
            {
              weight: "10",
            },
            {
              idprovinsi: "9",
            },
            {
              namaprovinsi: "Jawa Barat",
            },
          ]),
          idUser: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "products",
          desc: "desc",
          image:
            "http://localhost:5000/uploads/1651151393901-Screenshotfrom2022-04-2815-58-41.png",
          price: 100,
          qty: 100,
          kurir: JSON.stringify([
            {
              idkota: "252",
            },
            {
              namakota: "Majalengka",
            },
            {
              kurir: "jne",
            },
            {
              weight: "10",
            },
            {
              idprovinsi: "9",
            },
            {
              namaprovinsi: "Jawa Barat",
            },
          ]),
          idUser: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "products",
          desc: "desc",
          image:
            "http://localhost:5000/uploads/1651151393901-Screenshotfrom2022-04-2815-58-41.png",
          price: 100,
          qty: 100,
          kurir: JSON.stringify([
            {
              idkota: "252",
            },
            {
              namakota: "Majalengka",
            },
            {
              kurir: "jne",
            },
            {
              weight: "10",
            },
            {
              idprovinsi: "9",
            },
            {
              namaprovinsi: "Jawa Barat",
            },
          ]),
          idUser: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "products",
          desc: "desc",
          image:
            "http://localhost:5000/uploads/1651151393901-Screenshotfrom2022-04-2815-58-41.png",
          price: 100,
          qty: 100,
          kurir: JSON.stringify([
            {
              idkota: "252",
            },
            {
              namakota: "Majalengka",
            },
            {
              kurir: "jne",
            },
            {
              weight: "10",
            },
            {
              idprovinsi: "9",
            },
            {
              namaprovinsi: "Jawa Barat",
            },
          ]),
          idUser: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "products",
          desc: "desc",
          image:
            "http://localhost:5000/uploads/1651151393901-Screenshotfrom2022-04-2815-58-41.png",
          price: 100,
          qty: 100,
          kurir: JSON.stringify([
            {
              idkota: "252",
            },
            {
              namakota: "Majalengka",
            },
            {
              kurir: "jne",
            },
            {
              weight: "10",
            },
            {
              idprovinsi: "9",
            },
            {
              namaprovinsi: "Jawa Barat",
            },
          ]),
          idUser: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "products",
          desc: "desc",
          image:
            "http://localhost:5000/uploads/1651151393901-Screenshotfrom2022-04-2815-58-41.png",
          price: 100,
          qty: 100,
          kurir: JSON.stringify([
            {
              idkota: "252",
            },
            {
              namakota: "Majalengka",
            },
            {
              kurir: "jne",
            },
            {
              weight: "10",
            },
            {
              idprovinsi: "9",
            },
            {
              namaprovinsi: "Jawa Barat",
            },
          ]),
          idUser: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "products",
          desc: "desc",
          image:
            "http://localhost:5000/uploads/1651151393901-Screenshotfrom2022-04-2815-58-41.png",
          price: 100,
          qty: 100,
          kurir: JSON.stringify([
            {
              idkota: "252",
            },
            {
              namakota: "Majalengka",
            },
            {
              kurir: "jne",
            },
            {
              weight: "10",
            },
            {
              idprovinsi: "9",
            },
            {
              namaprovinsi: "Jawa Barat",
            },
          ]),
          idUser: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "products",
          desc: "desc",
          image:
            "http://localhost:5000/uploads/1651151393901-Screenshotfrom2022-04-2815-58-41.png",
          price: 100,
          qty: 100,
          kurir: JSON.stringify([
            {
              idkota: "252",
            },
            {
              namakota: "Majalengka",
            },
            {
              kurir: "jne",
            },
            {
              weight: "10",
            },
            {
              idprovinsi: "9",
            },
            {
              namaprovinsi: "Jawa Barat",
            },
          ]),
          idUser: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
