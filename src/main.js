const { Client ,Pool} = require('pg')
const {Table,Column} =require('./Table')

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'd1',
    password: '123456',
    port: 5432,
  })


class Diff{
    constructor(client,schema){
        this.client=client;
        this.schema=schema;
    }
   
    static async  connect(client){
        await client.connect()
        const res = await client.query('SELECT $1::text as message', ['Hello world!'])
        console.log(res.rows[0].message) // Hello world!
        await client.end()
        }
        
    static async tablesNames(client){
        await client.connect()
        const res = await client.query(`SELECT table_name
        FROM information_schema.tables
        WHERE table_type='BASE TABLE'
        AND table_schema='public';`, [])
        console.log(res.rows)
        console.log(res.rows[0].message) // Hello world!
        await client.end()
    }
  
     async getCOlumnForTable(tableName){
        await client.connect()
        const res = await client.query(`SELECT *
        FROM information_schema.columns
       WHERE table_schema = 'your_schema'
         AND table_name   = 'your_table'
           ;`, [tableName])
        console.log(res.rows)
        console.log(res.rows[0].message) // Hello world!
        await client.end()
    }

        
}

Diff.tablesNames(client);
let diff= new Diff();
diff.client=client;
diff.schema='d1'