import React from "react";
import "./AutoComplete.css";

type AutoCompleteProps = {
  onFetch: (searchTerm: string) => void;
  minCharacters?: number;
  options?: Array<{ label: string; value: string }>;
  placeholder?: string;
};

export default function AutoComplete({
  onFetch,
  minCharacters = 4,
  placeholder = "Search...",
  options = [],
}: AutoCompleteProps) {
  const [searchTerm, setSearchTerm] = React.useState("");

  function handleSearchTermChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;

    setSearchTerm(value);

    if (value.length >= minCharacters) {
      onFetch(value);
    }
  }

  return (
    <div className="auto-complete">
      <input
        value={searchTerm}
        onChange={handleSearchTermChange}
        placeholder={placeholder}
      />
      {options.length > 0 && (
        <div className="dropdown">
          {options.map(({ value, label }) => (
            <div key={value} className="dropdown-item" title={value}>
              {label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
