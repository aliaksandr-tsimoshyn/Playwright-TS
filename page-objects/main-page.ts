import { Locator, Page, expect } from "@playwright/test"
import { settings } from "../utils/settings"

export class MainPage {
  page: Page
  userGreeting: Locator
  cardsInfo: Locator
  userCoins: Locator

  constructor(page: Page) {
    this.page = page
    this.userGreeting = page.locator(
      "[class='name name-max-width ng-binding name-only']"
    )
    this.cardsInfo = page.locator(".service-card-info h4")
    this.userCoins = page.locator("[ng-if='!$ctrl.userInfo.link_for_points']")
  }

  async goToDashboard() {
    await this.page.goto(`${settings.baseURL}portal/#/employee/dashboard`)
  }

  async isUserLoggedIn(firstName: string, lastName: string) {
    let userGreetingText = (
      (await this.userGreeting.textContent()) as string
    ).replace(/\s\s+/g, " ")

    expect(userGreetingText, `The user isn't logged in`).toContain(
      `Hello, ${firstName} ${lastName}`
    )

    return userGreetingText
  }
}
