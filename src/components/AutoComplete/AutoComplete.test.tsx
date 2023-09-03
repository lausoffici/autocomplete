import { describe, expect, test, vi } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";

import AutoComplete from "./AutoComplete";

describe("<AutoComplete />", () => {
  const onSearch = vi.fn();
  const onSelect = vi.fn();

  test("renders", () => {
    render(
      <AutoComplete
        onSearch={onSearch}
        onSelect={onSelect}
        isLoading={false}
        options={[]}
      />
    );

    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  test("renders with options", () => {
    render(
      <AutoComplete
        onSearch={onSearch}
        onSelect={onSelect}
        isLoading={false}
        options={[{ value: "test", label: "Option 1" }]}
      />
    );

    fireEvent.focus(screen.getByTestId("auto-complete-input"));
    expect(screen.getByText("Option 1")).toBeInTheDocument();
  });

  test('calls "onSelect" when an option is selected', async () => {
    render(
      <AutoComplete
        onSearch={onSearch}
        onSelect={onSelect}
        isLoading={false}
        options={[{ value: "test", label: "Option 1" }]}
      />
    );

    fireEvent.focus(screen.getByTestId("auto-complete-input"));

    const options = within(screen.getByRole("listbox")).getAllByRole("option");

    fireEvent.click(options[0]);

    expect(onSelect).toHaveBeenCalledWith({
      value: "test",
      label: "Option 1",
    });
  });
});
