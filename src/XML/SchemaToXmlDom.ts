import * as builder from 'xmlbuilder'
import Database from '../Database';

export default class SchemaToXmlDom{
   static writeMOdel(database:Database){
        let clone=Object.assign({},database);
        /*
        clone.tables=clone.tables.map(table=>{
            return {
                '@tableName':table.tableName,
                '@rowsNumber':table.rowsNumber,

            }
        })
        builder.create(clone).end({ pretty: true});*/
        let buil=builder.create('database').
        att('databaseName',database.numberTables)
        .att('schemaName',database.schemaName)
        .att('includeCreate',database.mustIncludeCreateTables);

        for(let db of database.tables){
            let elTable=buil.ele('table')
            .att('tableName',db.tableName)
            .att('rowsNumber',db.rowsNumber)
            ;
            for(let c of db.columns){
                let elColumn=buil.ele('column')
                .att('name',c.name)
                .att('numericPrecision',c.numericPrecision)
                .att('characterMaximumLength',c.characterMaximumLength)
                .att('columnDefault',c.columnDefault)
                .att('length',c.length)
                .att('isNullable',c.isNullable)
                .att('dataType',c.dataType)
                ;
                elTable.children.push(elColumn);
            }
            
        }

        return buil.end({pretty:true});
    }
}