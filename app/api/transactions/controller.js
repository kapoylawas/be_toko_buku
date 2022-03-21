const { Transaction, DetailTransaction } = require("../../db/models");
const { Op } = require("sequelize");

module.exports = {
  getTransactionList: async (req, res, next) => {
      try {
        const { keyword = '' } = req.query;

        let condition = {
          user: req.user.id,
        };
  
        //keyword pencarian books   
        if (keyword != "") {
          condition = { ...condition, invoice: { [Op.like]: `%${keyword}%` } };
        } 
  
        //untuk menampilkan data all books dan join category   
        const transaction = await Transaction.findAll({
          where: condition,
          include : {
              model : DetailTransaction,
              as: 'detailTransaction',
          }
        });
  
        //status message   
        res.status(200).json({
          message: "Success get all transaction",
          data: transaction,
        });
      } catch (err) {
          next(err)
      }
  },

  detailTransactionList: async (req, res, next) => {
    try {
      const { id } = req.params; 

      //untuk menampilkan data all books dan join category   
      const detailTransaction = await Transaction.findAll({
        where: {id : id},
        include : {
            model : DetailTransaction,
            as: 'detailTransaction',
        }
      });

      //status message   
      res.status(200).json({
        message: "Success get all detail transaction",
        data: detailTransaction,
      });
    } catch (err) {
        next(err)
    }
}
};