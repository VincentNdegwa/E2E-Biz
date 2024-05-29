import { loginUser } from "./modules/login"
describe('user login', () => {
  beforeEach(() => {
    cy.visit('https://uat-biz.tenzi.africa')

  })
  it('login the user', () => {
    loginUser()
  })

})