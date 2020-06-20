const express = require("express")
const server = express()
//pegar o B.D.
const db = require("./database/db")

//configurar pasta publica
server.use(express.static("public"))

//habilitar uso req.body
server.use(express.urlencoded({extended: true}))

//Utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views",{
    express: server,
    noCache: true
})

//configurar caminhos da aplicação
//page home
//req: requisição  res: resposta
server.get("/", (req, res) =>{
    return res.render("index.html")
})

server.get("/create-point", (req, res) =>{
    console.log(req.query)

    return res.render("create-point.html")
})

server.post("/savepoint", (req, res) =>{
    //req.body: corpo do formulario
    //console.log(req.body)

    //Inserir dados mo banco de dados
    const query = `
    INSERT INTO places (
        image,
        name,
        address,
        address2,
        state,
        city,
        items
    ) Values ( ?, ?, ?, ?, ?, ?, ?)
`
    const value = [ 
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
     ]

    function afterInsertData(err) {
        if (err) {
            console.log(err)
            return res.send("Erro no cadastro!")
        }
        console.log("cadastrado com sucesso")
        console.log(this)
        
        return res.render("create-point.html", { saved: true})
    }
    db.run(query, value, afterInsertData)

})

server.get("/search", (req, res) =>{

    const search = req.query.search
    if(search ==""){
        //pesquisa vazia
        return res.render("search-result.html", { total: 0})
    }


    //pegar os dados do bd
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows){
        if (err) {
            return console.log(err)
        }
        console.log(rows)//verificando se pegou os dados

        const total = rows.length

        //mostrar a pagina html com os dados do banco
        return res.render("search-result.html", { places: rows, total: total})//pode mandar só total quando usa msm nome
    })

    
})

//ligar o servidor
server.listen(3000)