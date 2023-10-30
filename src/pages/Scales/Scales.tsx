import { IonItem, IonLabel, IonList } from "@ionic/react";
import Page from "../../components/Page"
import { useScales } from "../../App";
import ScaleItem from "./ScaleItem";

const Scales: React.FC = () => {
  //TODO: Scales Context doch nutzen
  const scales = useScales();
  return (
    <Page>
      <IonList>
        {
          scales.map((scale, index) => {
            return <ScaleItem key={index} scale={scale} />
          })
        }
      </IonList>
    </Page>
  );
};

export default Scales;