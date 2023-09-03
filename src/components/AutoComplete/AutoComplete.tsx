import React, { useCallback } from "react";
import "./AutoComplete.css";
import { AutoCompleteList } from "./AutoCompleteList";
import { debounce } from "../../utils/debounce";

type AutoCompleteProps = {
  onSearch: (searchTerm: string) => void;
  onSelect: (option: { label: string; value: string }) => void;
  isLoading: boolean;
  minCharacters?: number;
  options?: Array<{ label: string; value: string }>;
  placeholder?: string;
};

export default function AutoComplete({
  onSearch,
  onSelect,
  minCharacters = 4,
  placeholder = "Search...",
  options = [],
  isLoading,
}: AutoCompleteProps) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [isListOpen, setIsListOpen] = React.useState(false);

  function handleSearchTermChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;

    setSearchTerm(value);

    if (value.length >= minCharacters) {
      debouncedSearch(value);
    }
  }

  const debouncedSearch = useCallback(
    debounce((searchTerm: string) => onSearch(searchTerm), 500),
    []
  );

  return (
    <div className="auto-complete">
      <input
        className="auto-complete-input"
        value={searchTerm}
        onChange={handleSearchTermChange}
        placeholder={placeholder}
        onFocus={() => setIsListOpen(true)}
        onBlur={() => setIsListOpen(false)}
        maxLength={50}
      />
      {searchTerm.length >= minCharacters && (
        <AutoCompleteList
          text={searchTerm}
          options={options}
          isLoading={isLoading}
          onSelect={onSelect}
          isOpen={isListOpen}
        />
      )}
    </div>
  );
}
