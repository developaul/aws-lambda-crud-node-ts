import { GetRespond } from "../interfaces/general";
import { ResolveArgs } from "../interfaces/swapi";

export const getRespond = ({ statusCode, message }: GetRespond) => {
  return {
    statusCode,
    body: JSON.stringify({ message })
  }
}

export const getResolveUrl = ({ entity, id }: ResolveArgs) => {
  let swapiUrl = `/${entity}`

  if (id) swapiUrl = `${swapiUrl}/${id}`

  return `${swapiUrl}/?format=json`
}