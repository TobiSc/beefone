import { IonButton, IonCard, IonCardContent, IonDatetime, IonInput, IonItem, IonLabel, IonList, IonSelect, IonSelectOption, useIonRouter } from "@ionic/react";
import Page from "../../components/Page"
import { useScales } from "../../App";
import { useLocation } from "react-router";
import { useEffect, useMemo, useState } from "react";
import { Scale, ScaleData } from "../../types/global";
import { DocumentData, Query, collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { firestore } from "../../context/Firebase";

import { Chart as ChartJS, registerables } from 'chart.js';
import { Chart } from 'react-chartjs-2'
import { GetScaleWeight } from "../../lib/Calculations";
import { first, get, last } from "lodash";
ChartJS.register(...registerables);

const ScaleDetail: React.FC = () => {
    const router = useIonRouter();
    const serial = useMemo(() => {
        let path = router.routeInfo.pathname;
        return parseInt(path.slice(path.lastIndexOf("/") + 1));
    }, [router])
    const scales = useScales();
    const scale = useMemo(() => {
        return scales.find(scale => scale.data().serial === serial)?.data();
    }, [scales, serial])

    const [minDate, setMinDate] = useState(0);
    const [maxDate, setMaxDate] = useState(0);
    const [earliest, setEarliest] = useState<null | number>(null)
    const [latest, setLatest] = useState<null | number>(null)

    const [scaleData, setScaleData] = useState<ScaleData[]>([]);
    useEffect(() => {
        const q = query(collection(firestore, "scaleData"), where("Serial", "==", serial), where("unixTime", ">=", earliest || 0), where("unixTime", "<=", latest || Date.now().valueOf()), orderBy("unixTime", "asc"));
        getDocs(q).then(querySnapshot => {
            if (!querySnapshot.empty) {
                setScaleData(querySnapshot.docs.map(doc => doc.data() as ScaleData))
                let lastDate = get(last(querySnapshot.docs)?.data(), "unixTime", 0);
                if (lastDate && lastDate > maxDate) {
                    setMaxDate(lastDate);
                }
                let firstDate = get(first(querySnapshot.docs)?.data(), "unixTime", 0);
                if ((firstDate && firstDate < minDate) || minDate === 0) {
                    setMinDate(firstDate);
                }
            }
        }).catch(e => console.error(e))
    }, [earliest, latest])

    const [timestamps, setTimestamps] = useState<(string)[]>([])
    const [weightValues, setWeightValues] = useState<(number)[]>([])
    useEffect(() => {
        setWeightValues(scaleData.map(data => GetScaleWeight(data)));
        setTimestamps(scaleData.map(data => {
            let date = new Date(data.unixTime);
            return date.toLocaleDateString();
        }));
    }, [scaleData])

    return (
        <Page>
            <IonCard>
                <IonCardContent class="vertical-flex defaultPadding">
                    <h2>Nr: {scale?.serial}</h2>
                    <div style={{ minHeight: "300px" }}>
                        <Chart type="line" options={{ scales: { x: { ticks: { maxRotation: 90, minRotation: 90 } } }, maintainAspectRatio: false }} data={{
                            labels: timestamps,
                            datasets: [{
                                label: "Gewicht",
                                data: weightValues
                            }],
                        }}></Chart>
                    </div>
                    <div>
                        {
                            minDate && maxDate && (<><IonInput
                                onIonChange={(e) => {
                                    if (e.detail.value) setEarliest(new Date(e.detail.value).valueOf())
                                }}
                                label="Von"
                                value={new Date(earliest || minDate).toISOString().split('T')[0]}
                                type="date"
                                min={new Date(minDate).toISOString().split('T')[0]}
                                max={new Date(maxDate).toISOString().split('T')[0]}
                            />
                                <IonInput
                                    onIonChange={(e) => {
                                        if (e.detail.value) setLatest(new Date(e.detail.value).valueOf())
                                    }}
                                    label="Bis"
                                    value={new Date(latest || maxDate).toISOString().split('T')[0]}
                                    type="date" min={new Date(minDate).toISOString().split('T')[0]}
                                    max={new Date(maxDate).toISOString().split('T')[0]}
                                /></>)
                        }
                    </div>
                </IonCardContent>
            </IonCard>
        </Page >
    );
};

export default ScaleDetail;