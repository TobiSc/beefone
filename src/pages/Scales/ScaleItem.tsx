import { IonItem, IonLabel, IonList, useIonRouter } from "@ionic/react";
import Page from "../../components/Page"
import { useScales } from "../../App";
import { QueryDocumentSnapshot, collection, getDocs, query } from "firebase/firestore";
import { Scale, ScaleData } from "../../types/global";
import { useEffect, useMemo, useState } from "react";
import { firestore } from "../../context/Firebase";
import _ from "lodash";

const ScaleItem: React.FC<{ scale: QueryDocumentSnapshot<Scale, Scale> }> = ({ scale }) => {
    const router = useIonRouter();
    const [scaleData, setScaleData] = useState<QueryDocumentSnapshot<ScaleData, ScaleData>[]>([]);
    const mostRecent = useMemo(() => {
        if (scaleData.length > 0) {
            return _.last(scaleData)?.data();
        }
    }, [scaleData])
    useEffect(() => {
        let scalesQuery = query(
            collection(firestore, `scales/${scale.data().serial}/data`).withConverter({ toFirestore: (data: ScaleData) => data, fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as ScaleData })
        );
        getDocs(scalesQuery).then(querySnapshot => {
            setScaleData(querySnapshot.docs)
        })
    }, [])
    return (
        <IonItem onClick={() => router.push(`/scale-detail/${scale.data().serial}`)}>
            <IonLabel><p>Name: {scale.data().name}</p><p>{scale.data().location} | {mostRecent?.weight?.toFixed(1)} kg | {mostRecent?.humidity?.toFixed(1)} r.h.</p></IonLabel>
        </IonItem>
    );
};

export default ScaleItem;