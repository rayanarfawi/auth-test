const router = require("express").Router();
const product = require("./products");
const auth = require("./auth");
const cart = require("./cart");

//! Global Middleware
router.use(require("../middleware/tokenCheck"));

router.get("/", (req, res) => {
  res.send("E-Commerce api");
});
router.get("/products", product.getProducts);
router.post("/products", product.saveProduct);
router.put("/products", product.updateProduct);

router.post("/auth/signup", auth.signup);
router.post("/auth/login", auth.login);
router.get("/auth/logout", auth.logout);
router.get("/auth/csrf", auth.getCSRF);

router.post("/cart", cart.addToCart);

router.post("/protected", require("../middleware/csrfCheck"), (req, res) => {
  res.status(200).send(req.body.data);
});

module.exports = router;
