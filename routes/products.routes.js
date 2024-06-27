import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.status(200).json(products);
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
});

router.get("/:id", async (req, res) => {
  // const id = req.params.id;
  try {
    const product = await prisma.product.findFirst({
      where: { id: req.params.id },
    });
    if (!product) {
      res.status(404).json({ success: false, message: "Product not found" });
    } else {
      res.status(200).json(product);
    }
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const {
      productThumbnail,
      productTitle,
      productDescription,
      productCost,
      onOffer,
    } = req.body;
    const newProduct = await prisma.product.create({
      data: {
        productThumbnail: productThumbnail,
        productTitle: productTitle,
        productDescription: productDescription,
        productCost: parseFloat(productCost.replace("$", "")),
        onOffer: onOffer === "true",
      },
    });
    res.status(201).json({ success: true, data: newProduct });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const {
      productThumbnail,
      productTitle,
      productDescription,
      productCost,
      onOffer,
    } = req.body;

    const dataToUpdate = {};
    if (productThumbnail !== undefined)
      dataToUpdate.productThumbnail = productThumbnail;
    if (productTitle !== undefined) dataToUpdate.productTitle = productTitle;
    if (productDescription !== undefined)
      dataToUpdate.productDescription = productDescription;
    if (productCost !== undefined)
      dataToUpdate.productCost = parseFloat(productCost.replace("$", ""));
    if (onOffer !== undefined) dataToUpdate.onOffer = onOffer === "true";

    if (Object.keys(dataToUpdate).length === 0) {
      return res
        .status(400)
        .json({
          success: false,
          message: "No valid fields provided for update",
        });
    }

    const updatedProduct = await prisma.product.update({
      where: { id: req.params.id },
      data: dataToUpdate,
    });

    res.status(200).json({ success: true, data: updatedProduct });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const product = await prisma.product.delete({
      where: { id: id },
    });
    if (!product) {
      res.status(404).json({ success: false, message: "Product not found" });
    } else {
      res.status(200).send({ success: true, message: "Product deleted" });
    }
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
});
export default router;
