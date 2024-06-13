import { link } from "./modules/env";
import { loginUser } from "./modules/login";
import { Customer } from "./data/customer";
import { Invoice } from "./data/invoice";
import { product } from "./data/product";
describe("Invoice", () => {
  beforeEach("Open invoice page", () => {
    cy.visit(link);
    loginUser();
    cy.visit(link + "/dashboard/invoices");
  });

  it("Create invoice", () => {
    cy.wait(2000);
    // cy.findByRole("button", { name: /open drawer/i }).click();
    cy.findByTestId("MenuOpenIcon").click();
    cy.findByRole("button", { name: /new invoice/i }).click({ force: true });
    cy.url().should("include", "/new");
    cy.findByText("Add").click();
    cy.findByPlaceholderText(/search customers\.\.\./i).type(
      Customer.first_name + " " + Customer.last_name
    );
    cy.findByText(Customer.first_name + " " + Customer.last_name)
      .parentsUntil(
        ".MuiButtonBase-root.MuiListItemButton-root.MuiListItemButton-gutters"
      )
      .click();
    // fill in the invoice details
    cy.findByRole("textbox", { name: /l\.p\.o number/i }).type(
      Invoice.lpo_number
    );
    cy.findByRole("textbox", { name: /delivery note number/i }).type(
      Invoice.delivery_note_number
    );
    cy.findByRole("combobox", { name: /product\/service name/i })
      .click()
      .type(product.name);
    cy.get('ul[role="listbox"]').contains("li", product.name).click();
    cy.findByRole("spinbutton", { name: /quantity/i })
      .clear()
      .type(2);
    cy.findByRole("textbox", { name: /price/i }).should(
      "have.value",
      Math.floor(product.retail_price)
    );
    cy.findByRole("spinbutton", {
      name: /total/i,
    }).should("have.value", Math.floor(product.retail_price * 2));
    cy.findByRole("textbox", { name: /terms and conditions/i })
      .clear()
      .type(Invoice.terms_and_conditions);
    // cy.findByText("Create").click();
    cy.wait(1000);
    // confirming the invoice was created
    cy.go("back");
    cy.wait(1000);
    cy.findByText(new RegExp(Customer.first_name + " " + Customer.last_name))
      .eq(0)
      .parentsUntil(".MuiTableRow-root.css-3yk0xe");
  });
});
