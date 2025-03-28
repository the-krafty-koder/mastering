/*
// using the singleton pattern to perfom queries on the db
import { promisify } from "util";
import { db } from "./patternsSingletonDb.js";

const dbRun = promisify(db.run.bind(db));
const dbAll = promisify(db.all.bind(db));
export class Blog {
  initialize() {
    const initQuery = `CREATE TABLE IF NOT EXISTS posts (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      content TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`;
    return dbRun(initQuery);
  }
  createPost(id, title, content, createdAt) {
    return dbRun(
      "INSERT INTO posts VALUES (?, ?, ?, ?)",
      id,
      title,
      content,
      createdAt
    );
  }
  getAllPosts() {
    return dbAll("SELECT * FROM posts ORDER BY created_at DESC");
  }
}
*/

// new function
import { promisify } from "util";
import { db } from "./patternsSingletonDb.js";

export class Blog {
  constructor(db) {
    this.db = db;
    this.dbRun = promisify(db.run.bind(db));
    this.dbAll = promisify(db.all.bind(db));
  }
  initialize() {
    const initQuery = `CREATE TABLE IF NOT EXISTS posts (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      content TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`;
    return dbRun(initQuery);
  }
  createPost(id, title, content, createdAt) {
    return dbRun(
      "INSERT INTO posts VALUES (?, ?, ?, ?)",
      id,
      title,
      content,
      createdAt
    );
  }
  getAllPosts() {
    return dbAll("SELECT * FROM posts ORDER BY created_at DESC");
  }
}
