const Category = require('../../models/Category')
const Product = require('../../models/Product')
const Review = require('../../models/Review')


module.exports = {
    Mutation: {
        addCategory : async ({input}) => {
            try {
                const newCategory = new Category({
                    name: input.name
                });
                //console.log(newCategory)
                const savedCategory = await newCategory.save()
                return savedCategory;
            } catch (error) {
                console.log(error)
                throw new Error(`Failed to add category: ${error.message}`);
            }
        },
        updateCategory: async ({input}) => {
            try {
                const category = await Category.findById(input.id);
                if (!category) {
                    throw new Error(`Category with ID ${input.id} not found`);
                }
                category.name = input.name;
                const updatedCategory = await category.save();
                return updatedCategory;
            }
            catch (error) {
                throw new Error(`Failed to update category: ${error.message}`);
            }
        },
        deleteCategory: async ({id}) => {
            try {
                const category = await Category.findByIdAndDelete(id);
                if (!category) {
                    throw new Error(`Category with ID ${id} not found`);
                }
                await Product.updateMany({ categoryId: id }, { $set: { categoryId: null } });
                return true;
            }
            catch (error) {
                throw new Error(`Failed to delete category: ${error.message}`);
            }
        },
        addProduct: async ({ input }) => {
            try {
                const newProduct = new Product({
                    name: input.name,
                    description: input.description,
                    quantity: input.quantity,
                    image: input.image,
                    price: input.price,
                    onSale: input.onSale,
                    categoryId: input.categoryId,
                });
                const savedProduct = await newProduct.save();

                const category = await Category.findById(input.categoryId);

                if (!category) {
                    throw new Error(`Category with ID ${input.categoryId} not found`);
                }

                category.products.push(savedProduct)

                await category.save()


                return savedProduct;
            } catch (error) {
                throw new Error(`Failed to add product: ${error.message}`);
            }
        },
        updateProduct: async ({ input }) => {
            try {
                const { id, ...updates } = input;
                const product = await Product.findByIdAndUpdate(id, updates, { new: true });

                if (!product) {
                    throw new Error(`Product with ID ${id} not found`);
                }

                return product;
            } catch (error) {
                throw new Error(`Failed to update product: ${error.message}`);
            }
        },
        deleteProduct: async ({ id }) => {
            try {
                const product = await Product.findByIdAndDelete(id);
                if (!product) {
                    throw new Error(`Product with ID ${id} not found`);
                }
                return true;
            }
            catch (error) {
                throw new Error(`Failed to delete product: ${error.message}`);
            }
        },
        addReview: async ({ input }) => {
            try {
                const newReview = new Review({
                    title: input.title,
                    comment: input.comment,
                    rating: input.rating,
                    productId: input.productId,
                })
                const savedReview = await newReview.save();
                return savedReview;
            } catch (error) {
                throw new Error(`Failed to add review: ${error.message}`);
            }
        },
        updateReview: async ({ input }) => {
            try {
                const { id,...updates } = input;
                const review = await Review.findByIdAndUpdate(id, updates, { new: true });
                if (!review) {
                    throw new Error(`Review with ID ${id} not found`);
                }
                return review;
                
            } catch (error) {
                throw new Error(`Failed to update review: ${error.message}`);
            }
        },
        deleteReview: async ({ id }) => {
            try {
                const review = await Review.findByIdAndDelete(id);
                if (!review) {
                    throw new Error(`Review with ID ${id} not found`);
                }
                return true;
            }
            catch (error) {
                throw new Error(`Failed to delete review: ${error.message}`);
            }
        }
    }
}