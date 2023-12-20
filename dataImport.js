import fs from "node:fs";
import { parse } from 'csv-parse/sync';
import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator, setDoc, doc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBCt06SCKft69PIDqJq6SGn5qKmVQIZczM",
    authDomain: "beefone-403117.firebaseapp.com",
    projectId: "beefone-403117",
    storageBucket: "beefone-403117.appspot.com",
    messagingSenderId: "1005781916306",
    appId: "1:1005781916306:web:a12aacf4fe12fdcbd5644b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
connectFirestoreEmulator(firestore, "127.0.0.1", 8080);


fs.readFile('./999data.csv', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    let records = parse(data, { delimiter: ";" })
    let filtered = records.filter((record, index) => index % 120 === 0);
    upsertRecords(filtered);

});

async function upsertRecords(records) {
    for (let [index, record] of records.entries()) {
        let timestamp = new Date(record[0] + ":" + record[1]).valueOf();  //unix timestamp
        let scaleDataRef = doc(firestore, "scaleData/" + timestamp.toString())
        await setDoc(scaleDataRef, {
            Date: record[0],
            Time: record[1],
            unixTime: timestamp,
            TMType: record[2],
            Serial: parseInt(record[3]),
            Clock: parseInt(record[4]),
            Seq: parseInt(record[5]),
            Errors: parseInt(record[6]),
            Scale1: parseInt(record[7]),
            Scale2: parseInt(record[8]),
            Scale3: parseInt(record[9]),
            Scale4: parseInt(record[10]),
            Temp: parseInt(record[11])
        }, { merge: true }).catch((e) => console.error(e));
        console.log(index + "/" + records.length)
    }
}