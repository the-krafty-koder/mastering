import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  const categories = catalog.findCategories();
  res.status(200).json(categories);
});
router.get("/catalog/:categoryId", (req, res) => {
  const categoryId = req.params.categoryId;
  const categories = catalog.findItems(categoryId);

  if (categories === undefined) {
    res.status(404).send("Not found");
  } else {
    res.status(200).json(categories);
  }
});
