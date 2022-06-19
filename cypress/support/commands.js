Cypress.Commands.add("fillMandatoryFieldsAndSubmit", () => {
  cy.get("#firstName").should("be.visible").type("Julyemerson");
  cy.get("#lastName").should("be.visible").type("Leonizio");
  cy.get("#email").should("be.visible").type("jb.leonizio@gmail.com");
  cy.get("#open-text-area").should("be.visible").type("teste");
  cy.contains("button", "Enviar").click();
});
