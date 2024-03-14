const Category = require('../../models/Category')

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
    }
}