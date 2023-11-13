import { test, expect } from "@playwright/test"
import { LoginPage } from "../page-objects/login-page"
import { MainPage } from "../page-objects/main-page"
import { settings } from "../utils/background"
import { customtest } from "../utils/base-extensions"


test.describe.configure({ mode: `default` }) 

test(`@web Login To Espresa`, async ({ page }) => {
  const loginPage = new LoginPage(page)
  const mainPage = new MainPage(page)

  await loginPage.loginToEspresa(
    settings.activeUser.email,
    settings.activeUser.password
  )

  let userGreetingText = await mainPage.isUserLoggedIn(
    settings.activeUser.firstName,
    settings.activeUser.lastName
  )

  console.log(userGreetingText)
})

customtest(
  `@web Negative Login To Espresa`,
  async ({ page, invalidUser, myUser }) => {
    const loginPage = new LoginPage(page)

    await loginPage.goToEspresa()

    await loginPage.enterEmail(invalidUser.email)
    await page.waitForTimeout(1 * 1000)

    let loginErrorText = await loginPage.loginError.textContent()
    expect(loginErrorText, `Error text is incorrect`).toContain(
      `Please enter a valid email address.`
    )

    console.log(loginErrorText)
  }
)

test(`@web Get First Event`, async ({ page }) => {
  const loginPage = new LoginPage(page)
  const mainPage = new MainPage(page)

  await loginPage.loginToEspresa(
    settings.activeUser.email,
    settings.activeUser.password
  )

  await mainPage.isUserLoggedIn(
    settings.activeUser.firstName,
    settings.activeUser.lastName
  )

  let firstIventInfo = await mainPage.cardsInfo.first().textContent()

  console.log(`First event: ${firstIventInfo}`) 
})
