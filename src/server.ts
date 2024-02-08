// server.ts
import createApp from './app'
import { env } from './env'

const startServer = async () => {
  const server = await createApp()
  try {
    server.listen({
      port: env.PORT
    })
    console.log(`HTTP server running on http://localhost:${env.PORT}`)
  } catch (err) {
    console.error('Error starting server:', err)
    process.exit(1)
  }
}

startServer()
