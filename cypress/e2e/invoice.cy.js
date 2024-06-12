import { link } from "./modules/env";
import { loginUser } from "./modules/login";
import { newCustomer } from "./data/customer";
describe("Invoice", () => {
  beforeEach("Open invoice page", () => {
    cy.visit(link);
    loginUser();
    cy.visit(link + "/dashboard/invoices");
  });

  it("Create invoice", () => {
    cy.wait(2000);
    cy.findByRole("button", { name: /new invoice/i }).click();
    cy.url().should("include", "/new");

    cy.findByRole("button", { name: /add/i }).click();
    cy.findByRole("heading", {
      name: /select customer/i,
    }).should("exist");

    cy.findByPlaceholderText(/search customers\.\.\./i).type(
      newCustomer.first_name
    );
    cy.findByText(newCustomer.first_name).click();
    cy.findByRole("heading", {
      name: new RegExp(newCustomer.first_name + " " + newCustomer.last_name),
    }).should("exist");
  });
});
