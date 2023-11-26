import { defineConfig } from '@playwright/test';;
import dotenv from 'dotenv'
import path from 'path';

dotenv.config({
  //path: `./envs/.env.${process.env.ENV || 'qa'}`
  path: `.env` 
  //path: `./envs/.env${process.env.ENV ? '.' + process.env.ENV : ''}`
  //path: './envs/.env' + (process.env.ENV ? '.' + process.env.ENV : '')
  //terminal: $env:ENV="prod"  
})
console.log(process.env.ENV, process.env.URL)


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
