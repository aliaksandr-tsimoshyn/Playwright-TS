import { defineConfig } from '@playwright/test';;
import dotenv from 'dotenv'
import path from 'path';
import { settings } from './utils/background';

dotenv.config({
  path: `.env` 
  //path: `./envs/.env.${process.env.ENV || 'qa'}`
  //path: `./envs/.env${process.env.ENV ? '.' + process.env.ENV : ''}`
  //path: './envs/.env' + (process.env.ENV ? '.' + process.env.ENV : '')
  //terminal: $env:ENV="prod"  
})

console.log(settings.baseURL)

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
    headless: true,
    screenshot: "on", 
    trace: "on", 
    video: "on", 
    
  },
});
