const coffeeModel = require("../models/index").coffee;
const upload = require("./upload.image").single(`image`);
const { Op } = require("sequelize");
const path = require("path");
const fs = require("fs");

exports.addCoffee = (req, res) => {
  upload(req, res, async (error) => {
    if (error) {
      return res.json({ message: error });
    }

    if (!req.file) {
      return res.json({ message: "Nothing to Upload" });
    }

    let newCoffee = {
      name: req.body.name,
      size: req.body.size,
      price: req.body.price,
      image: req.file.filename,
    };

    coffeeModel
      .create(newCoffee)
      .then((result) => {
        return res.json({
          success: true,
          data: result,
          message: `New Event has been inserted`,
        });
      })
      .catch((error) => {
        return res.json({
          success: false,
          message: error.message,
        });
      });
  });
};

exports.findCoffee = async (req, res) => {
  let keyword = req.params.key;

  let coffees = await coffeeModel.findAll({
    where: {
      [Op.or]: [
        { coffeeID: { [Op.substring]: keyword } },
        { name: { [Op.substring]: keyword } },
        { size: { [Op.substring]: keyword } },
        { price: { [Op.substring]: keyword } },
      ],
    },
  });

  res.json({
    status: true,
    data: coffees,
    message: "Coffee has retrieved",
  });
};

exports.updateCoffee = async (request, response) => {
  upload(request, response, async (error) => {
    if (error) {
      return response.json({ message: error });
    }
    let coffeeID = request.params.id;
    let datacoffee = {
      coffeeID,
      name: request.body.name,
      size: request.body.size,
      price: request.body.price,
      image: request.file.filename,
    };
    if (request.file) {
      const selectedCoffee = await coffeeModel.findOne({
        where: { coffeeID: coffeeID },
      });
      const oldImage = selectedCoffee.image;
      const pathImage = path.join(__dirname, `../image`, oldImage);
      if (fs.existsSync(pathImage)) {
        fs.unlink(pathImage, (error) => console.log(error));
      }
      datacoffee.image = request.file.filename;
    }
    coffeeModel
      .update(datacoffee, { where: { coffeeID: coffeeID } })
      .then((result) => {
        return response.json({
          success: true,
          data: datacoffee,
          message: "Coffee has updated",
        });
      })
      .catch((error) => {
        return response.json({
          success: false,
          message: error.message,
        });
      });
  });
};

exports.deleteCoffee = async (request, response) => {
  const coffeeID = request.params.id;
  const coffee = await coffeeModel.findOne({ where: { coffeeID: coffeeID } });
  if (!coffee) {
    return response.json({
      success: false,
      message: "Coffee not found",
    });
  }
  const oldImage = coffee.image;
  const pathImage = path.join(__dirname, `../image`, oldImage);
  if (fs.existsSync(pathImage)) {
    fs.unlink(pathImage, (error) => console.log(error));
  }
  coffeeModel
    .destroy({ where: { coffeeID: coffeeID } })
    .then((result) => {
      return response.json({
        success: true,
        data: coffee,
        message: "Coffee has deleted",
      });
    })
    .catch((error) => {
      return response.json({
        success: false,
        message: error.message,
      });
    });
};


exports.getAllCoffee = async (req, res) => {
  let events = await coffeeModel.findAll();
  return res.json({
    success: true,
    data: events,
    message: `All Events have been loaded`,
  });
};
