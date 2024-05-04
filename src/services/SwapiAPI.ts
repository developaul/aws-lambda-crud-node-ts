import DataSource from './DataSource'

import { BASE_SWAPI_API } from '../utils/constant'
import { ResolveArgs } from '../interfaces/swapi'


class SwapiAPI extends DataSource {
  constructor() {
    super(BASE_SWAPI_API as string)
  }

  getResolveUrl({ entity, id }: ResolveArgs) {
    let swapiUrl = `/${entity}`

    if (id) swapiUrl = `${swapiUrl}/${id}`

    return `${swapiUrl}/?format=json`
  }

  async resolve({ entity, id }: ResolveArgs) {
    try {
      const url = this.getResolveUrl({ entity, id })

      const response = await this.get<Record<string, any>>(url)

      return response
    } catch (error) {
      throw error
    }
  }

}

export default SwapiAPI