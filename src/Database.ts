import Table from "./Table";

export default class Database{
    tables:Table[]=[];   
    schemaName:string='';
    numberTables:Number=0;
    mustIncludeCreateTables:string='NO';
    
}