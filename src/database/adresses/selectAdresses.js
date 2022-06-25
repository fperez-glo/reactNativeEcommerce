import { db } from ".."
import databaseTablesEnum from "../consts/databaseTables.enum"

const tableName = databaseTablesEnum.ADRESSES;

export const selectAdresses = () => {
    return new Promise((resolve, reject)=> {
        db.transaction(tx => {
            tx.executeSql(`SELECT * FROM ${tableName};`,
            [],
            (_, result)=> resolve(result),
            (_, error) => reject(error),
            )
        })
    })
    
}