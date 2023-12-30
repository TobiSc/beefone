import { IonItem, IonLabel, IonList } from "@ionic/react";
import Page from "../../components/Page"
import { useScales } from "../../App";
import _ from "lodash";
import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import L from "leaflet";
import 'leaflet/dist/leaflet.css';
import { Scale } from "../../types/global";
import ScalePreviewData from "../../components/ScalePreviewData";
import ScaleDetailButton from "../../components/ScaleDetailButton";
import MapLogic from "./MapLogic";
import ScaleMarker from "./ScaleMarker";

/** erforderlich, damit die Icons auf Android funktionieren, siehe https://stackoverflow.com/questions/49441600/react-leaflet-marker-files-not-found */
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [0, -41]
});

L.Marker.prototype.options.icon = DefaultIcon;

/** */

const Locations: React.FC = () => {
    const scales = useScales();
    const [selectedScale, setSelectedScale] = useState<null | Scale>(null)
    const [render, setRender] = useState(Date.now())

    function toggleSelectedScale(scale: Scale) {
        if (selectedScale?.serial === scale.serial) {
            setSelectedScale(null);
        }
        else {
            setSelectedScale(scale);
        }
    }

    useEffect(() => {
        setTimeout(() => setRender(Date.now()), 50);
    }, [])

    return (
        <Page>
            <MapContainer key={render} style={{ height: "400px", width: "100%" }} center={[47.7395, 9.3641]} zoom={13} scrollWheelZoom={false}>
                <MapLogic selectedScale={selectedScale} />
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {
                    scales.map((scale, index) => <ScaleMarker key={index} scale={scale.data()} selectedScale={selectedScale} />)
                }
            </MapContainer>
            <IonList>
                {
                    scales.map((scale, index) => {
                        return (<IonItem color={selectedScale?.serial === scale.data().serial ? "dark" : "light"} button={true} key={index} onClick={() => toggleSelectedScale(scale.data())}>
                            <IonLabel>Nr. {scale.data().serial.toString()}<br />
                                <ScalePreviewData scale={scale.data()} />
                                <ScaleDetailButton scale={scale.data()} />
                            </IonLabel>
                        </IonItem>)
                    })
                }
            </IonList>
        </Page>
    );
};

export default Locations;