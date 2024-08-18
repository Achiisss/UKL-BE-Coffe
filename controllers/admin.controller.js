const adminModel = require("../models/index").admin;
const md5 = require('md5');
const { Op } = require('sequelize');

exports.addAdmin = async (req, res) => {
  try {
    const newAdminn = {
      name: req.body.name, // Ubah menjadi req.body.name
      email: req.body.email,
      password: md5(req.body.password) 
    };
    const newAdmin = await adminModel.create(newAdminn);
    res.status(201).json(newAdmin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
