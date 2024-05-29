import { loginUser } from "./modules/login";

describe("operations done in products", () => {
    // Generate a unique product name
    const uniqueProductName = `random-${Date.now()}`;

    // Start typing values
    const product = {
        name: uniqueProductName,
        description: "Test description",
        category: "Test category",
        brand: "Test brand",
        location: "Test location",
        barcode: "123456789012",
        opening_quantity: "100",
        quantity_unit_code: "pieces",
        buying_price: "50.00",
        retail_price: "70.00"
    };

    it("should be able to add a product", () => {
        cy.visit('https://uat-biz.tenzi.africa');
        loginUser();

        cy.url().should('contain', '/dashboard')
        cy.findByRole('button', { name: /inventory/i }).click();
        cy.findByRole('button', { name: /items/i }).click();
        cy.wait(10000);
        cy.findByTestId('MenuOpenIcon').click();
        // Display product form
        cy.findByRole('button', { name: /add product/i }).click();
        cy.document().its('readyState').should('eq', 'complete');

        cy.findByRole('textbox', { name: /product name/i, force: true }).type(product.name);
        cy.findByRole('textbox', { name: /description/i }).type(product.description);
        cy.findByRole('textbox', { name: /brand/i }).type(product.brand);
        cy.findByRole('textbox', { name: /location/i }).type(product.location);
        cy.findByRole('button', { name: /next/i }).click();
        cy.findByRole('spinbutton', { name: /opening quantity/i }).type(product.opening_quantity);

        cy.findByRole('button', { name: /quantity unit code/i }).click();
        cy.findByRole('option', { name: /pieces/i }).click();

        cy.findByRole('textbox', { name: /buying price/i }).type(product.buying_price);
        cy.findByRole('textbox', { name: /retail price/i }).type(product.retail_price);

        cy.findByText(/preview/i).click();
        // cy.findByRole('button', { name: /submit/i }).click();
        cy.findByTestId('ArrowBackIcon').click();
        cy.findByPlaceholderText(/search product by name/i).type(product.name)
        cy.findByRole('row', { name: new RegExp(product.name, 'i') }).within(() => {
            cy.findByTestId('MoreHorizIcon').click();
        });
        // Preview the product details
        cy.findByRole('menuitem', { name: /view/i }).click();
        // Confirming the product displayed
        cy.findByRole('heading', { name: new RegExp(product.name, 'i') }).should('exist');
    });


});
