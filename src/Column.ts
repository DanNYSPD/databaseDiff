export default class Column{
    name:string='';
    dataType:string|null=null;
    length:string|null=null;
    
    columnDefault:String='';

    isNullable:Boolean=false;
    numericPrecision:Number|null=null;
    characterMaximumLength:Number|null=null;
}