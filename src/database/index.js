import * as sqlite from "expo-sqlite";

export const db = sqlite.openDatabase("rnEcommerce.db");

export const init = () => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(`
                CREATE TABLE IF NOT EXISTS adresses(id PRIMARY KEY NOT NULL, street TEXT NOT NULL, cp NUMERIC(10,0) NOT NULL, country TEXT NULL);
            `,
            [],
            () => {
                console.log("Inicializacion de Sqlite exitosa.")
                resolve();
            },
            (_, error) => {
                console.log("SqLiteError:", error);
                reject(error);
            })
        })
    })
}
