import { link } from "./modules/env";
import { loginUser } from "./modules/login";
import { ProductPos } from "./data/product";
import { CreateProduct } from "./functions/AddingProduct";
describe("Performing a POS transaction", () => {
  beforeEach("Login user", () => {
    cy.visit(link);
    loginUser();
  });
  it("Create a product", () => {
    cy.findByText("Create New").click({ force: true });
    cy.findByRole("menuitem", { name: /product/i }).click();
    cy.findByTestId("MenuOpenIcon").click();
    CreateProduct(ProductPos);
  });
  it.only("Perform a quick sale", () => {
    cy.visit(link + "/dashboard/pos");
    cy.findByTestId("MenuOpenIcon").click();
    cy.get("#filter-demo").type(ProductPos.name, { force: true });
    cy.get("body").click();
    cy.contains(ProductPos.name).click();

    cy.contains(ProductPos.name)
      .parentsUntil(".MuiBox-root.css-so0ahg") // Traverse up to the parent container of the product card
      .parent() // Navigate to the correct parent container
      .within(() => {
        cy.contains("button", "Add to Cart").click();
      });

    cy.findByTestId("ShoppingCartIcon").click();
    cy.findByRole("heading", { name: /new order bill/i }).should("exist");
    cy.findByRole("button", { name: /proceed to checkout/i }).click();
    cy.findByRole("heading", { name: /mpesa/i }).parent().click();
    cy.findByRole("button", { name: /checkout/i }).click();
    cy.visit(link + "/dashboard/transactions");
    cy.wait(1000);
    cy.get("body").click();
    cy.get(".MuiTableRow-root.MuiTableRow-hover.css-rw4e8j")
      .eq(0)
      .within(() => {
        let elements = {
          customer: "Walk In",
          description: "Point of Sale",
          category: "Pos",
          net_amount: `UG ${ProductPos.retail_price}`,
          vat_amount: "UG 0.00",
          total_amount: `UG ${ProductPos.retail_price}`,
          payment_type: "Mpesa",
        };
        let startIndex = 2;
        for (let key in elements) {
          cy.get("td")
            .eq(startIndex)
            .invoke("text")
            .should("equal", elements[key]);
          startIndex++;
        }
      });

    // Additional steps if needed, e.g., verifying the item is in the cart
  });


});
