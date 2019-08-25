import  {Client}  from 'pg';
import Column from './Column';
import Table from './Table';
//import  Client  = require('pg');
//import {Column} from './Column'

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'd1',
    password: '123456',
    port: 5432,
  })


class Diff{
    client:Client;
    schema:string;
    constructor(client:Client,schema:string){
        this.client=client;
        this.schema=schema;
    }
   
    static async  connect(client:Client){
        await client.connect()
        const res = await client.query('SELECT $1::text as message', ['Hello world!'])
        console.log(res.rows[0].message) // Hello world!
        await client.end()
        }
        
     async tablesNames(){
        await this.client.connect()
        const res = await client.query(`SELECT table_name
        FROM information_schema.tables
        WHERE table_type='BASE TABLE'
        AND table_schema='public';`, [])
        console.log(res.rows)
        console.log(res.rows[0].message) // Hello world!
       // await client.end()
        return res.rows;
    }
  
     async getCOlumnForTable(tableName:string){
         console.log(tableName)
       // await this.client.connect()
        const res = await this.client.query(`SELECT *
        FROM information_schema.columns
       WHERE table_schema = $1
         AND table_name   = $2
           ;`, ['public',tableName])
       // console.log(res.rows)
        let columns:Column[]=[];
        res.rows.forEach(row => {
            let c= new Column();
            c.name=row.column_name;
           c.dataType= row.data_type;
           c.columnDefault= row.column_default
           c.isNullable= row.is_nullable
           c.numericPrecision= row.numeric_precision
           c.characterMaximumLength= row.character_maximum_length
           columns.push(c);
        });
        //console.log(res.rows[0]) // Hello world!
       // await client.end()
        return columns;
    }
    async getTables(){
      const tableName= await this.tablesNames();
      // i have to pyt async in the anonymous function 
      let tables:Table[]=[];
      tableName.forEach(async  table => {
          let columns=  await  this.getCOlumnForTable(table.table_name);
         let tableO= new Table();
          tableO.tableName=table;
          tableO.columns=columns;
          tables.push(tableO);
          console.log(columns)
          console.log(tables)
      });
      return tables;
    }
    async  asyncForEach(array:any[], callback:CallableFunction) {
        for (let index = 0; index < array.length; index++) {
          await callback(array[index], index, array);
        }
      }
}


let diff= new Diff(client,'d1');
diff.client=client;
diff.schema='d1'

//diff.tablesNames();
diff.getTables().then(tables=>{
    console.log(tables)


})