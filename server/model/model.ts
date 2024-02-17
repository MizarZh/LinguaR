import { drizzle } from 'drizzle-orm/bun-sqlite'
import { Database } from 'sqlite3'

const sqlite = new Database('sqlite.db')
const db = drizzle(sqlite)
