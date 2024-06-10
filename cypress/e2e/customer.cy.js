import { loginUser } from "./modules/login";
import { link } from "./modules/env";
import { newCustomer, updatedCustomer } from "./data/customer";
describe("Customer Module", () => {
  beforeEach(() => {
    cy.visit(link);
    loginUser();
    cy.visit(link + "/dashboard/customers");
    cy.get(
      ".MuiButtonBase-root.MuiFab-root.MuiFab-extended.MuiFab-sizeLarge.MuiFab-default.MuiFab-root.MuiFab-extended.MuiFab-sizeLarge.MuiFab-default.css-te5gl5"
    ).click();
    cy.findByRole("button", { name: /hide/i }).click();
    cy.wait(1000);
    cy.get("body").click();
  });
  it("Creating new customer", () => {
    cy.findByRole("button", { name: /new customer/i, force: true }).click();
    cy.findByRole("textbox", { name: /first name/i }).type(
      newCustomer.first_name
    );
    cy.findByRole("textbox", { name: /last name/i }).type(
      newCustomer.last_name
    );
    cy.findByRole("textbox", { name: /email address/i }).type(
      newCustomer.email_address
    );
    cy.findByRole("textbox", { name: /phone number/i }).type(
      newCustomer.phone_number
    );
    cy.findByRole("textbox", { name: /kra pin/i }).type(newCustomer.kra_pin);
    cy.findByRole("textbox", { name: /billing address/i }).type(
      newCustomer.billing_address
    );
    cy.findByRole("textbox", { name: /company name/i }).type(
      newCustomer.company_name
    );
    cy.findByRole("combobox", { name: /country/i }).click();
    cy.findByText("Algeria").click();
    cy.findByRole("textbox", { name: /city/i }).type(newCustomer.city);

    cy.findByRole("textbox", { name: /post code/i }).type(
      newCustomer.postal_code
    );

    cy.findByRole("button", {
      name: /save/i,
      force: true,
    })
      .scrollIntoView()
      .click();
  });
  it.only("Updating Customer", () => {
    cy.findByPlaceholderText(/search customers\.\.\./i).type(
      newCustomer.first_name
    );
    cy.findByText(new RegExp(newCustomer.first_name))
      .parentsUntil(".MuiTableRow-root.MuiTableRow-hover.css-rw4e8j")
      .parent()
      .first()
      .within(() => {
        cy.get("td")
          .eq(5)
          .within(() => {
            cy.get("a").eq(0).click();
          });
      });
    cy.findByText(newCustomer.first_name + " " + newCustomer.last_name).should(
      "exist"
    );
    cy.findByRole("button", { name: /select merge strategy/i }).click();
    cy.findByRole("menuitem", { name: /edit/i }).click();
    // check form
    cy.findByRole("textbox", { name: /first name/i }).should(
      "have.value",
      newCustomer.first_name
    );
    cy.findByRole("textbox", { name: /last name/i }).should(
      "have.value",
      newCustomer.last_name
    );
    cy.findByRole("textbox", { name: /email address/i }).should(
      "have.value",
      newCustomer.email_address
    );
    cy.findByRole("textbox", { name: /phone number/i }).should(
      "have.value",
      newCustomer.phone_number
    );
    cy.findByRole("textbox", { name: /kra pin/i }).should(
      "have.value",
      newCustomer.kra_pin
    );
    cy.findByRole("textbox", { name: /billing address/i }).should(
      "have.value",
      newCustomer.billing_address
    );
    cy.findByRole("textbox", { name: /company name/i }).should(
      "have.value",
      newCustomer.company_name
    );
    cy.findByRole("combobox", { name: /country/i }).should(
      "have.value",
      newCustomer.country
    );
    cy.findByRole("textbox", { name: /city/i }).should(
      "have.value",
      newCustomer.city
    );

    cy.findByRole("textbox", { name: /post code/i }).type(
      newCustomer.postal_code
    );
    // update form

    cy.findByRole("textbox", { name: /first name/i })
      .clear()
      .type(updatedCustomer.first_name);
    cy.findByRole("textbox", { name: /last name/i })
      .clear()
      .type(updatedCustomer.last_name);
    cy.findByRole("textbox", { name: /email address/i })
      .clear()
      .type(updatedCustomer.email_address);
    cy.findByRole("textbox", { name: /phone number/i })
      .clear()
      .type(updatedCustomer.phone_number);
    // cy.findByRole("textbox", { name: /kra pin/i }).clear().type(updatedCustomer.kra_pin);
    cy.findByRole("textbox", { name: /billing address/i })
      .clear()
      .type(updatedCustomer.billing_address);
    cy.findByRole("textbox", { name: /company name/i })
      .clear()
      .type(updatedCustomer.company_name);
    cy.findByRole("combobox", { name: /country/i }).click();
    cy.findByText("Algeria").click();
    cy.findByRole("textbox", { name: /city/i })
      .clear()
      .type(updatedCustomer.city);

    cy.findByRole("textbox", { name: /post code/i })
      .clear()
      .type(updatedCustomer.postal_code);

    cy.findByRole("button", {
      name: /save/i,
      force: true,
    }).click();
  });
  it("Deleting Customer", () => {});
  it("Re-Create the customer", () => {});
});
