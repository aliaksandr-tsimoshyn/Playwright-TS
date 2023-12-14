import { test as base } from '@playwright/test'

type Options = {
  myUser: User,
  invalidUser: User
}

type User = {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
}

export const customtest = base.extend<Options>({
  myUser: {
    firstName: `Aliaksandr`,
    lastName: `Tsimoshyn`,
    email: process.env.EMAIL || '',
    password: process.env.PASSWORD || '',
  },
  invalidUser: {
    firstName: "Invalid",
	  lastName: "User",
	  email: "invalid.email",
	  password: "invalid_password"
  },
})
