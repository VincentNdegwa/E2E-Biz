function CreateProduct(product) {
  cy.findByRole("button", { name: /add product/i }).click();
  cy.document().its("readyState").should("eq", "complete");
  cy.findByRole("textbox", { name: /product name/i, force: true }).type(
    product.name
  );
  cy.findByRole("textbox", { name: /description/i }).type(product.description);
  cy.findByRole("textbox", { name: /brand/i }).type(product.brand);
  cy.findByRole("textbox", { name: /location/i }).type(product.location);
  cy.findByRole("textbox", { name: /bar code/i }).type(product.barcode);
  cy.findByRole("button", { name: /next/i }).click();

  cy.findByRole("textbox", { name: /opening quantity/i }).type(
    product.opening_quantity
  );
  cy.findByRole("combobox", { name: /quantity unit code/i }).click();
  cy.findByRole("option", { name: /pieces/i }).click();

  cy.findByRole("combobox", {
    name: /tax rate/i,
  }).click();

  cy.get('ul[role="listbox"]').contains("li", product.tax_rate).click();
  if (product.tax_inclusive) {
    cy.findByText(/tax inclusive/i)
      .parent()
      .find('input[type="checkbox"]')
      .check();
  } else {
    cy.findByText(/tax inclusive/i)
      .parent()
      .find('input[type="checkbox"]')
      .uncheck();
  }

  cy.findByRole("textbox", { name: /buying price/i }).type(
    product.buying_price
  );
  cy.findByRole("textbox", { name: /retail price/i }).type(
    product.retail_price
  );
  cy.findByRole("spinbutton", {
    name: /minimum retail price/i,
  }).type(product.min_retail_price);

  cy.findByRole("spinbutton", {
    name: /min wholesale price/i,
  }).type(product.min_wholesale_price);

  cy.get('input[name="wholesalePrice"]').type(product.wholesale_price);

  cy.findByText(/preview/i).click();
  cy.findByText(new RegExp(product.name)).should("exist");
  cy.findByText(new RegExp(product.description)).should("exist");
  cy.findByText(new RegExp(product.barcode)).should("exist");
  cy.findByText(new RegExp(product.opening_quantity)).should("exist");
  cy.findByText(new RegExp(product.buying_price)).should("exist");
  cy.findByText(new RegExp(product.retail_price)).should("exist");

  cy.findByRole("button", { name: /submit/i }).click();
  cy.findByTestId("ArrowBackIcon").click();
  cy.findByPlaceholderText(/search product by name/i).type(product.name);
  cy.findByRole("row", { name: new RegExp(product.name, "i") }).within(() => {
    cy.findByTestId("MoreHorizIcon").click();
  });
  // Preview the product details
  cy.findByRole("menuitem", { name: /view/i }).click();
  // Confirming the product displayed
  cy.findByRole("heading", {
    name: new RegExp(product.name, "i"),
  }).should("exist");
}

module.exports = { CreateProduct };
