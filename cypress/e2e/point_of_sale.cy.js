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
    //   CreateProduct(ProductPos);
    // click the add product button
    // add the product details in the form
    // click the save button
  });
  //   it("Perform a quick sale", () => {
  // Get the create product
  // Add the product to the cart
  // Click the checkout button
  // Select the payment method
  //   });
});
