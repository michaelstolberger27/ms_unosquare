import Database from 'better-sqlite3';
import path from 'path';

const DB_PATH = path.resolve(__dirname, '../../worldcup.db');

const db = new Database(DB_PATH);

// Enable WAL mode for better concurrent read performance
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

export default db;
