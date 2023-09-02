import React from "react";
import useGetCocktails from "../../hooks/useGetCocktails";
import { mapCocktailResponseToOptions } from "../../utils";
import AutoComplete from "../AutoComplete";
import "./App.css";

export default function App() {
  // Search text to be used in the API call.
  // It will be updated by the AutoComplete component when the user types and the search term is long enough.
  const [cocktailName, setCocktailName] = React.useState("");

  const { data: cocktails, isLoading: isCocktailsLoading } =
    useGetCocktails(cocktailName);

  const options = React.useMemo(
    () => mapCocktailResponseToOptions(cocktails),
    [cocktails]
  );

  function onSelect(option: { label: string; value: string }) {
    console.log(option);
  }

  return (
    <main>
      <h1>Search Cocktails</h1>
      <AutoComplete
        minCharacters={1}
        placeholder="Search cocktails..."
        onSearch={setCocktailName}
        onSelect={onSelect}
        options={options}
        isLoading={isCocktailsLoading}
      />
    </main>
  );
}
