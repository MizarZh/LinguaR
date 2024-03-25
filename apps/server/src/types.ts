import { getVocabTable, getArticleTable } from './model/model'

const vocabTable = getVocabTable('')
const articleTable = getArticleTable('')

export type vocabTableInsert = typeof vocabTable.$inferInsert
export type vocabTableSelect = typeof vocabTable.$inferSelect
export type articleTableInsert = typeof articleTable.$inferInsert
export type articleTableSelect = typeof articleTable.$inferSelect
