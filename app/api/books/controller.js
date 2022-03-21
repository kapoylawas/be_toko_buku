const { request } = require("express");
const { Book, Category } = require("../../db/models");
const {Op} = require('sequelize')

module.exports = {
  getAllBooks: async (req, res, next) => {
    try {
      const { keyword = '', category = '' } = req.query;

      let condition = {
        user: req.user.id,
      };

      //keyword pencarian books   
      if (keyword != "") {
        condition = { ...condition, title: { [Op.like]: `%${keyword}%` } };
      }

      if (category != "") {
        condition = { ...condition, category: category };
      }

      //untuk menampilkan data all books dan join category   
      const books = await Book.findAll({
        where: condition,
        include : {
            model : Category,
            attributes: ['id', 'name'],
        }
      });

      //status message   
      res.status(200).json({
        message: "Success get all books",
        data: books,
      });
    } catch (err) {
      next(err);
    }
  },

  createBooks: async (req, res, next) => {
    try {
      let user = req.user.id

      const {title, price, category, author, stock, image, published} = req.body;

      const checkCategory = await Category.findOne({
        where:{
          id: category,
          user: user,
        },
      });

      if (!checkCategory) {
        return res.status(404).json({message: 'id category not found'});
      }

      const books = await Book.create({
        title,
        price,
        category,
        author,
        stock,
        image,
        published,
        user: user,
      });

      res.status(201).json({
        message: 'succes create books',
        data: books
      })
    } catch (err) {
      next(err)
    }
  },

  updateBooks: async (req, res, next) => {
    try {
      let user = req.user.id
      const {id} = req.params;

      const {title, price, category, author, stock, image, published} = req.body;

      const checkCategory = await Category.findOne({
        where:{
          id: category,
          user: user,
        },
      });

      if (!checkCategory) {
        return res.status(404).json({message: 'id category not found'});
      }

      const checkBook = await Book.findOne({
        where: {id:id},
      });

      if (!checkBook) {
        return res.status(404).json({message: 'id book not found'});
      }

      const books = await checkBook.update({
        title,
        price,
        category,
        author,
        stock,
        image,
        published,
        user: user,
      });

      res.status(200).json({
        message: 'succes update books',
        data: books
      })
    } catch (err) {
      next(err)
    }
  },

  deleteBooks: async (req, res, next) => {
    try {
      const books = await Book.findOne({where:{id:req.params.id}});

      if (!books) {
        return res.status(404).json({message:'id book not found'})
      }

      books.destroy().then(function () {
        res.status(200).json({
          message: "Books deleted.",
          data: books,
        });
      });

    } catch (err) {
      next(err)
    }
  }
};
