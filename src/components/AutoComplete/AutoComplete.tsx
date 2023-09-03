import React, { useCallback } from "react";
import "./AutoComplete.css";
import { AutoCompleteList } from "./AutoCompleteList";
import { debounce } from "../../utils/debounce";
import {
  AUTO_COMPLETE_DEFAULT_DELAY,
  AUTO_COMPLETE_DEFAULT_MAX_LENGTH,
  AUTO_COMPLETE_DEFAULT_MIN_CHARACTERS,
} from "../../constants";

type AutoCompleteProps = {
  onSearch: (searchTerm: string) => void;
  isLoading: boolean;
  onSelect?: (option: { label: string; value: string }) => void;
  options?: Array<{ label: string; value: string }>;
  placeholder?: string;
  minCharacters?: number;
  maxLength?: number;
  delay?: number;
};

export default function AutoComplete({
  onSearch,
  isLoading,
  onSelect,
  options = [],
  placeholder = "Search...",
  minCharacters = AUTO_COMPLETE_DEFAULT_MIN_CHARACTERS,
  maxLength = AUTO_COMPLETE_DEFAULT_MAX_LENGTH,
  delay = AUTO_COMPLETE_DEFAULT_DELAY,
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
    debounce((searchTerm: string) => onSearch(searchTerm), delay),
    []
  );

  return (
    <div className="auto-complete-wrapper">
      <input
        className="auto-complete-input"
        value={searchTerm}
        onChange={handleSearchTermChange}
        placeholder={placeholder}
        onFocus={() => setIsListOpen(true)}
        onBlur={() => setIsListOpen(false)}
        maxLength={maxLength}
      />
      <AutoCompleteList
        text={searchTerm}
        options={options}
        isLoading={isLoading}
        onSelect={onSelect}
        isOpen={isListOpen}
      />
    </div>
  );
}
