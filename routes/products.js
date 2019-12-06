const Product = require("../models/Product");
const uuidv1 = require("uuid/v1");
module.exports = {
  /* ----------------------------------- GET ---------------------------------- */
  getProducts: (req, res) => {
    Product.find()
      .then(p => {
        return res.status(200).json(p);
      })
      .catch(err => {
        return res.status(500).send("err");
      });
  },

  /* ---------------------------------- POST ---------------------------------- */
  saveProduct: (req, res) => {
    var newProduct = {
      name: "Best prod",
      description: "Test desc",
      price: 4000
    };
    var product = new Product(newProduct);
    product
      .save()
      .then(item => {
        return res
          .status(200)
          .json({ product: `Product Saved id=${item._id}` });
      })
      .catch(err => {
        return res.status(500).json({ message: err._message });
      });
  },

  /* ----------------------------------- PUT ---------------------------------- */
  updateProduct: (req, res) => {
    Product.updateOne({ _id: "5de43aac680e470ed8e6f9d0" }, { price: 10000 })
      .then(() => {
        return res.status(200).send("SUCCESS");
      })
      .catch(err => {
        return res.status(500).send("ERROR");
      });
  }
};
