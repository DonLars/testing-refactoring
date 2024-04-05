/// <reference types="cypress" />

describe("passwort checker", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("Passwords are equal", () => {
    const equalPasswort1 = "a";
    const equalPasswort2 = "a";
    cy.get("[data-cy='first-password']").type(equalPasswort1);
    cy.get("[data-cy='second-password']").type(equalPasswort2);
    expect(equalPasswort1).to.equal(equalPasswort2);
  });

  it("Passwords contains lowercase chars", () => {
    const lowercasePasswort1 = "Ba";
    const lowercasePasswort2 = "Ba";

    cy.get("[data-cy='first-password']")
      .type(lowercasePasswort1)
      .invoke("val")
      .then((passwordValue1) => {
        expect(/[a-z]/.test(passwordValue1)).to.be.true;
      });

    cy.get("[data-cy='second-password']")
      .type(lowercasePasswort2)
      .invoke("val")
      .then((passwordValue2) => {
        expect(/[a-z]/.test(passwordValue2)).to.be.true;
      });
  });

  it("Passwords contains uppercase chars", () => {
    const uppercasePasswort1 = "B";
    const uppercasePasswort2 = "B";

    cy.get("[data-cy='first-password']")
      .type(uppercasePasswort1)
      .invoke("val")
      .then((passwordValue1) => {
        expect(/[A-Z]/.test(passwordValue1)).to.be.true;
      });

    cy.get("[data-cy='second-password']")
      .type(uppercasePasswort2)
      .invoke("val")
      .then((passwordValue2) => {
        expect(/[A-Z]/.test(passwordValue2)).to.be.true;
      });
  });

  it("Passwords contains a number", () => {
    const numberPasswort1 = "5";
    const numberPasswort2 = "abc15";

    cy.get("[data-cy='first-password']")
      .type(numberPasswort1)
      .invoke("val")
      .then((passwordValue1) => {
        expect(/\d/.test(passwordValue1)).to.be.true;
      });

    cy.get("[data-cy='second-password']")
      .type(numberPasswort2)
      .invoke("val")
      .then((passwordValue2) => {
        expect(/\d/.test(passwordValue2)).to.be.true;
      });
  });

  it("At least 10 characters long", () => {
    const FirstTestPassword = "Abcdefghijk9";
    const SecondTestPassword = "Abcdefghijk9";

    cy.get("[data-cy='first-password']")
      .type(FirstTestPassword)
      .invoke("val")
      .then((passwordValue) => {
        const zeichenlaenge = passwordValue.length;
        expect(zeichenlaenge).to.be.at.least(10);
      });

    cy.get("[data-cy='second-password']")
      .type(SecondTestPassword)
      .invoke("val")
      .then((passwordValue) => {
        const zeichenlaenge = passwordValue.length;
        expect(zeichenlaenge).to.be.at.least(10);
      });
  });
});
