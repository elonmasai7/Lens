import { config } from '../config/index.js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const envPath = path.resolve(__dirname, '../../.env')

if (!fs.existsSync(envPath)) {
  const examplePath = path.resolve(__dirname, '../../.env.example')
  if (fs.existsSync(examplePath)) {
    fs.copyFileSync(examplePath, envPath)
    console.log('Created .env from .env.example')
  }
}
