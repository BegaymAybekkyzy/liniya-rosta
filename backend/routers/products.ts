import express from 'express';
import Product from "../models/Product";

const productRouter = express.Router();

productRouter.get('/' , async (req, res, next) => {
    try {
        const category_id = req.query.category as string;
        const filter: {category?: string} = {};

        if (category_id) filter.category = category_id;

        const products = await Product.find(filter).populate("category", "title");
        res.send(products);
    } catch (e) {
        next(e);
    }
});

productRouter.get('/:id', async (req, res, next) => {
    const id = req.params.id;

    try {
        const product = await Product.findById(id);

        if (!product) {
            res.status(404).send({message: 'Product not found'});
            return;
        }

        res.send(product);
    } catch (e) {
        next(e);
    }
});

export default productRouter;