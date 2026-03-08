class BaseRepository {
    constructor(model){
        this.model = model;
    }

    async findAll(options = []){
        return await this.model.findAll(options);
    }

    async findById(id, options = []){
        return await this.model.findByPk(id, options);
    }

    async findOne(where, options = []){
        return await this.model.findOne({where, ...options});
    }

    async create(data){
        return await this.model.create(data);
    }

    async update(id, data){
        const [updatedRowsCount] = await this.model.update(data, {
            where: { id }
        });
        if (updatedRowsCount === 0) {
            throw new Error('Record not found or no changes made');
        }
        return await this.findById(id);
    }

    async delete(id){
        const deletedRowsCount = await this.model.destroy({
            where: { id}
        });
        if(deletedRowsCount === 0){
            throw new Error('Record not found');
        }
        return true
    }

    async count(where = {}){
        return await this.model.count({ where });
    }

    async findAndCount(options = {}){
        return await this.model.findAndCountAll(options);
    }
}

module.exports = BaseRepository;