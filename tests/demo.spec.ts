import { expect } from "@playwright/test"
import { test } from "../utils/extensions"

test.describe(`Resource 1`, () => {
  test.describe.configure({ mode: `default` })

  test(`@demo Dynamic ID`, async ({ page }) => {
    await page.goto(`http://uitestingplayground.com/dynamicid`)
    await page.getByText(`Button with Dynamic ID`).click()
  })

  test(`@demo Client Side Delay`, async ({ page }) => {
    await page.goto(`http://uitestingplayground.com/clientdelay`)
    await page.getByText(`Button Triggering Client Side Logic`).click()
    const loadedData = page.locator(`.bg-success`)
    expect(loadedData, `Data isn't loaded`).toBeVisible()
    await loadedData.click()
  })

  test(`@demo Progress Bar`, async ({ page }) => {
    await page.goto(`http://uitestingplayground.com/progressbar`)
    await page.locator(`#startButton`).click()
    //await page.locator(`[aria-valuenow='75']`).isEnabled()
    await expect(page.locator(`#progressBar`)).toContainText("75")
    await page.locator(`#stopButton`).click()
  })

  test(`@demo Shadow Dom`, async ({ context }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"])
    const page = await context.newPage()
    await page.goto(`http://uitestingplayground.com/shadowdom`)
    await page.locator(`#buttonGenerate`).click()
    const generatedValue = await page.locator(`#editField`).inputValue()
    expect(generatedValue).toHaveLength(36)
    await page.locator(`#buttonCopy`).click()
    const clipboardContent = await page.evaluate(() =>
      navigator.clipboard.readText()
    )
    expect(generatedValue, `Values aren't equal`).toEqual(clipboardContent)
  })
})
