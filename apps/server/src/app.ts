import express, { Express, Request, Response, Application } from 'express'
import { getArticle, getVocab, insertVocab, insertArticle } from './model/model'
import { vocabTableInsert } from './types'

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/api/:lang/articles', (req, res) => {
  console.log(req.params, req.query)
})

app.get('/api/:lang/article', (req, res) => {
  return getArticle(req.params.lang)
})

app.get('/api/:lang/vocab', (req, res) => {})

app.post('/api/:lang/vocab', (req, res) => {
  insertVocab(req.params.lang, req.body as vocabTableInsert)
})

app.get('/api/test/:lang/article', (req, res) => {
  insertArticle(req.params.lang, {
    tokens: 'tests',
    tag: 'tst',
    note: 'fji',
    collection: 'great',
  })
})

app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`)
})
