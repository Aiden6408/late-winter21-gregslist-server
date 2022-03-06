import { originAgentCluster } from 'helmet'
import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'


class HousesService {

    async getAll(query = {}) {
        const houses = await dbContext.Houses.find(query)
        return houses
    }
    async getById(id) {

        const house = await dbContext.Houses.findById(id)
        if (!house) {
            throw new BadRequest('invalid house id')
        }
        return house
    }
    async create(body) {
        const house = await dbContext.Houses.create(body)
        return house
    }
    async edit(update) {
        const original = await this.getById(update.id)
        if (original.creatorId.toString() !== update.creatorId) {
            throw new Forbidden('You do not Own this house.back away slowly.')
        }
        original.bedrooms = update.bedrooms ? update.bedrooms : original.bedrooms
        original.bathrooms = update.bathrooms ? update.bathrooms : original.bathrooms
        original.levels = update.levels ? update.levels : original.levels
        original.imgUrl = update.imgUrl ? update.imgUrl : original.imgUrl
        original.price = update.price ? update.price : original.price
        original.description = update.description ? update.description : original.description

        await original.save({ runvalidators: true }); return original

    }

    async remove(houseId, userId) {

        const house = await this.getById(houseId)
        // only the creator can delete the objects they created
        // NOTE creatorId is an object YOU MUST CONVERT IT TO A STRING
        if (house.creatorId.toString() !== userId) {
            throw new Forbidden('That aint your house bro')
        }
        await dbContext.Houses.findByIdAndDelete(houseId)
    }






}

export const housesService = new HousesService()