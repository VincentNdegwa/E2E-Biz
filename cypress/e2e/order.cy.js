const { link } = require("./modules/env");
import { Customer } from "./data/customer";
import { ProductPos } from "./data/product";
import { loginUser } from "./modules/login";

describe("Order operations", () => {
    const ordersLink = link + "/dashboard/orders";
    const transactionLink = link + "/dashboard/transactions";
    const initialProdQuantity = 2;
    const updateProdQuantity = 4;
    const customerName = Customer.first_name + " " + Customer.last_name;
    beforeEach("Open invoice page", () => {
      cy.visit(link);
      loginUser();
      cy.visit(ordersLink);
      cy.findByTestId("MenuOpenIcon").click();
    });

    it("Create a new order", () => {
      cy.findByRole("button", { name: /new order/i }).click();
      cy.findByRole("combobox", { name: /product\/service name/i }).type(
        ProductPos.name
      );
      cy.get('ul[role="listbox"]').contains("li", ProductPos.name).click();
      cy.findByRole("spinbutton", {
        name: /quantity/i,
      }).should("have.value", 1);

      cy.findByRole("spinbutton", { name: /total/i }).should(
        "have.value",
        Math.floor(ProductPos.retail_price)
      );
      cy.findByText("Next").click({ force: true });
      cy.findByRole("button", { name: /add customer/i }).click();
      cy.findByPlaceholderText(/search customers\.\.\./i).type(customerName);
      cy.wait(1000);
      cy.findByText(customerName).parentsUntil("ul").eq(0).click();
      cy.findByRole("button", {
        name: /ship to billing address/i,
      }).click();
      cy.findByRole("button", { name: /submit/i }).click({ force: true });
      cy.wait(1000);
      cy.visit(ordersLink);
      cy.get("tbody").within(() => {
        cy.get("tr")
          .eq(0)
          .should("exist")
          .within(() => {
            // 0-6
            cy.get("td").eq(1).should("contain", customerName);
            cy.get("td").eq(3).should("contain", "Pending");
            cy.get("td").eq(4).should("contain", "Unpaid");
            cy.get("td").eq(5).should("contain", ProductPos.retail_price);
          });
      });
    });
    it("Record payment of an unpaid Order", () => {
      cy.get("tbody").within(() => {
        cy.get("tr")
          .eq(0)
          .should("exist")
          .within(() => {
            // 0-6
            cy.get("td").eq(1).should("contain", customerName);
            cy.get("td").eq(3).should("contain", "Pending");
            cy.get("td").eq(4).should("contain", "Unpaid");
            cy.get("td").eq(5).should("contain", ProductPos.retail_price);
            cy.get("td")
              .eq(6)
              .within(() => {
                cy.findByTestId("ArrowRightIcon").click();
              });
          });
      });
      cy.wait(3000);
      cy.get("body").click();
      //   cy.findByTestId("MenuOpenIcon").click();
      cy.findByRole("button", { name: /record payment/i }).click();
      cy.findByRole("heading", { name: /cash/i }).click();
      cy.findByRole("button", { name: /checkout/i }).click();
      cy.wait(1000);
    });
    it.only("Confirm if the payment was posted in the transaction", () => {
      cy.visit(transactionLink);
      cy.wait(1000);
      cy.get("tbody").within(() => {
        cy.get("tr")
          .eq(0)
          .within(() => {
            cy.get("td");
          });
      });
    });
});
