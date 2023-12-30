import { IonButton, IonContent, IonIcon, IonPage } from '@ionic/react';
import React, { useEffect, useMemo, useState } from 'react';
import AppBar from './AppBar';
import Sidebar from './Sidebar';
import { Scale, ScaleData } from '../types/global';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { firestore } from '../context/Firebase';
import { get } from 'lodash';
import { DisplayDate, DisplayDateTime } from '../lib/ValueFormatter';
import { statsChart } from 'ionicons/icons';
import { GetScaleWeight } from '../lib/Calculations';

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
    }, [scale])
    const weight = useMemo(() => {
        return GetScaleWeight(data)
    }, [data])
    return (
        <div>
            <span>Gewicht: {weight} <span style={{ color: "lightgray" }}>{data.unixTime ? DisplayDateTime(new Date(data.unixTime).toISOString()) : ""}</span></span>
        </div>
    );
};

export default ScalePreviewData;