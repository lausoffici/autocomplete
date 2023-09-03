import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";

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
});
