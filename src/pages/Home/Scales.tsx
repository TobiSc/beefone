import { IonItem, IonLabel, IonList } from "@ionic/react";
import Page from "../../components/Page"
import { useContext } from "react";
import { useScales } from "../../App";

const Scales: React.FC = () => {
    const scales = useScales();
    return (
      <Page>
        <IonList>
            {
                scales.map((scale, index)=>{
                    return (<IonItem key={index}>
                        <IonLabel><p>Name: {scale.name}</p><p>{scale.position} | {scale.data[scale.data.length - 1].weight?.toFixed(1)} kg | {scale.data[scale.data.length -1].humidity?.toFixed(1)} r.h.</p></IonLabel>
                    </IonItem>)
                })
            }
        </IonList>
      </Page>
    );
  };
  
  export default Scales;