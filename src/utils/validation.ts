import { swapiEntities } from "./constant"

export const isValidSwapiEntity = (entity: string) => {
  return swapiEntities.includes(entity)
}