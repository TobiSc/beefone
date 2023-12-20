
import { IonButton, IonIcon } from '@ionic/react';
import React from 'react';
import { Scale } from '../types/global';
import { statsChart } from 'ionicons/icons';

export type ScaleDetailButtonProps = { scale: Scale }

const ScaleDetailButton: React.FC<ScaleDetailButtonProps> = ({ scale }) => {
    return (
        <IonButton routerLink={`/scale-detail/${scale.serial}`}><IonIcon slot="icon-only" icon={statsChart} /></IonButton>
    );
};

export default ScaleDetailButton;