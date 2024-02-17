import express, { Express, Request, Response, Application } from 'express'
import { Database } from 'sqlite3'

const app = express()
const port = 3000

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.get('/text', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
