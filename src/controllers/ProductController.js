const Product = require('../models/Product')
const multer = require('multer');
const shortid = require('shortid');
const slugify = require('slugify')

// CREATED PRODUCT
exports.CreateProduct = (req, res) => {

    const { name, price, description, category, createdBy, quantity } = req.body


    let productPictures = [];

    if (req.files.length > 0) {
        productPictures = req.files.map(file => {
            return { img: file.filename }
        })
    }

    const product = new Product({
        name,
        slug: slugify(name),
        price,
        description,
        quantity,
        productPictures,
        category,
        createdBy: req.user._id

    });

    product.save(((error, product) => {
        if (error) return res.status(400).json({ error });
        if (product) {
            res.status(200).json({ product })
        }
    }))
}