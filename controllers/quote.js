const { Quote } = require("../models");
const Axios = require("axios");

const RandomQuotes = async (req, res, next) => {
  try {
    //get random quotes from 3rd public api
    let { data: randomQuote } = await Axios.get("https://api.kanye.rest/");

    //create random quote to database
    let newQuote = await Quote.create({
      quote: randomQuote.quote,
      favorites: false,
    });

    req.socket.emit("new-quote", newQuote);
    //send response data to fe
    res.status(200).json({
      success: true,
      message: "get random quote success",
      data: newQuote,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const GetAllQuotes = async (req, res, next) => {
  try {
    const quotes = await Quote.findAll();

    let resQuote = [];
    let favorites = [];

    quotes.map((item) => {
      if (item.favorites === true) {
        favorites.push(item);
      } else {
        resQuote.push(item);
      }
    });

    res.status(200).json({
      success: true,
      message: "get all quotes success",
      data: {
        quotes: resQuote,
        favorites,
      },
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const AddQuotes = async (req, res, next) => {
  try {
    const { quote } = req.body;
    if (!quote) throw { name: "quote required" };

    let newQuote = await Quote.create({ quote, favorites: false });

    req.socket.emit("new-quote", newQuote);
    res.status(201).json({
      success: true,
      message: "create quote success",
      data: newQuote,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const UpdateQuote = async (req, res, next) => {
  try {
    let { id } = req.params;
    let { favorites } = req.query;
    if (!id) throw { name: "id is required" };
    if (!favorites || favorites === "") throw { name: "favorites is required" };

    favorites = favorites.toLowerCase();
    let newFav;
    if (favorites === "true" || favorites === true) {
      newFav = true;
    } else if (favorites === "false" || favorites === false) {
      newFav = false;
    }

    let findQuote = await Quote.findByPk(+id);
    if (!findQuote) throw { name: "quote is not found" };

    let updatedQuote = await Quote.update(
      { favorites: newFav },
      {
        where: {
          id,
        },
        returning: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "update quote success",
      data: updatedQuote[1][0],
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const DeleteQuote = async (req, res, next) => {
  try {
    let { id } = req.params;
    if (!id) throw { name: "id is required" };

    let findQuote = await Quote.findByPk(+id);
    if (!findQuote) throw { name: "quote is not found" };

    let deletedQuote = await Quote.destroy({
      where: { id: +id },
    });

    res.status(200).json({
      success: true,
      message: `Quote with id: ${id} deleted successfully`,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = {
  RandomQuotes,
  GetAllQuotes,
  AddQuotes,
  UpdateQuote,
  DeleteQuote,
};
