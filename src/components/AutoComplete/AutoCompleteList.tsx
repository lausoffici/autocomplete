import "./AutoComplete.css";

export interface AutocompleteListProps {
  text: string;
  options: Array<{ label: string; value: string }>;
  isLoading: boolean;
}

export function AutocompleteList({
  text,
  options,
  isLoading,
}: AutocompleteListProps) {
  if (isLoading)
    return <div className="auto-complete-list empty">Loading...</div>;

  if (text && !options.length)
    return <div className="auto-complete-list empty">No results found</div>;

  return (
    <div className="auto-complete-list">
      {options.map(({ value, label }) => (
        <div key={value} className="auto-complete-list-item" title={value}>
          {label}
        </div>
      ))}
    </div>
  );
}
