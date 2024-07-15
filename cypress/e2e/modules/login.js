function loginUser() {
    cy.findByRole("spinbutton", { name: /phone number/i }).type("769287724");
    cy.findByRole("button", { name: /log in/i }).click();
    cy.findByLabelText(/password/i).type("Deal01$");
    cy.findByRole('button', { name: /log in/i }).click();
    // Wait for a successful login indication
    cy.document().its('readyState').should("eq", 'complete')
    cy.wait(10000)
    // cy.findByText(/getrude/i, { timeout: 10000 }).should("exist");
}

module.exports = { loginUser };
