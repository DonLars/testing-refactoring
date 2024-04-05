/// <reference types="cypress" />

Cypress.Commands.add("createTodo", (text) => {
  cy.get("[data-cy='new-todo']").type(text).should("have.value", text);
});

describe("todo app", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should have empty todo list by default", () => {
    cy.get("[data-cy='todo-list'] li").should("have.length", 0);
  });

  it.only("should create new todos", () => {
    cy.createTodo("Learn Cypress");
    /*cy.get("[data-cy='new-todo']");
      .type("Learn Cypress")
      .should("have.value", "Learn Cypress"); */

    cy.get("[data-cy='add-todo']").click();
    cy.get("[data-cy='todo-list'] li").should("have.length", 1);
  });

  it("should filter todos", () => {
    cy.get("[data-cy='new-todo']")
      .type("Learn Cypress")
      .should("have.value", "Learn Cypress");
    cy.get("[data-cy='add-todo']").click();
    cy.get("[data-cy='new-todo']")
      .type("Learn Cypress again")
      .should("have.value", "Learn Cypress again");
    cy.get("[data-cy='add-todo']").click();
    cy.get("[data-cy='todo-list'] li input").check();
    cy.get("[data-cy='todo-list'] li").should("have.length", 1);
    cy.get("[data-cy='filter-done']").click();
    cy.get("[data-cy='todo-list'] li").should("have.length", 1);
    cy.get("[data-cy='filter-open']").click();
    cy.get("[data-cy='todo-list'] li").should("have.length", 0);
  });

  it("should delete done todos", () => {
    cy.get("[data-cy='new-todo']")
      .type("Learn Cypress")
      .should("have.value", "Learn Cypress");
    cy.get("[data-cy='add-todo']").click();
    cy.get("[data-cy='todo-list'] li").should("have.length", 1);
    cy.get("[data-cy='todo-list'] li input").check();
    cy.get("[data-cy='delete-todos']").click();
    cy.get("[data-cy='todo-list'] li").should("have.length", 0);
  });

  it("should check duplicate todos", () => {
    cy.get("[data-cy='new-todo']")
      .type("Learn Testing")
      .should("have.value", "Learn Testing");
    cy.get("[data-cy='add-todo']").click();
    cy.get("[data-cy='new-todo']")
      .type("Learn Cypress")
      .should("have.value", "Learn Cypress");
    cy.get("[data-cy='add-todo']").click();
    cy.get("[data-cy='new-todo']").type("Learn Cypress");
    cy.get("[data-cy='add-todo']").click();
    cy.get("[data-cy='todo-list'] li")
      .contains("Learn Cypress")
      .should("have.length", 1);
  });
});
