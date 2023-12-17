import { Locator, Page } from "@playwright/test"
import { settings } from "../utils/settings"

export class LoginPage {
  page: Page
  emailField: Locator
  continueButton: Locator
  passwordField: Locator
  submitButton: Locator
  loginError: Locator

  constructor(page: Page) {
    this.page = page
    this.emailField = page.locator("#login_login")
    this.continueButton = page.locator("#login_next")
    this.passwordField = page.locator("#login_password")
    this.submitButton = page.locator("#login_submit")
    this.loginError = page.locator("#login_error")
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
