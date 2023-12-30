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

async function importScaleData() {
    fs.readFile('./999data.csv', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        let records = parse(data, { delimiter: ";" })
        let filtered = records.filter((record, index) => index % 120 === 0);
        upsertRecords(filtered);

    });
}

//importScaleData();

async function upsertRecords(records) {
    for (let [index, record] of records.entries()) {
        let timestamp = new Date(record[0] + ":" + record[1]).valueOf();  //unix timestamp
        let scaleDataRef = doc(firestore, "scaleData/" + record[3] + "-" + timestamp.toString())
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

const scales = [
    [
        999, 85.971, 85.906, 87.233, 86.55, 0.00252075, -0.000718158, 0.00285217, -0.00263692, 146288, 259674, 156422, 18194
    ],
    [
        1002, 83.673, 84.113, 84.113, 84.725, 0, 0, 0, 0, 229710, 18655, 66589, -1652
    ],
    [
        1003, 86.393, 84.055, 84.832, 85.171, 0, 0, 0, 0, -107955, -58024, -55196, -6866
    ],
    [
        1004, 86.803, 87.125, 86.344, 87.087, 0, 0, 0, 0, 229589, 14431, 306097, 109896
    ],
    [
        997, 11.22, 11.22, 11.22, 11.22, 0, 0, 0, 0, 1000000, 1000000, 1000000, 1000000
    ]
]

async function importScales() {
    for (let scale of scales) {
        let scaleRef = doc(firestore, "scales/" + scale[0])
        let data = {
            serial: scale[0],
            sc1mcoeffc: scale[1],
            sc2mcoeffc: scale[2],
            sc3mcoeffc: scale[3],
            sc4mcoeffc: scale[4],
            sc1tcoeffc: scale[5],
            sc2tcoeffc: scale[6],
            sc3tcoeffc: scale[7],
            sc4tcoeffc: scale[8],
            sc1tara: scale[9],
            sc2tara: scale[10],
            sc3tara: scale[11],
            sc4tara: scale[12],
        }
        await setDoc(scaleRef, data, { merge: true }).catch((e) => console.error(e));
    }
}

//importScales();