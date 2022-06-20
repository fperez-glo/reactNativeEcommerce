import { db } from ".."
import databaseTablesEnum from "../consts/databaseTables.enum"

const tableName = databaseTablesEnum.ADRESSES;

export const deleteAdress = (id) => {
    return new Promise((resolve, reject)=> {
        db.transaction(tx => {
            tx.executeSql(`DELETE FROM ${tableName} WHERE id = ?;`,
            [id],
            (_, result)=> resolve(result),
            (_, error) => reject(error),
            )
        })
    })
    
}