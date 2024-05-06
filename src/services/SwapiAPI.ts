import DataSource from './DataSource'

import { ResolveArgs } from '../interfaces/swapi'
import { BASE_SWAPI_API } from '../utils/constant'
import { getResolveUrl } from '../utils/api'

class SwapiAPI extends DataSource {
  constructor() {
    super(BASE_SWAPI_API as string)
  }

  async resolve({ entity, id }: ResolveArgs) {
    const url = getResolveUrl({ entity, id })

    const response = await this.get<Record<string, any>>(url)

    return response
  }

}

export default SwapiAPI