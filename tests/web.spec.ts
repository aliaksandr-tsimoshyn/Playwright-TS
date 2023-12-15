import { expect } from "@playwright/test"
import { LoginPage } from "../page-objects/login-page"
import { MainPage } from "../page-objects/main-page"
import { settings } from "../utils/settings"
import { test } from "../utils/extensions"


test.describe.configure({ mode: `default` }) 

test(`@web Login To Espresa`, async ({ loginPage, mainPage }) => {
  
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

test(`@web Negative Login To Espresa`, async ({ page, loginPage, invalidUser }) => {
    
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

test(`@web Get First Event`, async ({ loginPage, mainPage }) => {
  
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

