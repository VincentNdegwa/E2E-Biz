import {
  product,
  productEdit,
  ProductPos,
  productTaxInclusive,
  productTaxExclusive,
  productDecimalPrice,
} from "./data/product.js";
import { loginUser } from "./modules/login.js";

describe("Deleting all products", () => {
  const products = [
    product,
    productEdit,
    ProductPos,
    productTaxExclusive,
    productTaxInclusive,
    productDecimalPrice,
  ];

  beforeEach("Opening the Product interface", () => {
    cy.visit("https://uat-biz.tenzi.africa");
    loginUser();

    cy.url().should("contain", "/dashboard");
    cy.findByRole("button", { name: /inventory/i }).click();
    cy.findByRole("button", { name: /items/i }).click();
    cy.wait(1000);
    cy.findByTestId("MenuOpenIcon").click();
  });

  it("Delete all the products that were created by automation", () => {
    products.forEach((item) => {
      cy.findByRole("textbox").clear().type(item.name);
      cy.wait(5000);
      cy.get("tbody").within(() => {
        cy.get("tr").each(($row) => {
          if ($row.length > 0) {
            cy.wrap($row).findByTestId("MoreHorizIcon").click({ force: true });
          }
        });
      });

      cy.findByRole("menuitem", { name: /delete/i }).click();
      cy.findByRole("button", { name: /yes, proceed/i }).click();
    });
  });
});
