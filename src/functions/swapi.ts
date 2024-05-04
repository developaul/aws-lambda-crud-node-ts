import { getSwapiInfo } from "../utils/api";
import { translateSWAPIModel } from "../utils/translate";
import { isValidSwapiEntity } from "../utils/validation";

module.exports.handler = async (event: any) => {
  const { id, entity } = event.pathParameters

  if (!isValidSwapiEntity(entity)) return {
    statusCode: 400,
    body: JSON.stringify(
      {
        message: 'La entidad no es válida'
      },
      null,
      2
    ),
  }

  const json = await getSwapiInfo({ entity, id })

  return {
    statusCode: 200,
    body: JSON.stringify(
      translateSWAPIModel(json as Record<string, string>),
      null,
      2
    ),
  };
};
