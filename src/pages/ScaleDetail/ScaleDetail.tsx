import { IonButton, IonCard, IonCardContent, IonInput, IonItem, IonLabel, IonList, useIonRouter } from "@ionic/react";
import Page from "../../components/Page"
import { useScales } from "../../App";
import { useLocation } from "react-router";
import { useEffect, useMemo, useState } from "react";
import { Scale, ScaleData } from "../../types/global";
import { QueryDocumentSnapshot, collection, getDocs, query } from "firebase/firestore";
import { firestore } from "../../context/Firebase";

import { Chart as ChartJS, registerables } from 'chart.js';
import { Chart } from 'react-chartjs-2'
ChartJS.register(...registerables);

const ScaleDetail: React.FC = () => {
    const router = useIonRouter();
    const serial = useMemo(() => {
        let path = router.routeInfo.pathname;
        return path.slice(path.lastIndexOf("/") + 1);
    }, [router])
    const scales = useScales();
    const scale = useMemo(() => {
        return scales.find(scale => scale.data().serial === serial)?.data();
    }, [scales, serial])
    const [scaleData, setScaleData] = useState<QueryDocumentSnapshot<ScaleData, ScaleData>[]>([]);
    useEffect(() => {
        let scalesQuery = query(
            collection(firestore, `scales/${scale?.serial}/data`).withConverter({ toFirestore: (data: ScaleData) => data, fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as ScaleData })
        );
        getDocs(scalesQuery).then(querySnapshot => {
            setScaleData(querySnapshot.docs)
        })
    }, [])
    const [timestamps, setTimestamps] = useState<(string | null)[]>([])
    const [weightValues, setWeightValues] = useState<(number | null)[]>([])
    useEffect(() => {
        setWeightValues(scaleData.map(data => data.data().weight));
        setTimestamps(scaleData.map(data => new Date(data.data().timestamp).toLocaleString()));
        console.log(scaleData.map(data => new Date(data.data().timestamp).toLocaleString()))
    }, [scaleData])

    return (
        <Page>
            <IonCard>
                <IonCardContent class="vertical-flex defaultPadding">
                    <h2>Name: {scale?.name}</h2>
                    <div style={{ minHeight: "300px" }}>
                        <Chart type="line" options={{ scales: { x: { ticks: { maxRotation: 90, minRotation: 90 } } }, maintainAspectRatio: false }} data={{
                            labels: timestamps,
                            datasets: [{
                                label: "Gewicht",
                                data: weightValues
                            }],
                        }}></Chart>
                    </div>
                </IonCardContent>
            </IonCard>
        </Page>
    );
};

export default ScaleDetail;