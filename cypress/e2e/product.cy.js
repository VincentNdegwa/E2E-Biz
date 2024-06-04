import { loginUser } from "./modules/login";
import { product, productEdit } from "./data/product"
describe("Products", () => {
    // Generate a unique product name
    const uniqueProductName = `random-${Date.now()}`;

    // Start typing values
    // const product = {
    //     name: "Auto product",
    //     description: "Test description",
    //     category: "Test category",
    //     brand: "Test brand",
    //     location: "Test location",
    //     barcode: "123456789012",
    //     opening_quantity: "100",
    //     quantity_unit_code: "pieces",
    //     buying_price: "50.00",
    //     retail_price: "70.00"
    // };
    // const productEdit = {
    //     name: "Auto product edited",
    //     description: "Test description edited",
    //     category: "Test category edit",
    //     brand: "Test brand edit",
    //     location: "Test location edit",
    //     barcode: "6789",
    //     opening_quantity: "100",
    //     quantity_unit_code: "pieces",
    //     buying_price: "40.00",
    //     retail_price: "80.00"
    // };
    beforeEach("Opening the Product interface", () => {
        cy.visit('https://uat-biz.tenzi.africa');
        loginUser();

        cy.url().should('contain', '/dashboard')
        cy.findByRole('button', { name: /inventory/i }).click();
        cy.findByRole('button', { name: /items/i }).click();
    })

    it("Creating a product", () => {
        cy.wait(10000);
        cy.findByTestId('MenuOpenIcon').click();
        // Display product form
        cy.findByRole('button', { name: /add product/i }).click();
        cy.document().its('readyState').should('eq', 'complete');

        cy.findByRole('textbox', { name: /product name/i, force: true }).type(product.name);
        cy.findByRole('textbox', { name: /description/i }).type(product.description);
        cy.findByRole('textbox', { name: /brand/i }).type(product.brand);
        cy.findByRole('textbox', { name: /location/i }).type(product.location);
        cy.findByRole('textbox', { name: /bar code/i }).type(product.barcode)
        cy.findByRole('button', { name: /next/i }).click();
        cy.findByRole('spinbutton', { name: /opening quantity/i }).type(product.opening_quantity);

        cy.findByRole('button', { name: /quantity unit code/i }).click();
        cy.findByRole('option', { name: /pieces/i }).click();

        cy.findByRole('textbox', { name: /buying price/i }).type(product.buying_price);
        cy.findByRole('textbox', { name: /retail price/i }).type(product.retail_price);

        cy.findByText(/preview/i).click();
        cy.findByText(new RegExp(product.name)).should("exist")
        cy.findByText(new RegExp(product.description)).should("exist");
        cy.findByText(new RegExp(product.barcode)).should("exist");
        cy.findByText(new RegExp(product.opening_quantity)).should("exist");
        cy.findByText(new RegExp(product.buying_price)).should("exist");
        cy.findByText(new RegExp(product.retail_price)).should("exist");


        cy.findByRole('button', { name: /submit/i }).click();
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
    it("Update the product", () => {
        cy.findByTestId('MenuOpenIcon').click()
        cy.findByPlaceholderText(/search product by name/i, { force: true }).type(product.name)
        cy.findByRole('row', { name: new RegExp(product.name, 'i') }).within(() => {
            cy.findByTestId('MoreHorizIcon').click();
        });
        // Preview the product details
        cy.findByRole('menuitem', { name: /view/i }).click();
        // Confirming the product displayed
        cy.findByRole('heading', { name: new RegExp(product.name, 'i') }).should('exist');
        cy.findByRole('tab', { name: /details/i }).click()
        cy.findByRole("cell", { name: new RegExp(product.name) }).should("exist")
        cy.findByRole("cell", { name: new RegExp(product.description) }).should("exist");
        cy.findByRole("cell", { name: new RegExp(product.barcode) }).should("exist");
        cy.findByRole("cell", { name: new RegExp(product.opening_quantity) }).should("exist");
        // cy.findByRole("cell", { name: new RegExp(product.buying_price) }).should("exist");
        // cy.findByRole("cell", { name: new RegExp(product.retail_price) }).should("exist");
        cy.findByRole('button', { name: /edit/i }).click();
        cy.findByDisplayValue(new RegExp(product.name)).should("exist")
        cy.findByDisplayValue(new RegExp(product.description)).should("exist");
        cy.findByDisplayValue(new RegExp(product.location)).should("exist");
        cy.findByDisplayValue(new RegExp(product.brand)).should("exist");
        cy.findByDisplayValue(new RegExp(product.barcode)).should("exist");
        cy.findByDisplayValue(new RegExp(product.opening_quantity)).should("exist");
        cy.findByRole('spinbutton', {
            name: /buying price/i
        }).should("have.value", Math.round(product.buying_price))
        cy.get('input[name="sellingPrice"]').should("have.value", Math.round(product.retail_price))


        // starting to edit
        cy.findByDisplayValue(new RegExp(product.name)).clear().type(productEdit.name)
        cy.findByDisplayValue(new RegExp(product.description)).clear().type(productEdit.description)
        cy.findByDisplayValue(new RegExp(product.barcode)).clear().type(productEdit.barcode)
        cy.findByRole('textbox', { name: /brand/i }).clear().type(productEdit.brand)
        cy.findByRole('textbox', { name: /location/i }).clear().type(productEdit.brand)
        cy.findByDisplayValue(new RegExp(product.opening_quantity)).should('have.prop', 'disabled', true)
        cy.findByRole('spinbutton', {
            name: /buying price/i
        }).clear().type(productEdit.buying_price)
        cy.get('input[name="sellingPrice"]').clear().type(productEdit.retail_price)
        cy.findByRole('button', { name: /update/i }).click()
        cy.wait(10000)
    })

    it("Deleting the edited product", () => {
        cy.findByTestId('MenuOpenIcon').click()
        cy.findByPlaceholderText(/search product by name/i, { force: true }).type(productEdit.name)
        cy.findByRole('row', { name: new RegExp(productEdit.name, 'i') }).within(() => {
            cy.findByTestId('MoreHorizIcon').click();
        });
        cy.findByRole('menuitem', { name: /delete/i }).click();
        cy.findByRole('heading', {
            name: /warning!/i
        }).should("exist")
        cy.findByRole('button', { name: /no, cancel/i }).click();
        cy.findByRole('heading', {
            name: /warning!/i
        }).should("not.exist")
        cy.findByRole('menuitem', { name: /delete/i }).click();
        cy.findByRole('heading', {
            name: /warning!/i
        }).should("exist")
        cy.findByRole('button', {
            name: /yes, proceed/i
        }).click()
        cy.findByRole('heading', {
            name: /warning!/i
        }).should("not.exist")

    })

});
