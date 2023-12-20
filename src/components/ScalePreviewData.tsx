import { IonContent, IonPage } from '@ionic/react';
import React, { useEffect, useMemo, useState } from 'react';
import AppBar from './AppBar';
import Sidebar from './Sidebar';
import { Scale, ScaleData } from '../types/global';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { firestore } from '../context/Firebase';
import { get } from 'lodash';
import { DisplayDate, DisplayDateTime } from '../lib/ValueFormatter';

export type ScalePreviewDataProps = { scale: Scale }

const ScalePreviewData: React.FC<ScalePreviewDataProps> = ({ scale }) => {
    const [data, setData] = useState({} as ScaleData);
    useEffect(() => {
        const q = query(collection(firestore, "scaleData"), where("Serial", "==", scale.serial), orderBy("unixTime", "desc"));
        getDocs(q).then(querySnapshot => {
            if (!querySnapshot.empty) {
                setData(querySnapshot.docs[0].data() as ScaleData)
            }
        }).catch(e => console.error(e))
    }, [])
    const weight = useMemo(() => {
        let weight1 = get(data, "Scale1", 0);
        let weight2 = get(data, "Scale2", 0);
        let weight3 = get(data, "Scale3", 0);
        let weight4 = get(data, "Scale4", 0);
        return weight1 + weight2 + weight3 + weight4;
    }, [data])
    return (
        <span>Gewicht: {weight} <span style={{ color: "lightgray" }}>{data.unixTime ? DisplayDateTime(new Date(data.unixTime).toISOString()) : ""}</span></span>
    );
};

export default ScalePreviewData;