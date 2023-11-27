import { test, expect, APIRequestContext } from "@playwright/test"
import { settings } from "../utils/background"
import { customtest } from "../utils/base-extensions"
import { createAPISessionContext } from "../utils/functions"


/*test.beforeAll(async () => {
  settings.apiContext = await createAPISessionContext(
    settings.activeUser.email,
    settings.activeUser.password
  )
})*/

test(`@api Login To Espresa`, async ({ request }) => {
  const loginResponse = await request.post(`${settings.baseURL}api/auth`, {
    data: {
      username: settings.activeUser.email,
      password: settings.activeUser.password,
    },
  })
  await expect(loginResponse, `The user isn't logged in`).toBeOK()

  let loginStatus = loginResponse.status()

  console.log(`The user is logged in with status code ${loginStatus}`)
})

customtest(
  `@api Negative Login To Espresa`,
  async ({ request, invalidUser, myUser }) => {
    const loginResponse = await request.post(`${settings.baseURL}api/auth`, {
      data: {
        username: invalidUser.email,
        password: invalidUser.password,
      },
    })

    let loginStatus = loginResponse.status()
    expect(loginStatus, `Login status isn't 401`).toBe(401)

    let errorText = (await loginResponse.json()).detail

    console.log(errorText)
  }
)

test(`@api Get User Coins`, async ({ request }) => {
  
  request = settings.apiContext as APIRequestContext;

  const apiResponse = await request.get(
    `${settings.baseURL}api/company/employee/points/`
  )
  await expect(apiResponse, `Request is failed`).toBeOK()

  let userCoins = (await apiResponse.json()).available_points

  console.log(`${userCoins} LX Coins are available to the user`)
})

