const Category = require('../../models/Category')
const Product = require('../../models/Product')
const Review = require('../../models/Review')




module.exports = {
    Query : {
        hello:() => 'Hello from the resolver! after seperate the logic',
        categories: async () => {
            try {
                const categories = await Category.find().populate('products');
                console.log(categories)
                return categories;
            } catch (error) {
                throw new Error(`Failed to fetch categories: ${error.message}`);
            }
        },
        products: async () => {
            try {
                const products = await Product.find()
                console.log(products)
                return products;
            } catch (error) {
                throw new Error(`Failed to fetch products: ${error.message}`);
            }
        },
        reviews : async () => {
            try {
                const reviews = await Review.find()
                console.log(reviews)
                return reviews;
            } catch (error) {
                throw new Error(`Failed to fetch reviews: ${error.message}`);
            }
        }
    }
};

