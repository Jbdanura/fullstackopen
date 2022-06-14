import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Blog from "./Blog";
import userEvent from "@testing-library/user-event";

const blog = {
  title: "Wea",
  author: "Weon",
  url: "none",
  likes: 3,
  user: {
    username: "Weonauta",
  },
};

test("contains title and author", () => {
  const { container } = render(<Blog blog={blog} />);

  const div = container.querySelector(".blog");

  expect(div).toHaveTextContent("Wea");
  expect(div).toHaveTextContent("Weon");
});
