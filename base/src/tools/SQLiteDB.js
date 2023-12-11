const sqlite3 = require('sqlite3').verbose()

/**
sqlite类型
NULL 值是一个 NULL 值。
INTEGER 值是一个带符号的整数，根据值的大小存储在 1、2、3、4、6 或 8 字节中。 布尔值被存储为整型0(false)和1(true)。
REAL 值是一个浮点值，存储为 8 字节的 IEEE 浮点数字。
TEXT 值是一个文本字符串，使用数据库编码（UTF-8、UTF-16BE 或 UTF-16LE）存储。
BLOB 值是一个 blob 数据，完全根据它的输入存储。
 */

class SQLiteDB {
  constructor(dbName = 'data') {
    this.db = new sqlite3.Database(dbName)
  }

  query(query, params) {
    return new Promise((resolve, reject) => {
      this.db.all(query, params, (err, rows) => {
        if (err) {
          reject(err)
        } else {
          resolve(rows)
        }
      })
    })
  }

  pureQuery(query) {
    return new Promise((resolve, reject) => {
      this.db.all(query, (err, rows) => {
        if (err) {
          reject(err)
        } else {
          resolve(rows)
        }
      })
    })
  }

  createTable(tableName, columns) {
    return new Promise((resolve, reject) => {
      const columnDefinitions = columns
        .map((column) => `${column.name} ${column.type}`)
        .join(', ')
      const query = `CREATE TABLE IF NOT EXISTS ${tableName} (${columnDefinitions})`
      this.db.run(query, (err) => {
        if (err) {
          reject(err)
        } else {
          resolve(null)
        }
      })
    })
  }

  insertData(tableName, data) {
    return new Promise((resolve, reject) => {
      const columns = Object.keys(data).join(', ')
      const placeholders = Object.keys(data)
        .map(() => '?')
        .join(', ')
      const values = Object.values(data)
      const query = `INSERT INTO ${tableName} (${columns}) VALUES (${placeholders})`
      this.db.run(query, values, (err) => {
        if (err) {
          reject(err)
        } else {
          resolve(null)
        }
      })
    })
  }

  updateData(tableName, data, condition) {
    return new Promise((resolve, reject) => {
      const setClause = Object.keys(data)
        .map((column) => `${column} = ?`)
        .join(', ')
      const values = Object.values(data)
      const query = `UPDATE ${tableName} SET ${setClause} WHERE ${condition}`
      this.db.run(query, values, (err) => {
        if (err) {
          reject(err)
        } else {
          resolve(null)
        }
      })
    })
  }

  // deleteData(tableName, condition) {
  //   const query = `DELETE FROM ${tableName} WHERE ${condition}`
  //   this.db.run(query, (err) => {
  //     if (err) {
  //       reject(err)
  //     } else {
  //       resolve(null)
  //     }
  //   })
  // }

  getData(tableName, condition) {
    const dataQuery = `SELECT * FROM ${tableName} WHERE ${
      condition ? condition : '1=1'
    }`
    return new Promise((resolve, reject) => {
      this.db.all(dataQuery, (err, rows) => {
        if (err) {
          reject(err)
        } else {
          resolve(rows)
        }
      })
    })
  }

  /**
   * 获取分页数据
   */
  getPagedData(tableName, page, pageSize, condition) {
    const offset = (page - 1) * pageSize
    const countQuery = `SELECT COUNT(*) as total FROM ${tableName} WHERE ${condition}`
    const dataQuery = `SELECT * FROM ${tableName} WHERE ${condition} LIMIT ? OFFSET ?`

    return new Promise((resolve, reject) => {
      this.db.serialize(() => {
        this.db.get(countQuery, (err, row) => {
          if (err) {
            reject(err)
          } else {
            const total = row.total

            this.db.all(dataQuery, [pageSize, offset], (err, rows) => {
              if (err) {
                reject(err)
              } else {
                const totalPages = Math.ceil(total / pageSize)

                resolve({ data: rows, total, totalPages })
              }
            })
          }
        })
      })
    })
  }

  close() {
    if (this.db) {
      this.db.close()
    }
  }
}

module.exports = SQLiteDB
