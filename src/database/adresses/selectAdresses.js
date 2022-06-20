import { db } from ".."
import databaseTablesEnum from "../consts/databaseTables.enum"

const tableName = databaseTablesEnum.ADRESSES;

export const selectAdresses = (id ,street, cp, country) => {
    return new Promise((resolve, reject)=> {
        db.transaction(tx => {
            tx.executeSql(`SELECT * FROM ${tableName};`,
            [id, street, cp, country],
            (_, result)=> resolve(result),
            (_, error) => reject(error),
            )
        })
    })
    
}