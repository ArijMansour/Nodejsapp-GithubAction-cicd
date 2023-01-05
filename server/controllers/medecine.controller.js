// YA RAB SAHLI FI EYA
const Medecine = require("../models/medecine.model");
const Category = require("../models/category.model");

const cloudinary = require("../utils/cloudinary");

const asyncHandler = require("express-async-handler");
const fs = require("fs");
const stockModel = require("../models/stock.model");

async function updateStock(name, qty, countInStock) {
  const product = await stockModel.findOne({ item: name });
  console.log("product stock : ", product);

  product.quantity -= qty;

  countInStock = product.quantity;

  await product.save({ validateBeforeSave: false });
}

exports.addMedecineController = async (req, res, next) => {
  let urls = [];

  let countInStock = 0;
  const {
    name,
    description,
    price,
    expiresDate,
    inStock,
    category,
    numReviews,
    typeMedicine,
  } = req.body;
  console.log("medecine =", req.body.typeMedicine);
  stockModel.findOne({ item: name }, async (err, stock) => {
    if (err) return next(err);

    if (stock) {
      Medecine.findOne(
        {
          name,
        },
        async (err, medecine) => {
          if (err) return next(err);

          if (medecine) {
            return res.json({
              error: "Medecine  already exist",
              success: false,
              medecineExist: true,
            });
          } else {
            countInStock = stock.quantity;
            console.log("quantity", stock.quantity);
            console.log("countInStock", countInStock);

            const uploader = async (path) =>
              await cloudinary.uploads(path, "Images");

            const files = req.files;
            console.log("***********");
            console.log("files = ", files);
            for (const file of files) {
              const { path } = file;
              const newPath = await uploader(path);
              urls.push(newPath);
              fs.unlinkSync(path);
            }

            let multiple_resources = urls;
            const currentPharmacy = req.user._id;

            const medecine = await new Medecine({
              name,
              description,
              price,
              expiresDate,
              inStock,
              multiple_resources,
              category,
              pharmacy: currentPharmacy,
              countInStock: countInStock,
              numReviews: 0,
              typeMedicine,
            });

            medecine
              .save()
              .then((result) => {
                console.log(result);
                return res.json({
                  success: true,
                  message: "Successfully added!",
                  result: {
                    _id: result._id,
                    name: result.name,
                    description: result.description,
                    price: result.price,
                    expiresDate: result.expiresDate,
                    inStock: result.inStock,
                    multiple_resources: result.multiple_resources,
                    category: result.category,
                    pharmacy: result.pharmacy,
                    countInStock,
                    numReviews,
                    typeMedicine,
                  },
                });
              })
              .catch((err) => {
                return res.json({
                  success: false,
                  message: "Create Medecine failed" + err,
                });
              });

            // console.log(err);
          }
        }
      );
    } else {
      return res.json({
        error: "this medicine  not available in your stock",
        success: false,
        exist: false,
      });
    }
  });
};

exports.getAllMedecinesController = async (req, res) => {
  return res.json(
    await Medecine.find({ pharmacy: req.user._id })
      .populate("category pharmacy")
      .sort({ createdAt: -1 })
      .exec()
  );
};

exports.getAllMedecinesPatientController = async (req, res) => {
  return res.json(
    await Medecine.find({ typeMedicine: "cosmetic" })
      .populate("category pharmacy")
      .sort({ createdAt: -1 })
      .exec()
  );
};

exports.getCategoryController = async (req, res, next) => {
  const id = req.body.id;
  console.log(id);
  Category.findById(id).exec((err, cat) => {
    console.log(cat);
    if (err || !cat) {
      return res.status(400).json({
        error: "Category not found",
      });
    }

    res.json(cat);
  });
};

exports.getMedecineByIdController = async (req, res, next) => {
  const id = req.params.id;
  Medecine.findById(id)
    .populate("category pharmacy")
    .exec((err, cat) => {
      if (err || !cat) {
        return res.status(400).json({
          error: "Medecine not found",
        });
      }

      res.json(cat);
    });
};
exports.updateMedecineController = async (req, res) => {
  Medecine.findByIdAndUpdate(req.params.id, req.body, function (err, data) {
    if (err) return res.json({ success: false, errors: err });
    else
      return res.json({
        success: true,
        message: "Medecine updated",
        data: req.body,
      });
  });
};

exports.removeMedecineController = async (req, res) => {
  console.log("*****************************", req.params.id);
  Medecine.deleteOne({ _id: req.params.id })
    .then((res) =>
      res.json({
        success: true,
        message: deleted,
      })
    )
    .catch((err) => res.json({ success: false, errors: err }));
};

exports.searchMedecineController = async (req, res) => {
  let cat = Medecine.find({}).sort({ createdAt: -1 }).exec();
  const { q } = req.query;

  const keys = ["name"];

  const search = (data) => {
    return data.filter((item) =>
      keys.some((key) => item[key].toLowerCase().includes(q))
    );
  };

  q ? res.json(search(cat)) : res.json(cat);
};
exports.assignCatToProdController = async (req, res) => {
  try {
    const dataFind = await Category.findOne({ name: req.body.nameCategory });
    console.log(dataFind);
    const dataUpdate = await Medecine.updateOne(
      { name: req.body.nameMedecine },
      { category: dataFind._id },
      { upsert: true }
    );

    console.log(dataUpdate);
    res.json({
      statue: true,
      message: "Category Assigned Succefully",
      result: dataUpdate,
    });
  } catch (error) {
    res.status(400).json({ statue: false, message: error.message });
  }
};

// METIERS

// @desc Fetch all products
// @route GET /api/products
// @access Public

exports.getMedecinesController = asyncHandler(async (req, res) => {
  const Cg = req.query.Cg;
  const filter = req.query.filter;
  const from = req.query.from;
  const to = req.query.to;
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  console.log(req.query.keyword);

  if (Cg) {
    const cat = await Category.findOne({ name: Cg }).exec();

    if (cat) {
      const products = await Medecine.find({
        typeMedicine: "cosmetic",
        category: cat._id,
      }).populate("category pharmacy");

      console.log("*****");

      return res.json(products);
    } else {
      return;
    }
  } else if (filter) {
    switch (filter) {
      case "Rating":
        const productsbyrating = await Medecine.find({
          typeMedicine: "cosmetic",
        })
          .populate("category pharmacy")

          .sort("-rating")
          .exec();
        return res.json(productsbyrating);

        break;
      case "date":
        const productsbydate = await Medecine.find({ typeMedicine: "cosmetic" })
          .populate("category pharmacy")

          .sort("createdAt")
          .exec();
        return res.json(productsbydate);
        break;
      case "highprice":
        const productsbyhighprice = await Medecine.find({
          typeMedicine: "cosmetic",
        })
          .populate("category pharmacy")
          .sort("price");
        return res.json(productsbyhighprice);

        break;
      case "lowprice":
        const productsbylowprice = await Medecine.find({
          typeMedicine: "cosmetic",
        })
          .populate("category pharmacy")
          .sort("-price")
          .exec();
        return res.json(Medecinesbylowprice);
        break;

      default:
        break;
    }
  } else if (from && to) {
    const productbyprice = await Medecine.find({
      price: { $lte: to },
      price: { $gte: from },
    });
    return res.json(productbyprice);
  } else {
    const products = await Medecine.find({
      ...keyword,
      typeMedicine: "cosmetic",
    }).populate("category pharmacy");
    return res.json(products);
  }
});

// @desc Fetch single  product
// @route GET /api/products/:id
// @access Public
exports.getMedecineController = asyncHandler(async (req, res) => {
  const product = await Medecine.findById(req.params.id).populate(
    "category pharmacy"
  );
  if (product) {
    return res.json(product);
  } else {
    // status it's 500 by default cuz of errHandler
    return res.status(404);
    throw new Error("Product not found");
  }
});

// @desc Create new Review
// @route PUT /api/products/:id/reviews
// @access Private
exports.createMedecineReviewController = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Medecine.findById(req.params.id);
  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );
    if (alreadyReviewed) {
      return res.status(404);
      throw new Error("Product Already Review");
    }
    const review = {
      name: req.user.username,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;
    await product.save();
    return res.status(201).json({ message: "Review added" });
  } else {
    return res.status(404);
    throw new Error("Product Not found");
  }
});
