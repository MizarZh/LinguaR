"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertArticle = exports.getArticle = exports.insertVocab = exports.getVocab = exports.getArticleTable = exports.getVocabTable = void 0;
const better_sqlite3_1 = require("drizzle-orm/better-sqlite3");
const better_sqlite3_2 = __importDefault(require("better-sqlite3"));
const sqlite_core_1 = require("drizzle-orm/sqlite-core");
const sqlite = new better_sqlite3_2.default('sqlite.db');
const db = (0, better_sqlite3_1.drizzle)(sqlite);
function getVocabTable(language) {
    return (0, sqlite_core_1.sqliteTable)(`word-${language}`, {
        id: (0, sqlite_core_1.integer)('id').primaryKey(),
        word: (0, sqlite_core_1.text)('word').notNull(),
        tag: (0, sqlite_core_1.text)('tag'),
        level: (0, sqlite_core_1.integer)('level').notNull(),
        note: (0, sqlite_core_1.text)('note'),
        source: (0, sqlite_core_1.text)('source'),
    });
}
exports.getVocabTable = getVocabTable;
function getArticleTable(language) {
    return (0, sqlite_core_1.sqliteTable)(`article-${language}`, {
        id: (0, sqlite_core_1.integer)('id').primaryKey(),
        tokens: (0, sqlite_core_1.text)('tokens').notNull(),
        tag: (0, sqlite_core_1.text)('tag'),
        note: (0, sqlite_core_1.text)('note'),
        collection: (0, sqlite_core_1.text)('collection'),
    });
}
exports.getArticleTable = getArticleTable;
async function getVocab(language) {
    const table = getVocabTable(language);
    return await db.select().from(table);
}
exports.getVocab = getVocab;
async function insertVocab(language, vocab) {
    const table = getVocabTable(language);
    await db.insert(table).values(vocab);
}
exports.insertVocab = insertVocab;
async function getArticle(language) {
    const table = getArticleTable(language);
    return await db.select().from(table);
}
exports.getArticle = getArticle;
async function insertArticle(language, article) {
    const table = getArticleTable(language);
    await db.insert(table).values(article);
}
exports.insertArticle = insertArticle;
//# sourceMappingURL=model.js.map