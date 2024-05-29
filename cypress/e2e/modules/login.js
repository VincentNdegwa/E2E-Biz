function loginUser() {
    cy.findByRole('spinbutton', { name: /phone number/i }).type('717089646')
    cy.findByRole('button', { name: /log in/i }).click()
    cy.findByLabelText(/password/i).type("9090@Wahu")
    cy.findByRole('button', { name: /log in/i }).click()
    // cy.findByText(/getrude/i, { delay: 10000 }).should("exist")
}
module.exports = { loginUser }