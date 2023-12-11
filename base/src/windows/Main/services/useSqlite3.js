const SQLiteDB = require('../../../tools/SQLiteDB')

const main = async () => {
  const sqlite = new SQLiteDB('data')

  sqlite
    .pureQuery(`INSERT INTO users (name, age, sex) VALUES ('test2', 20)`)
    .then((res) => {
      console.log(res)
    })
    .catch((e) => {
      console.log(e)
    })
    .finally(() => {
      sqlite.close()
    })
}

main()
