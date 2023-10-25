import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonItem, IonLabel, IonList } from "@ionic/react";
import Page from "../../components/Page"
import seedrandom from "seedrandom";

type ScaleData = {
    weight: number | null,
    humidity: number | null,
    timestamp: number
}

type Scale = {
    name: string,
    position: string,
    id: string,
    data: ScaleData[]
}

const dummyData = generateDummyData();

const Scales: React.FC = () => {
    return (
      <Page>
        <IonList>
            {
                dummyData.map((scale)=>{
                    console.log("yay")
                    return (<IonItem>
                        <IonLabel><p>Name: {scale.name}</p><p>{scale.position} | {scale.data[scale.data.length - 1].weight?.toFixed(1)} kg | {scale.data[scale.data.length -1].humidity?.toFixed(1)} r.h.</p></IonLabel>
                    </IonItem>)
                })
            }
        </IonList>
      </Page>
    );
  };
  
  export default Scales;

function generateDummyData() : Scale[] {
    let scales: Scale[] = [];
    let generator = seedrandom("seed");
    for (let i = 0; i < 34; i++) {
        let id = generator.int32().toString()
        let scale: Scale = {
            id,
            name: id,
            position: ["Bermatingen", "Buggensegel", "Markdorf", "Meersburg"][i%4],
            data: []
        }
        for (let j = 0; j < 168; j++) {
            let scaleData: ScaleData = {
                weight: generator() * 150,
                humidity: generator() * 100,
                timestamp: Date.now() - (1000 * 60 * 60 * j)
            }
            scale.data.push(scaleData);
        }
        scales.push(scale)
    }
    return scales;
}