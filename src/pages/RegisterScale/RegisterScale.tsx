import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonIcon, IonInput, IonItem, IonLabel, IonList, IonSelect, IonSelectOption, IonText } from "@ionic/react";
import { qrCode } from 'ionicons/icons';
import Page from "../../components/Page"
import _ from "lodash";
import { useEffect, useMemo, useState } from "react";
import { useScales } from "../../App";

const RegisterScale: React.FC = () => {
    const scales = useScales();
    const locations = useMemo(()=>{
        return _.uniqBy(scales, (scale)=>scale.location).map(scale=>scale.location).sort();
    }, [scales])
    const [serialNumber, setSerialnumber] = useState("")
    const [selectedLocation, setSelectedLocation] = useState("");
    const [newLocation, setNewLocation] = useState("");
    useEffect(()=>{
        console.log({selectedLocation})
    }, [selectedLocation])
    return (
      <Page>
        <IonCard>
          <IonCardHeader><IonCardTitle>Waagendaten</IonCardTitle></IonCardHeader>
          <IonCardContent class="vertical-flex defaultPadding">
            <div className="horizontal-flex">
                <IonInput value={serialNumber} onChange={(e)=>setSerialnumber(e.currentTarget.value?.toString() || "")} class="grow" fill="outline" labelPlacement="stacked" label="Seriennummer" />
                <IonButton>
                    <IonIcon icon={qrCode} />
                </IonButton></div>
                <IonSelect labelPlacement="stacked" label="Standort" value={selectedLocation} onChange={(e)=>setSelectedLocation(e.currentTarget.value)} aria-label="location" placeholder="Standort auswählen">
                    {
                        locations.map((location, index)=><IonSelectOption key={index} value={location}>{location}</IonSelectOption>)
                    }
                    <IonSelectOption value="">Neuer Standort</IonSelectOption>
                </IonSelect>
                <IonInput value={newLocation} onChange={(e)=>setNewLocation(e.currentTarget.value?.toString() || "")} class={selectedLocation ? "hidden" : ""} fill="outline" labelPlacement="stacked" label="Name des neuen Standortes" />
            <IonButton>Registrieren</IonButton>
          </IonCardContent>
        </IonCard>
      </Page>
    );
  };
  
  export default RegisterScale;