import { beforeAll, describe, expect, test, vi } from "vitest";
import {
  render,
  screen,
  fireEvent,
  within,
  waitFor,
} from "@testing-library/react";

import AutoComplete from "./AutoComplete";

describe("<AutoComplete />", () => {
  const onSearch = vi.fn();
  const onSelect = vi.fn();

  test("renders input", () => {
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

  test("renders input with options", () => {
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
    const onSelect = vi.fn();

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

  test('calls "onSearch" when the input value changes', async () => {
    const onSearch = vi.fn();

    render(
      <AutoComplete
        onSearch={onSearch}
        onSelect={onSelect}
        isLoading={false}
        options={[{ value: "test", label: "Option 1" }]}
      />
    );

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "test" },
    });

    await waitFor(() => {
      expect(onSearch).toHaveBeenCalledWith("test");
    });
  });

  test('does not call "onSearch" when the input value is less than the min characters', async () => {
    const onSearch = vi.fn();

    render(
      <AutoComplete
        onSearch={onSearch}
        onSelect={onSelect}
        isLoading={false}
        minCharacters={2}
        options={[{ value: "test", label: "Option 1" }]}
      />
    );

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "t" },
    });

    await waitFor(() => {
      expect(onSearch).not.toHaveBeenCalled();
    });
  });

  test('should show loading state when "isLoading" is true', async () => {
    render(
      <AutoComplete
        onSearch={onSearch}
        onSelect={onSelect}
        isLoading={true}
        options={[{ value: "test", label: "Option 1" }]}
      />
    );

    fireEvent.focus(screen.getByTestId("auto-complete-input"));

    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });

  test('should show empty state when "isLoading" is false and "options" is empty', async () => {
    render(
      <AutoComplete
        onSearch={onSearch}
        onSelect={onSelect}
        isLoading={false}
        options={[]}
      />
    );

    fireEvent.focus(screen.getByTestId("auto-complete-input"));

    expect(screen.getByText("No results found")).toBeInTheDocument();
  });
});
