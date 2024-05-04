import { translations } from "./constant";

export const translateSWAPIModel = (object: Record<string, any>) => {
  if (typeof object !== 'object' || object === null) {
    // Si el valor no es un objeto, no se puede traducir, se devuelve tal cual
    return object;
  }

  if (Array.isArray(object)) {
    // Si el valor es un array, se traducen los elementos de forma recursiva
    return object.map(item => translateSWAPIModel(item));
  }

  // Si el valor es un objeto, se traducen las propiedades de forma recursiva
  const translatedObject: Record<string, any> = {};

  for (const key in object) {
    const translateKey = translations[key] ?? key;
    translatedObject[translateKey] = translateSWAPIModel(object[key]);
  }

  return translatedObject;
}
