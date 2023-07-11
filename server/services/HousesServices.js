import { Server } from "socket.io"
import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"


class HousesService {
    async getHouses() {
        const houses = await dbContext.Houses.find()

        return houses
    }
    async getHouseById(houseId) {
        const house = await dbContext.Houses.findById(houseId)

        if (!house) {
            throw new BadRequest('not a valid id')
        }
        return house
    }
    async createHouse(houseData) {
        const house = await dbContext.Houses.create(houseData)

        return house
    }
    async removeHouse(houseId, userId) {
        const houseToDelete = await this.getHouseById(houseId)

        if (houseToDelete.creatorId.toString() != userId) {
            throw new Forbidden('THIS IS NOT YOUR POST, TRY AGAIN DINK')
        }
        await houseToDelete.remove()
    }

    async editHouse(houseId, userId, houseData) {
        const originalHouse = await this.getHouseById(houseId)

        if (originalHouse.creatorId.toString() != userId) {
            throw new Forbidden('Not your post, try again Dink')
        }
        originalHouse.style = houseData.style || originalHouse.style
        originalHouse.built = houseData.built || originalHouse.built
        originalHouse.price = houseData.price || originalHouse.price
        originalHouse.bedrooms = houseData.bedrooms || originalHouse.bedrooms
        originalHouse.bathrooms = houseData.bathrooms || originalHouse.bathrooms
        originalHouse.sqft = houseData.sqft || originalHouse.sqft
        originalHouse.hasyard = houseData.hasyard != null ? houseData.hasyard : originalHouse.hasyard
        originalHouse.imgUrl = houseData.imgUrl || originalHouse.imgUrl

        await originalHouse.save()
        return originalHouse
    }
}

export const housesServices = new HousesService()