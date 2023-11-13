import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv'

dotenv.config({
  path: `./envs/.env`
})

export default defineConfig({
  testDir: "./tests",

  retries: 1, 

  workers: 5, 

  timeout: 40 * 1000,

  expect: {
    timeout: 20 * 1000,
  },

  reporter: "html", 

  use: {
    browserName: "chromium",
    headless: false,
    screenshot: "on", 
    trace: "on", 
    video: "on", 
    
  },
});
