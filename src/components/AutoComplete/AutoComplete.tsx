import React from "react";
import "./AutoComplete.css";

const data = [
  {
    label: "Test",
    value: "test",
  },
  {
    label: "Test2",
    value: "test2",
  },
  {
    label: "Test3",
    value: "test4",
  },
];

type AutoCompleteProps = {
  minCharacters?: number;
};

export default function AutoComplete({ minCharacters = 4 }: AutoCompleteProps) {
  const [searchTerm, setSearchTerm] = React.useState("");

  function handleSearchTermChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;

    setSearchTerm(value);

    if (value.length >= minCharacters) {
      // fetch data
    }
  }

  return (
    <div className="auto-complete">
      <input value={searchTerm} onChange={handleSearchTermChange} />
      <div className="dropdown">
        {data.map(({ value, label }) => (
          <div key={value} className="dropdown-item" title={value}>
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}
