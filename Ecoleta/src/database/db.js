// Importar a dependência do sqlite3
const sqlite3 = require("sqlite3").verbose()

// Iniciar o objeto de banco de dados
const db = new sqlite3.Database("./src/database/database.db")

// Utilizar o objeto de banco de dados, para nossas operações
db.serialize(() => {
    // Criar uma tabela
    db.run(`
        CREATE TABLE IF NOT EXISTS places(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `)
    // Inserir dados na tabela
    const query = `
        INSERT INTO places(
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (
            ?,?,?,?,?,?,?
        );

    `
    const values = [
        "https://images.unsplash.com/photo-1518792528501-352f829886dc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
        "Colectoria",
        "Guilherme Gembala, Jardim América",
        "Número 260",
        "Santa Catarina",
        "Rio do Sul",
        "Resíduos Eletrônicos e Lâmpadas"
    ]

    db.run(query, values, function() {
        
    })

    // Consultar os dados da tabela

    // Deletar um dado da tabela
})