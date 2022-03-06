import BaseController from "../utils/BaseController";
import { Auth0Provider } from '@bcwdev/auth0provider'



export class HouseController extends BaseController {
    constructor() {
        super('api/houses')
        this.router
            .get('', this.getAll)
            .get('/:id', this.getById)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.create)
            .put('/:id', this.edit)
            .delete('/:id', this.remove)
    }



    async getAll(req, res, next) {
        try {
            const houses = await housesService.getAll(req.query)
            return res.send(houses)

        } catch (error) {
            next(error)
        }
    }
    async getById(req, res, next) {
        try {
            const cars = await housesService.getAll(req.query)
            return res.send(houses)
        } catch (error) {
            next(error)
        }
    }

    async create(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            const house = await houseService.create(req.body)
            return res.send(house)


        } catch (error) {
            next(error)
        }
    }
    async edit(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            req.body.id = req.params.id
            return res.send(update)
        } catch (error) {
            next(error)
        }

    }
    async remove(req, res, next) {
        try {
            const userId = req.userInfo.id
            const carId = req.params.id
            await housesService.remove(carId, userId)
            return res.send('delorted')
        } catch (error) {
            next(error)
        }
    }
}