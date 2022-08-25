const router = require("express").Router();
const { Register, Login } = require("../../controllers/user");
const { errorHandler } = require("../../middleware/errorHandler");
const { userAuthentication } = require("../../middleware/authentication");
const {
  RandomQuotes,
  GetAllQuotes,
  AddQuotes,
  UpdateQuote,
  DeleteQuote,
} = require("../../controllers/quote");

router.post("/register", Register);
router.post("/login", Login);

router.use(userAuthentication);
router.get("/quotes", GetAllQuotes);
router.post("/quotes", AddQuotes);
router.patch("/quotes/:id", UpdateQuote);
router.delete("/quotes/:id", DeleteQuote);
router.get("/random-quotes", RandomQuotes);

router.use(errorHandler);

module.exports = router;
