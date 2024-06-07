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

    // Additional steps if needed, e.g., verifying the item is in the cart
  });


});
