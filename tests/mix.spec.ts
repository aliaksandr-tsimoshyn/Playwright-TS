import { test, expect, BrowserContext } from "@playwright/test"
import { LoginPage } from "../page-objects/login-page"
import { MainPage } from "../page-objects/main-page"
import { createWebSessionContext } from "../utils/functions"
import { settings } from "../utils/background"

test.describe.configure({ mode: `parallel` })

test.beforeAll(async ({ browser }) => {
  settings.webContext = await createWebSessionContext(
    settings.activeUser.email,
    settings.activeUser.password,
    browser
  )
})

test(`@web Get First Event Mix`, async ({ context, browser }) => {

  context = settings.webContext as BrowserContext

  const page = await context.newPage()
  const loginPage = new LoginPage(page)
  const mainPage = new MainPage(page)

  await loginPage.goToEspresa()

  await mainPage.isUserLoggedIn(
    settings.activeUser.firstName,
    settings.activeUser.lastName
  )

  let firstIventInfo = await mainPage.cardsInfo.first().textContent()

  console.log(`First event: ${firstIventInfo}`) 

})

test(`@web Fake Coins Mix`, async ({ context, browser }) => {
  
  context = settings.webContext as BrowserContext

  const page = await context.newPage()
  const loginPage = new LoginPage(page)
  const mainPage = new MainPage(page)

  await page.route(
    `${settings.baseURL}api/company/employee/points/`,
    async (route) => {
      const response = await page.request.fetch(route.request()) 

      const newBody = {
        available_points: 777,
      }

      route.fulfill({
        response: response,
        body: JSON.stringify(newBody),
      })
    }
  )

  await loginPage.goToEspresa()
  await expect(
    await mainPage.cardsInfo.first(),
    `First card isn't visible`
  ).toBeVisible()

  await page.screenshot({ path: `screenshots/fakeCoins.png` })

  let coinsCount = await mainPage.userCoins.textContent()
  expect(coinsCount, `Coins count is incorrect`).toEqual(`777.00 LX Coins`)

  console.log(`Fake ${coinsCount} are available to the user`)

})
