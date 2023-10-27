import { IonItem, IonLabel, IonList } from "@ionic/react";
import Page from "../../components/Page"
import { useContext, useMemo } from "react";
import { useScales } from "../../App";
import _ from "lodash";
import { ScaleLocation } from "../../types/global";

const Locations: React.FC = () => {
    const scales = useScales();
    const locations: ScaleLocation[] = useMemo(() => {
        let locationNames = _.uniqBy(scales, (scale) => scale.location).map(scale => scale.location);
        console.log(locationNames)
        let locations: ScaleLocation[] = [];
        for (let locationName of locationNames) {
            let location: ScaleLocation = {
                name: locationName,
                scales: scales.filter(scale => scale.location === locationName)
            }
            locations.push(location);
        }
        return locations;

    }, [scales])
    return (
        <Page>
            <IonList>
                {
                    locations.map((location, index) => {
                        return (<IonItem key={index}>
                            <IonLabel><p>{location.name}</p><p>{location.scales.length} Waagen</p></IonLabel>
                        </IonItem>)
                    })
                }
            </IonList>
        </Page>
    );
};

export default Locations;