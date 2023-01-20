import TodoItem from "./TodoItem";

describe("<Todo />", () => {
  const props = {
    content: "test",
    id: "1",
    status: "todo",
    onComplete: () => {},
    onDelete: () => {},
  } as const;

  beforeEach(() => {
    cy.mount(<TodoItem {...props} />);
  });
  it("renders the correct text", () => {
    cy.get("p").should("have.text", "test");
  });
  it("emits event when clicking on delete", () => {
    const onDelete = cy.stub();
    cy.mount(<TodoItem {...props} onDelete={onDelete} />);
    cy.get(`[data-cy=delete]`)
      .click()
      .then(() => expect(onDelete).to.be.called);
  });
  it("emits event when clicking on delete", () => {
    const onComplete = cy.stub();
    cy.mount(<TodoItem {...props} onComplete={onComplete} />);
    cy.get(`[data-cy=complete]`)
      .click()
      .then(() => expect(onComplete).to.be.called);
  });
  it("if status is done, strike the text", () => {
    cy.mount(<TodoItem {...props} status="done" />);
    cy.get("p")
      .then(($el) => {
        if (!$el) return;
        return window.getComputedStyle($el[0]);
      })
      .invoke("getPropertyValue", "text-decoration")
      .should("equal", "line-through solid rgb(0, 0, 0)");
  });
});
