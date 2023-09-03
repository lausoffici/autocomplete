import Spinner from "../Spinner";
import EmptyBox from "../../assets/empty-box.png";
import "./AutoComplete.css";

export interface AutocompleteListProps {
  text: string;
  options: Array<{ label: string; value: string }>;
  isLoading: boolean;
  isOpen: boolean;
  onSelect?: (option: { label: string; value: string }) => void;
}

function highlightText(text: string, query: string) {
  const regex = new RegExp(`(${query})`, "gi");

  return text.split(regex).map((part, index) => {
    if (part.toLowerCase() === query.toLowerCase()) {
      return (
        // We can use index as key because the array (word) is not going to change its order
        <span className="highlight" key={index}>
          {part}
        </span>
      );
    }
    return part;
  });
}

export function AutoCompleteList({
  text,
  options,
  isLoading,
  isOpen,
  onSelect = () => {},
}: AutocompleteListProps) {
  if (!isOpen) return null;

  if (isLoading) return <LoadingState />;

  if (!options.length) return <EmptyState />;

  return (
    <ul
      className="auto-complete-list"
      onMouseDown={(e) => e.preventDefault()}
      role="listbox"
    >
      {options.map(({ value, label }) => (
        <li
          key={value}
          className="auto-complete-list__item"
          title={value}
          onClick={() => onSelect({ value, label })}
          role="option"
        >
          {highlightText(label, text)}
        </li>
      ))}
    </ul>
  );
}

function LoadingState() {
  return (
    <div
      className="auto-complete-list loading"
      onMouseDown={(e) => e.preventDefault()}
    >
      <Spinner />
    </div>
  );
}

function EmptyState() {
  return (
    <div
      className="auto-complete-list empty"
      onMouseDown={(e) => e.preventDefault()}
    >
      <img src={EmptyBox} alt="Empty box" height={50} loading="eager" />
      No results found
    </div>
  );
}
