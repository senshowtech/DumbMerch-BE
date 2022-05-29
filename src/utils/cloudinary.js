const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "dumbmerch",
  api_key: "143787338661632",
  api_secret: "4_aBq313FWRYhh-keukagZh8zrw",
});
module.exports = cloudinary;
