import { link } from "./modules/env";
import { loginUser } from "./modules/login";
import { Customer } from "./data/customer";
import { Invoice, InvoiceUpdate } from "./data/invoice";
import { ProductPos } from "./data/product";

const productCount = 2;
const productCountUpdate = 4;
const customerName = Customer.first_name + " " + Customer.last_name;

describe("Invoice", () => {
  beforeEach("Open invoice page", () => {
    cy.visit(link);
    loginUser();
    cy.visit(link + "/dashboard/invoices");
  });
  // Create invoice
  it("Create invoice", () => {
    cy.wait(2000);
    cy.findByTestId("MenuOpenIcon").click();
    cy.findByRole("button", { name: /new invoice/i }).click({ force: true });
    cy.url().should("include", "/new");
    cy.findByText("Add").click();
    cy.findByPlaceholderText(/search customers\.\.\./i).type(customerName);
    cy.findByText(customerName)
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
      .type(ProductPos.name);
    cy.get('ul[role="listbox"]').contains("li", ProductPos.name).click();
    cy.findByRole("spinbutton", { name: /quantity/i })
      .clear()
      .type(productCount);
    cy.findByRole("textbox", { name: /price/i }).should(
      "have.value",
      Math.floor(ProductPos.retail_price)
    );
    cy.findByRole("spinbutton", {
      name: /total/i,
    }).should("have.value", Math.floor(ProductPos.retail_price * productCount));
    cy.findByRole("textbox", { name: /terms and conditions/i })
      .clear()
      .type(Invoice.terms_and_conditions);
    cy.findByText("Create").click();
    cy.wait(1000);
    // confirming the invoice was created
    cy.visit(link + "/dashboard/invoices");
    cy.wait(1000);
    cy.get("tbody")
      .children()
      .eq(0)
      .within(() => {
        cy.get("td").eq(0).should("contain", customerName);
        cy.get("td")
          .eq(1)
          .should(
            "contain",
            Math.floor(ProductPos.retail_price * productCount)
          );
        cy.get("td").eq(4).should("contain", "Draft");
      });
  });
  // Edit invoice
  it("Edit invoice", () => {
    cy.get("tbody")
      .children()
      .eq(0)
      .within(() => {
        cy.get("td").eq(0).should("contain", customerName);
        cy.get("td")
          .eq(1)
          .should(
            "contain",
            Math.floor(ProductPos.retail_price * productCount)
          );
        cy.get("td").eq(4).should("contain", "Draft");
        cy.get("td")
          .eq(5)
          .within(() => {
            cy.findByTestId("ArrowRightIcon").click({ force: true });
          });
      });
    cy.findByTestId("MenuOpenIcon").click();
    // click the edit button
    cy.findByRole("button", {
      name: /edit/i,
    }).click();
    // confirm if the data is pre-populated
    cy.findByText(customerName).should("contain", customerName);

    cy.findByRole("textbox", { name: /l\.p\.o number/i }).should(
      "have.value",
      Invoice.lpo_number
    );
    cy.findByRole("textbox", { name: /delivery note number/i }).should(
      "have.value",
      Invoice.delivery_note_number
    );
    cy.findByRole("combobox", { name: /product\/service name/i }).should(
      "have.value",
      ProductPos.name
    );
    cy.findByRole("textbox", { name: /description/i }).should(
      "have.value",
      ProductPos.description
    );
    cy.findByRole("spinbutton", { name: /quantity/i }).should(
      "have.value",
      productCount
    );
    cy.findByRole("textbox", { name: /price/i }).should(
      "have.value",
      Math.floor(ProductPos.retail_price)
    );
    cy.findByRole("spinbutton", {
      name: /total/i,
    }).should("have.value", Math.floor(ProductPos.retail_price * productCount));
    cy.findByRole("textbox", { name: /terms and conditions/i }).should(
      "have.value",
      Invoice.terms_and_conditions
    );

    // start updating the invoice

    cy.findByRole("textbox", { name: /l\.p\.o number/i })
      .clear()
      .type(InvoiceUpdate.lpo_number);
    cy.findByRole("textbox", { name: /delivery note number/i })
      .clear()
      .type(InvoiceUpdate.delivery_note_number);
    cy.findByRole("combobox", { name: /product\/service name/i })
      .click()
      .clear()
      .type(ProductPos.name);
    cy.get('ul[role="listbox"]').contains("li", ProductPos.name).click();
    cy.findByRole("spinbutton", { name: /quantity/i })
      .clear()
      .type(productCountUpdate);
    cy.findByRole("textbox", { name: /price/i }).should(
      "have.value",
      Math.floor(ProductPos.retail_price)
    );
    cy.findByRole("spinbutton", {
      name: /total/i,
    }).should(
      "have.value",
      Math.floor(ProductPos.retail_price * productCountUpdate)
    );
    cy.findByRole("textbox", { name: /terms and conditions/i })
      .clear()
      .type(InvoiceUpdate.terms_and_conditions);
    cy.findByText("Update").click();
    cy.wait(1000);
    cy.visit(link + "/dashboard/invoices");
    cy.wait(1000);
    cy.get("tbody")
      .children()
      .eq(0)
      .within(() => {
        cy.get("td").eq(0).should("contain", customerName);
        cy.get("td")
          .eq(1)
          .should(
            "contain",
            Math.floor(ProductPos.retail_price * productCountUpdate)
          );
        cy.get("td").eq(4).should("contain", "Draft");
      });
  });
  // Approve the invoice
  it("Approve Draft Incoice", () => {
    cy.wait(1000);
    cy.findByTestId("MenuOpenIcon").click();

    cy.get("tbody")
      .children()
      .eq(0)
      .within(() => {
        cy.get("td").eq(0).should("contain", customerName);
        cy.get("td").eq(4).should("contain", "Draft");
        cy.get("td")
          .eq(5)
          .within(() => {
            cy.findByTestId("ArrowRightIcon").click({ force: true });
          });
      });
    // Click the approve button
    // **

    cy.findByRole("button", { name: /approve draft/i }).click();
    cy.findByRole("button", { name: /yes, proceed/i }).click();

    // **
    cy.findByRole("button", { name: /record payment/i }).should("exist");
    // Confirm if the status is approved
    cy.visit(link + "/dashboard/invoices");
    cy.wait(1000);
    cy.get("tbody")
      .children()
      .eq(0)
      .within(() => {
        cy.get("td").eq(0).should("contain", customerName);
        cy.get("td").eq(4).should("not.contain", "Draft");
      });
  });
  // Record payment
  it.only("Record Payment of an Invoice", () => {
    cy.wait(1000);
    cy.findByTestId("MenuOpenIcon").click();

    cy.get("tbody")
      .children()
      .eq(0)
      .within(() => {
        cy.get("td").eq(0).should("contain", customerName);
        cy.get("td").eq(4).should("not.contain", "Draft");
        cy.get("td")
          .eq(5)
          .within(() => {
            cy.findByTestId("ArrowRightIcon").click({ force: true });
          });
      });
    // Click the approve button
    // **

    cy.findByRole("button", { name: /record payment/i })
      .should("exist")
      .click();
    cy.findByText(customerName).should("exist");
    cy.findByRole("heading", { name: /cash/i }).click();
    cy.findByRole("button", { name: /checkout/i });
    // Confirm if the status is approved
  });
});
