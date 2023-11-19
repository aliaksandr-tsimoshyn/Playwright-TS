import { Page } from "@playwright/test"
import { settings } from "../utils/background"

export class LoginPage {
  
  page: Page
  emailField: any
  continueButton: any
  passwordField: any
  submitButton: any
  loginError: any 

  constructor(page: Page) {
    this.page = page
    this.emailField = this.page.locator("#login_login")
    this.continueButton = this.page.locator("#login_next")
    this.passwordField = this.page.locator("#login_password")
    this.submitButton = this.page.locator("#login_submit")
    this.loginError = this.page.locator("#login_error")
  }

  async goToEspresa() {
    await this.page.goto(settings.baseURL)
  }

  async enterEmail(email: string) {
    await this.emailField.type(email)
    await this.continueButton.click()
  }

  async loginToEspresa(email: string, password: string) {
    await this.goToEspresa()
    await this.enterEmail(email)
    await this.passwordField.fill(password)
    await this.submitButton.click()
  }
}
