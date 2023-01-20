import { rest } from "msw";

export const handlers = [
  rest.post("/todo", (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.get("/todos", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        { id: "1", content: "coucou", status: "todo" },
        { id: "2", content: "coucou", status: "todo" },
      ])
    );
  }),
];
