const Cart = require("../models/Cart");
module.exports = {
  addToCart: (req, res) => {
    var cart = new Cart({ uid: req.body.uid, items: req.body.items });
    cart
      .save()
      .then(ci => {
        return res.status(200).json({ message: "item added to cart" });
      })
      .catch(err => {
        return res.status(500).json({ error: err.message });
      });
  }
};
