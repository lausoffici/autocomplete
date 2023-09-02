import "./AutoComplete.css";

export interface AutocompleteListProps {
  text: string;
  options: Array<{ label: string; value: string }>;
  isLoading: boolean;
  onSelect: (option: { label: string; value: string }) => void;
  isOpen: boolean;
}

export function AutocompleteList({
  text,
  options,
  isLoading,
  onSelect,
  isOpen,
}: AutocompleteListProps) {
  if (!isOpen) return null;

  if (isLoading)
    return <div className="auto-complete-list empty">Loading...</div>;

  if (text && !options.length)
    return <div className="auto-complete-list empty">No results found</div>;

  return (
    <div className="auto-complete-list">
      {options.map(({ value, label }) => (
        <div
          key={value}
          className="auto-complete-list-item"
          title={value}
          onClick={() => onSelect({ value, label })}
        >
          {label}
        </div>
      ))}
    </div>
  );
}
