import useFetch from "./useFetch";

export type CocktailResponse = {
  drinks: Array<{
    idDrink: string;
    strDrink: string;
  }>;
};

export default function useGetCocktails(name: string) {
  return useFetch<CocktailResponse>({
    url: `https://thecocktaildb.com/api/json/v1/1/search.php?s=${name}`,
    // This asserts that the name is not an empty string
    enabled: Boolean(name),
  });
}
