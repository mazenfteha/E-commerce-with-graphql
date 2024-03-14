const Category = require('../../models/Category')


module.exports = {
    Query : {
        hello:() => 'Hello from the resolver! after seperate the logic',
        categories: async ({context}) => {
            try {
                const categories = await Category.find();
                //console.log(categories)
                return categories;
            } catch (error) {
                throw new Error(`Failed to fetch categories: ${error.message}`);
            }
        }
    }
};

