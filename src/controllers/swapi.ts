import SwapiAPI from '../services/SwapiAPI'
import { translateSWAPIModel } from "../utils/translate"

import { ResolveArgs } from '../interfaces/swapi'

class SwapiController {
  async resolve({ entity, id }: ResolveArgs) {
    const swapiAPI = new SwapiAPI()

    const response = await swapiAPI.resolve({ entity, id })

    const responseTranslated = translateSWAPIModel(response)

    return responseTranslated
  }

}

export default new SwapiController()