const BaseRepository = require("./baseRepositories");
const { Recipe, Ingredient, User } = require('../models'); // TAMBAHKAN User

class RecipeRepository extends BaseRepository {
    constructor(){
        super(Recipe);
    }

    async findAllRecipes(){
        return await this.model.findAll({
            include: [
                {
                    model: User, 
                    as: 'creator',
                    attributes: ['id', 'firstName', 'lastName', 'email'] 
                },
                {
                    model: Ingredient,
                    as: 'ingredients'
                   
                }
            ]
        });
    }

    async findRecipeById(id){
        return await this.model.findByPk(id, {
            include: [
                {
                    model: User,
                    as: 'creator',
                    attributes: ['id', 'firstName', 'lastName', 'email']
                },
                {
                    model: Ingredient,
                    as: 'ingredients'
                   
                }
            ]
        });
    }

    async findRecipesByUserId(userId) {
        return await this.model.findAll({
            where: { userId },
            include: [
                {
                    model: Ingredient,
                    as: 'ingredients'
                   
                }
            ]
        });
    }

    async createRecipe(recipeData){
        return await this.model.create(recipeData);
    }

    async updateRecipe(id, recipeData){
        const [updatedRowsCount] = await this.model.update(recipeData,{
            where: { id }
        });

        if(updatedRowsCount === 0){
            return null;
        }

        return await this.model.findByPk(id);
    }

    async deleteRecipe(id){
        const deletedRowsCount = await this.model.destroy({
            where: { id }
        });
        return deletedRowsCount > 0;
    }

    
}

module.exports = new RecipeRepository();