const { request } = require("express");
const { Category } = require("../../db/models");

module.exports = {
  getAllCategories: async (req, res, next) => {
    try {
      const categories = await Category.findAll({
        where: { user: req.user.id },
        attributes: ["id", "name"],
      });

      res.status(200).json({
        message: "Success get all categories",
        data: categories,
      });
    } catch (err) {
      next(err);
    }
  },

  createCategories: async (req, res, next) => {
    try {
      const { name } = req.body;

      const categories = await Category.create({
        name: name,
        user: req.user.id,
      });

      res.status(201).json({
        message: "Success create categories",
        data: categories,
      });
    } catch (err) {
      next(err);
    }
  },

  updateCategories: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const checkCategory = await Category.findOne({
        where: {
          id: id,
          user: req.user.id,
        },
      });

      const categories = await checkCategory.update({ name: name });
      res.status(200).json({
        message: "Success update category",
        data: categories,
      });
    } catch (err) {
      next(err);
    }
  },

  deleteCategories: async (req, res, next) => {
    try {
      const checkId = await Category.findOne({ where: { id: req.params.id } });

      if (!checkId) {
        return res.status(404).json({ message: "id category not found" });
      }

      checkId.destroy().then(function () {
        res.status(200).json({
          message: "Books deleted.",
          data: checkId,
        });
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  },
};