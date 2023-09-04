# AutoComplete Component

The `AutoComplete` component is a React component that provides auto-suggest functionality for a search input field. It allows users to type in a search term and displays a list of matching options based on the input.

## Search Input

- **User Input**: The component allows users to type a search term into an input field.

- **Minimum Characters**: It requires a minimum number of characters (default: 1) to trigger a search. The minimum character count can be customized.

- **Maximum Length**: The input field has a maximum allowed length (default: 25), which can also be customized.

## Auto-Complete List

- **Custom Options**: You can provide an array of options to be suggested, each consisting of a label and a value. The label is displayed in the suggestion list, and the value is passed to the `onSelect` callback when an option is selected.

- **Loading Indicator**: It supports indicating when data is loading (e.g., fetching suggestions from an API).

- **Selection**: Users can select an option from the suggestion list, and a callback function (`onSelect`) can be triggered when an option is selected.

## Debounced Search

- **Debouncing**: To reduce the number of API calls or computations, the component uses debouncing. It waits for a brief delay (default: 300 milliseconds) after the user stops typing before initiating the search.

## Callbacks

- **Search Callback**: The component expects a callback function (`onSearch`) to handle search queries. It passes the current search term to this callback when a search is triggered. This callback can be used to implement your search logic. It is triggered after the user stops typing and the delay has passed. The callback is not triggered if the search term is empty or does not meet the minimum character count.

- **Selection Callback**: Optionally, you can provide a callback function (`onSelect`) to handle the selection of an option from the suggestion list. This callback receives the selected option (label and value).

## Customization

- **Placeholder**: You can set a custom placeholder text for the search input field (default: "Search...").

- **Custom Styling**: The component can be styled using CSS classes to fit your application's design.

These functionalities make the `AutoComplete` component a versatile tool for implementing auto-suggest search features in your React applications. It enhances user interactions with your search functionality and can be tailored to your specific requirements.

## Props

| Prop Name       | Type                                                 | Default Value        | Description                                                                       |
| --------------- | ---------------------------------------------------- | -------------------- | --------------------------------------------------------------------------------- |
| `onSearch`      | `(searchTerm: string) => void`                       | Required             | A callback function to handle search queries.                                     |
| `isLoading`     | `boolean`                                            | Optional             | Indicates whether the component is currently loading data.                        |
| `onSelect`      | `(option: { label: string; value: string }) => void` | Optional             | A callback function to handle selection of an option from the suggestion list.    |
| `options`       | `Array<{ label: string; value: string }>`            | `[]`                 | An array of options to display as suggestions.                                    |
| `placeholder`   | `string`                                             | `"Search..."`        | The placeholder text for the search input field.                                  |
| `minCharacters` | `number`                                             | `1`                  | The minimum number of characters required before triggering a search.             |
| `maxLength`     | `number`                                             | `25`                 | The maximum allowed length for the search input.                                  |
| `delay`         | `number`                                             | `300` (milliseconds) | The delay in milliseconds before triggering a search after the user stops typing. |

## Example Usage

```jsx
import AutoComplete from "./AutoComplete";

function MyComponent() {
  const handleSearch = (searchTerm) => {
    // Implement your search logic here
  };

  return (
    <AutoComplete
      onSearch={handleSearch}
      isLoading={false}
      options={[]}
      placeholder="Search something..."
    />
  );
}
```
