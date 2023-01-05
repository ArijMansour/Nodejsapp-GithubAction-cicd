const Stock = require("../models/stock.model");

exports.addStockController = async (req, res) => {
  try {
    const { item, quantity, state } = req.body;
    console.log(item);

    await Stock.findOne({ item: req.body.item }).exec((err, data) => {
      if (data) {
        return res.json({
          success: false,
          message: "Stock with this item already exist",
        });
      } else {
        return res.json(new Stock({ item, quantity, state }).save());
      }
    });
    // const Stock = await new Stock({ name, slug: slugify(name) }).save();
    // res.json(Stock);
  } catch (err) {
    console.log(err);
    return res.json({ success: false, message: "Create Stock failed" });
  }
};

exports.getAllStocksController = async (req, res) => {
  return res.json(await Stock.find({}).sort({ createdAt: -1 }).exec());
};

exports.getStockByIdController = async (req, res, next) => {
  const id = req.params.id;
  Stock.findById(id).exec((err, cat) => {
    if (err || !cat) {
      return res.status(400).json({
        error: "Stock not found",
      });
    }

    res.json(cat);
  });
};
exports.updateStockController = async (req, res) => {
  Stock.findByIdAndUpdate(req.params.id, req.body, function (err, data) {
    if (err) return res.json({ success: false, errors: err });
    else
      return res.json({
        success: true,
        message: "Stock updated",
        data: req.body,
      });
  });
};

exports.removeStockController = async (req, res) => {
  Stock.deleteOne({ _id: req.params.id })
    .then((res) =>
      res.json({
        success: true,
        message: deleted,
      })
    )
    .catch((err) => res.json({ success: false, errors: err }));
};

exports.searchStockController = async (req, res) => {
  let cat = Stock.find({}).sort({ createdAt: -1 }).exec();
  const { q } = req.query;

  const keys = ["name"];

  const search = (data) => {
    return data.filter((item) =>
      keys.some((key) => item[key].toLowerCase().includes(q))
    );
  };

  q ? res.json(search(cat)) : res.json(cat);
};
