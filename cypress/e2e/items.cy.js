import { loginUser } from "./modules/login";
import {
  product,
  productEdit,
  productTaxInclusive,
  productTaxExclusive,
} from "./data/product";
import { CreateProduct } from "./functions/AddingProduct";
describe("Products", () => {
  // Start typing values
  beforeEach("Opening the Product interface", () => {
    cy.visit("https://uat-biz.tenzi.africa");
    loginUser();

    cy.url().should("contain", "/dashboard");
    cy.findByRole("button", { name: /inventory/i }).click();
    cy.findByRole("button", { name: /items/i }).click();
  });

  it("Creating a product", () => {
    cy.wait(1000);
    cy.findByTestId("MenuOpenIcon").click();
    CreateProduct(product);
  });
  it.only("Update the product", () => {
    cy.findByTestId("MenuOpenIcon").click();
    cy.findByPlaceholderText(/search product by name/i, { force: true }).type(
      product.name
    );

    cy.findByText(product.name)
      .parents("tr")
      .should("exist")
      .within(() => {
        cy.findByTestId("MoreHorizIcon").click();
      });
    // cy.findByRole('row')
    // Preview the product details
    cy.findByRole("menuitem", { name: /view/i }).click();
    // Confirming the product displayed
    cy.findByRole("heading", { name: new RegExp(product.name, "i") }).should(
      "exist"
    );
    cy.findByRole("tab", { name: /details/i }).click();
    cy.findByRole("cell", { name: new RegExp(product.name) }).should("exist");
    cy.findByRole("cell", { name: new RegExp(product.description) }).should(
      "exist"
    );
    cy.findByRole("cell", { name: new RegExp(product.barcode) }).should(
      "exist"
    );
    // cy.findByRole("cell", {
    //   name: new RegExp(product.opening_quantity),
    // }).should("exist");
    // cy.findByRole("cell", { name: new RegExp(product.buying_price) }).should("exist");
    // cy.findByRole("cell", { name: new RegExp(product.retail_price) }).should("exist");
    cy.findByRole("button", { name: /edit/i }).click();
    cy.findByDisplayValue(new RegExp(product.name)).should("exist");
    cy.findByDisplayValue(new RegExp(product.description)).should("exist");
    cy.findByDisplayValue(new RegExp(product.location)).should("exist");
    cy.findByDisplayValue(new RegExp(product.brand)).should("exist");
    cy.findByDisplayValue(new RegExp(product.barcode)).should("exist");
    // cy.findByDisplayValue(new RegExp(product.opening_quantity)).should("exist");
    cy.findByRole("spinbutton", {
      name: /buying price/i,
    }).should("have.value", Math.round(product.buying_price));
    // cy.findByRole('spin')
    cy.get('input[name="sellingPrice"]').should(
      "have.value",
      Math.round(product.tax_retail_price)
    );

    // starting to edit
    cy.findByDisplayValue(new RegExp(product.name))
      .clear()
      .type(productEdit.name);
    cy.findByDisplayValue(new RegExp(product.description))
      .clear()
      .type(productEdit.description);
    cy.findByDisplayValue(new RegExp(product.barcode))
      .clear()
      .type(productEdit.barcode);
    cy.findByRole("textbox", { name: /brand/i })
      .clear()
      .type(productEdit.brand);
    cy.findByRole("textbox", { name: /location/i })
      .clear()
      .type(productEdit.brand);

    cy.findByRole("spinbutton", {
      name: /buying price/i,
    })
      .clear()
      .type(productEdit.buying_price);
    cy.get('input[name="sellingPrice"]').clear().type(productEdit.retail_price);
    cy.findByRole("button", { name: /update/i }).click();
    cy.wait(10000);
  });

  it("Deleting the edited product", () => {
    cy.findByTestId("MenuOpenIcon").click();
    cy.findByPlaceholderText(/search product by name/i, { force: true }).type(
      productEdit.name
    );
    cy.findByRole("row", { name: new RegExp(productEdit.name, "i") }).within(
      () => {
        cy.findByTestId("MoreHorizIcon").click();
      }
    );
    cy.findByRole("menuitem", { name: /delete/i }).click();
    cy.findByRole("heading", {
      name: /warning!/i,
    }).should("exist");
    cy.findByRole("button", { name: /no, cancel/i }).click();
    cy.findByRole("heading", {
      name: /warning!/i,
    }).should("not.exist");
    cy.findByRole("menuitem", { name: /delete/i }).click();
    cy.findByRole("heading", {
      name: /warning!/i,
    }).should("exist");
    cy.findByRole("button", {
      name: /yes, proceed/i,
    }).click();
    cy.findByRole("heading", {
      name: /warning!/i,
    }).should("not.exist");
  });

  it("create a tax inclusive product", () => {
    cy.wait(1000);
    cy.findByTestId("MenuOpenIcon").click();
    CreateProduct(productTaxInclusive);
  });

  it("create a tax exclusive product", () => {
    cy.wait(1000);
    cy.findByTestId("MenuOpenIcon").click();
    CreateProduct(productTaxExclusive);
  });
});

