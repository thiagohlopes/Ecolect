//importar a dependencia do sqlite
const sqlite3 = require("sqlite3").verbose()

//criar o objeto que ira fazer operações no banco
const db = new sqlite3.Database("./src/database/database.db")

//deletar um dado na tabela
    /*db.run(`DELETE FROM places WHERE id = ?`, [1], function(err){
        if (err) {
            return console.log(err)
        }
        console.log("Deletado com sucesso")
    })*/

module.exports = db