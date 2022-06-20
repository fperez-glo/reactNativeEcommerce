import { db } from ".."
import databaseTablesEnum from "../consts/databaseTables.enum"

const tableName = databaseTablesEnum.ADRESSES;

export const insertAdress = (id ,street, cp, country) => {
    return new Promise((resolve, reject)=> {
        db.transaction(tx => {
            tx.executeSql(`INSERT INTO ${tableName} values (?, ?, ?, ?)`,
            [id, street, cp, country],
            (_, result)=> resolve(result),
            (_, error) => reject(error),
            )
        })
    })
    
}