import { expect, request } from "@playwright/test"
import { settings } from "./background"

export async function getSessionID(email: any, password: any) {
  const context = await request.newContext()
  const loginResponse = await context.post(`${settings.baseURL}api/auth`, {
    data: {
      username: email,
      password: password,
    },
  })
  await expect(
    loginResponse,
    `Login request is failed. Impossible to get sessionID`
  ).toBeOK()

  const loginResponseCookies = loginResponse.headers()[`set-cookie`]
  const sessionIDIndex = loginResponseCookies.indexOf(`sessionid=`)
  settings.sessionID = loginResponseCookies.slice(
    sessionIDIndex + 10,
    sessionIDIndex + 42
  )
}

export async function createAPISessionContext(email: any, password: any) {
  await getSessionID(email, password)

  const apiContext = await request.newContext({
    extraHTTPHeaders: {
      Cookie: `sessionid=${settings.sessionID}`,
    },
  })

  return apiContext
}

export async function createWebSessionContext(email: any, password: any, browser: any) {
  await getSessionID(email, password)

  const webContext = await browser.newContext()

  await webContext.addCookies([
    { name: "sessionid", value: settings.sessionID, url: settings.baseURL },
  ])

  return webContext
}
