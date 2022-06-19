/// <reference types="Cypress" />

describe("Central de atendimento ao Cliente TAT", () => {
  beforeEach(() => {
    cy.visit("src/index.html");
  });

  it("verifica o titulo da aplicação", () => {
    cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT");
  });

  it("Preencher os campos obrigatórios e envia o formulário", () => {
    const longText =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lobortis ligula id sem pharetra consectetur. Mauris eu viverra magna, nec elementum metus. Aenean in lacus enim. In eu mollis mi. Pellentesque tempus et quam in tempus. Ut ut pulvinar libero, tristique venenatis ligula. Mauris vitae l.";

    cy.get("#firstName").should("be.visible").type("Julyemerson");
    cy.get("#lastName").should("be.visible").type("Leonizio");
    cy.get("#email").should("be.visible").type("jb.leonizio@gmail.com");
    cy.get("#open-text-area").should("be.visible").type(longText, { delay: 0 });

    cy.contains("button", "Enviar").click();
    cy.get(".success").should("be.visible");
  });

  it("Exibe mensagem de erro ao submeter o formulário com formatação invalida de email ", () => {
    cy.get("#firstName").should("be.visible").type("Julyemerson");
    cy.get("#lastName").should("be.visible").type("Leonizio");
    cy.get("#email").should("be.visible").type("jb.leoniziogmail.com");
    cy.get("#open-text-area")
      .should("be.visible")
      .type("Preciso de suporte para o curso cypress básico");

    cy.contains("button", "Enviar").click();
    cy.get(".error").should("be.visible");
  });

  it("Deve verificar se o campo de telefone só aceita números", () => {
    cy.get("#phone").type("abcde").should("have.value", "");
  });

  it("exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", () => {
    cy.get("#firstName").should("be.visible").type("Julyemerson");
    cy.get("#lastName").should("be.visible").type("Leonizio");
    cy.get("#email").should("be.visible").type("jb.leonizio@gmail.com");
    cy.get("#phone-checkbox").click();
    cy.get("#open-text-area").should("be.visible").type("teste");

    cy.contains("button", "Enviar").click();
    cy.get(".error").should("be.visible");
  });

  it("preenche e limpa os campos nome, sobrenome, email e telefone", () => {
    const userData = {
      firstName: "Julyemerson",
      lastName: "Leonizio",
      email: "jb.leonizio@gmail.com",
      phone: "84998519000",
    };

    cy.get("#firstName")
      .type(userData.firstName)
      .should("have.value", userData.firstName)
      .clear()
      .should("have.value", "");

    cy.get("#lastName")
      .type(userData.lastName)
      .should("have.value", userData.lastName)
      .clear()
      .should("have.value", "");

    cy.get("#email")
      .type(userData.email)
      .should("have.value", userData.email)
      .clear()
      .should("have.value", "");

    cy.get("#phone")
      .type(userData.phone)
      .should("have.value", userData.phone)
      .clear()
      .should("have.value", "");
  });

  it("exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios", () => {
    cy.contains("button", "Enviar").click();
    cy.get(".error").should("be.visible");
  });

  it("envia o formuário com sucesso usando um comando customizado", () => {
    cy.fillMandatoryFieldsAndSubmit();

    cy.get(".success").should("be.visible");
  });
});
