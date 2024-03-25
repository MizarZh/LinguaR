import { drizzle } from 'drizzle-orm/better-sqlite3'
import Database from 'better-sqlite3'
import {
  sqliteTable,
  text,
  integer,
  uniqueIndex,
} from 'drizzle-orm/sqlite-core'

import { vocabTableInsert, articleTableInsert } from '../types'

const sqlite = new Database('sqlite.db')
const db = drizzle(sqlite)

export function getVocabTable(language: string) {
  return sqliteTable(`word-${language}`, {
    id: integer('id').primaryKey(),
    word: text('word').notNull(),
    tag: text('tag'),
    level: integer('level').notNull(),
    note: text('note'),
    source: text('source'),
  })
}

export function getArticleTable(language: string) {
  return sqliteTable(`article-${language}`, {
    id: integer('id').primaryKey(),
    tokens: text('tokens').notNull(),
    tag: text('tag'),
    note: text('note'),
    collection: text('collection'),
  })
}

export async function getVocab(language: string) {
  const table = getVocabTable(language)
  return await db.select().from(table)
}

export async function insertVocab(language: string, vocab: vocabTableInsert) {
  const table = getVocabTable(language)
  await db.insert(table).values(vocab)
}

export async function getArticle(language: string) {
  const table = getArticleTable(language)
  return await db.select().from(table)
}

export async function insertArticle(
  language: string,
  article: articleTableInsert
) {
  const table = getArticleTable(language)
  await db.insert(table).values(article)
}
