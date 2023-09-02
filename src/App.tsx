import React from "react";
import AutoComplete from "./components/AutoComplete";
import useFetch from "./hooks/useFetch";
import { CocktailResponse } from "./types";
import "./App.css";
import { mapCocktailResponseToOptions } from "./utils";

export default function App() {
  const [cocktailName, setCocktailName] = React.useState("");

  const { data: cocktails } = useFetch<CocktailResponse>({
    url: `https://thecocktaildb.com/api/json/v1/1/search.php?s=${cocktailName}`,
    enabled: Boolean(cocktailName),
  });

  const options = React.useMemo(
    () => mapCocktailResponseToOptions(cocktails),
    [cocktails]
  );

  return (
    <main>
      <h1>{"<AutoComplete />"}</h1>
      <AutoComplete
        placeholder="Search cocktails..."
        onFetch={setCocktailName}
        options={options}
      />
    </main>
  );
}
