import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import fs from 'fs'
import dotenv from 'dotenv'

dotenv.config()


const sslCertPath = process.env.SSL_CERT_PATH
const sslKeyPath = process.env.SSL_KEY_PATH

if (!sslCertPath || !sslKeyPath) {
  throw new Error("SSL certificate and key paths must be defined in .env")
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   https: {
  //     key: fs.readFileSync(sslKeyPath),
  //     cert: fs.readFileSync(sslCertPath),
  //   }
  // }
})
