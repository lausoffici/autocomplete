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

  return (
    <main>
      <h1>{"<AutoComplete />"}</h1>
      <AutoComplete
        placeholder="Type at least 4 characters..."
        onSearch={setCocktailName}
        options={options}
        isLoading={isCocktailsLoading}
      />
    </main>
  );
}
