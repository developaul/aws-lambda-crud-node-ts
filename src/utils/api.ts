import { BASE_SWAPI_API } from "./constant";

interface GetSwapiInfo {
  entity: string;
  id?: string;
}

const getSwapiUrl = ({ entity, id }: GetSwapiInfo) => {
  let swapiUrl = `${BASE_SWAPI_API}/${entity}`

  if (id) swapiUrl = `${swapiUrl}/${id}`

  return `${swapiUrl}/?format=json`
}

export const getSwapiInfo = async ({ entity, id }: GetSwapiInfo) => {
  const swapiUrl = getSwapiUrl({ entity, id })

  const response = await fetch(swapiUrl)
  const json = await response.json()

  return json
}

interface GetErrorRespond {
  statusCode: number;
  message: string;
}

export const getRespond = ({ statusCode, message }: GetErrorRespond) => {
  return {
    statusCode,
    body: JSON.stringify({ message })
  }
}