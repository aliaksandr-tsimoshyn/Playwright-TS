import { APIRequestContext, BrowserContext } from "@playwright/test"

type Settings = {
  baseURL: string,
  sessionID: string,
  webContext: BrowserContext | null,
  apiContext: APIRequestContext | null
  activeUser: User,

}

type User = {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
}

export const settings: Settings = {
  baseURL: process.env.URLPROD || '',
  sessionID: '',
  webContext: null,
  apiContext: null,
  activeUser: {
    firstName: 'Aliaksandr',
    lastName: 'Tsimoshyn',
    email: process.env.EMAIL || '',
    password: process.env.PASSWORD || '',
  },
}



