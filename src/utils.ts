import { CocktailResponse } from "./types";

export const mapCocktailResponseToOptions = (
  cocktails: CocktailResponse | undefined
) =>
  cocktails?.drinks?.map(({ strDrink, idDrink }) => ({
    label: strDrink,
    value: idDrink,
  }));
