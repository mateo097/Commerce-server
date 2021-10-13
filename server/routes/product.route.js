const express = require('express');
const router = express.Router();
const Product = require('../models/Product')
const auth = require('../middleware/auth')
const adminAuth = require('../middleware/adminAuth')
const productById = require('../middleware/productById');
//const formidable = require('formidable')
//const fs = require('fs')

const {
    check,
    validationResult
} = require('express-validator')

// @route   Post api/product/
// @desc    Create a Product
// @access  Private Admin
router.post("/", [
    check('name', 'Name is required').trim().not().isEmpty()
], auth, adminAuth, async(req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: errors.array()[0].msg
        })
    }

    const {
        name,
        description,
        price,
        category,
        quantity,
        shipping,
        img_url

    } = req.body

    const product = new Product({name, description, price, category, quantity, shipping, img_url})

    try {
        await product.save()
        res.json('Product Created Successfully')
    } catch (error) {
        console.log(error)
        res.status(500).send('Server error')
    }
})

// @route   Get api/product/productId
// @desc    Get a Product information
// @access  Public
router.get("/:productId", productById, (req, res) => {
    req.product.photo = undefined;
    return res.json(req.product)
})

/*

// @route   Get api/product/photo/productId
// @desc    Get a Product Image
// @access  Public
router.get("/photo/:productId", productById, (req, res) => {
    if (req.product.photo.data) {
        res.set('Content-Type', req.product.photo.contentType)
        return res.send(req.product.photo.data);
    }

    res.status(400).json({
        error: 'failed to load image'
    })
})

router.post("/", auth, adminAuth, (req, res) => {

    let form = new formidable.IncomingForm()

    form.keepExtensions = true;

    form.parse(req, async (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            })
        }

        if (!files.photo) {
            return res.status(400).json({
                error: 'Image is required'
            })
        }

        if (files.photo.type !== 'image/jpeg' && files.photo.type !== 'image/jpg' && files.photo.type !== 'image/png') {
            return res.status(400).json({
                error: 'Image type not allowed'
            })
        }

        // Check for all fields
        const {
            name,
            description,
            price,
            category,
            quantity,
            shipping
        } = fields;

        if (!name || !description || !price || !category || !quantity || !shipping) {
            return res.status(400).json({
                error: 'All fields are required'
            })
        }


        // 1MB = 1000000
        if (files.photo.size > 1000000) {
            return res.status(400).json({
                error: 'Image should be less than 1MB in size'
            })
        }

        let product = new Product(fields)

        product.photo.data = fs.readFileSync(files.photo.path);
        product.photo.contentType = files.photo.type;

        try {
            await product.save()
            res.json('Product Created Successfully')
        } catch (error) {
            console.log(error)
            res.status(500).send('Server error')
        }
    })
})
*/

module.exports = router