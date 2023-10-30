import { IonItem, IonLabel, IonList } from "@ionic/react";
import Page from "../../components/Page"
import { useContext, useMemo } from "react";
import { useScales } from "../../App";
import _ from "lodash";
import { ScaleLocation } from "../../types/global";

const Locations: React.FC = () => {
    const scales = useScales();
    const locations: string[] = useMemo(() => {
        return _.uniqBy(scales, (scale) => scale.data().location).map(scale => scale.data().location);
    }, [scales])
    return (
        <Page>
            <IonList>
                {
                    locations.map((location, index) => {
                        return (<IonItem key={index}>
                            <IonLabel><p>{location}</p><p>{scales.filter(scale => scale.data().location === location).length} Waagen</p></IonLabel>
                        </IonItem>)
                    })
                }
            </IonList>
        </Page>
    );
};

export default Locations;