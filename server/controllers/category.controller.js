const Category = require("../models/category.model");

exports.addCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    // const category = await new Category({ name, slug: slugify(name) }).save();
    // res.json(category);
    return res.json(await new Category({ name }).save());
  } catch (err) {
    console.log(err);
    return res.json({ success: false, message: "Create category failed" });
  }
};

exports.getAllCategoriesController = async (req, res) => {
  return res.json(await Category.find({}).sort({ createdAt: -1 }).exec());
};

exports.getCategoryByIdController = async (req, res, next) => {
  const id = req.params.id;
  Category.findById(id).exec((err, cat) => {
    if (err || !cat) {
      return res.status(400).json({
        error: "category not found",
      });
    }

    res.json(cat);
  });
};
exports.updateCategoryController = async (req, res) => {
  Category.findByIdAndUpdate(req.params.id, req.body, function (err, data) {
    if (err) return res.json({ success: false, errors: err });
    else
      return res.json({
        success: true,
        message: "category updated",
        data: req.body,
      });
  });
};

exports.removeCategoryController = async (req, res) => {
  Category.deleteOne({ _id: req.params.id })
    .then((res) =>
      res.json({
        success: true,
        message: deleted,
      })
    )
    .catch((err) => res.json({ success: false, errors: err }));
};

exports.searchCategoryController = async (req, res) => {
  let cat = Category.find({}).sort({ createdAt: -1 }).exec();
  const { q } = req.query;

  const keys = ["name"];

  const search = (data) => {
    return data.filter((item) =>
      keys.some((key) => item[key].toLowerCase().includes(q))
    );
  };

  q ? res.json(search(cat)) : res.json(cat);
};
