import { Page, expect } from "@playwright/test"

export class MainPage {

  page: Page
  userGreeting: any
  cardsInfo: any
  userCoins: any
  
  constructor(page: Page) {
    this.page = page
    this.userGreeting = this.page.locator(
      "[class='name name-max-width ng-binding name-only']"
    )
    this.cardsInfo = this.page.locator(".service-card-info h4") 
    this.userCoins = this.page.locator(
      "[ng-if='!$ctrl.userInfo.link_for_points']"
    )
  }

  async isUserLoggedIn(firstName: any, lastName: any) {
    let userGreetingText = (await this.userGreeting.textContent()).replace(
      /\s\s+/g,
      " "
    )
    expect(userGreetingText, `The user isn't logged in`).toContain(
      `Hello, ${firstName} ${lastName}`
    )

    return userGreetingText
  }
}