import { APIRequestContext, BrowserContext, test as base } from '@playwright/test'
import { settings } from "./settings"
import { LoginPage } from "../page-objects/login-page"
import { MainPage } from "../page-objects/main-page"
import { createAuthorizedAPIContext, createAuthorizedWebContext } from "../utils/functions"


type Fixtures = {
  loginPage: LoginPage,
  mainPage: MainPage,
  authorizedRequest: APIRequestContext,
  authorizedContext: BrowserContext,
}

type Options = {
  invalidUser: User
}

type User = {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
}

export const test = base.extend<Options & Fixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  mainPage: async ({ page }, use) => {
    await use(new MainPage(page));
  },
  authorizedRequest: async ({}, use) => { 
    await use(await createAuthorizedAPIContext(
    settings.activeUser.email,
    settings.activeUser.password
    ))
  },
  authorizedContext: async ({browser}, use) => { 
    await use(await createAuthorizedWebContext(
    settings.activeUser.email,
    settings.activeUser.password,
    browser
    ))
  },
  invalidUser: {
    firstName: "Invalid",
	  lastName: "User",
	  email: "invalid.email",
	  password: "invalid_password"
  },
})
