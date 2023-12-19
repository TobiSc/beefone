import { IonButton, IonItem, IonLabel, IonList } from "@ionic/react";
import Page from "../../components/Page"
import { useScales } from "../../App";
import _ from "lodash";
import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import { LatLngTuple } from "leaflet";
import 'leaflet/dist/leaflet.css';
import { Scale } from "../../types/global";

const Locations: React.FC = () => {
    const scales = useScales();
    const [center, setCenter] = useState([47.73950307269184, 9.364103370779638] as LatLngTuple)
    const [render, setRender] = useState(Date.now())

    useEffect(() => {
        if (scales.length > 0) {
            setScaleAsCenter(scales[0].data())
        }
        //sehr unschön. Muss untersucht werden, wie es ohne rerender klappt.
        setTimeout(() => setRender(Date.now()), 50);
    }, [])

    function setScaleAsCenter(scale: Scale): void {
        setCenter([scale.location.latitude, scale.location.longitude] as LatLngTuple);
    }
    return (
        <Page>
            <MapContainer key={render} style={{ height: "400px", width: "100%" }} center={center} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {
                    scales.map((scale, index) => {
                        let location = scale.data().location;
                        return <Marker key={index} position={[location.latitude, location.longitude]}>
                            <Popup>
                                Seriennummer: {scale.data().serial.toString()}
                            </Popup>
                        </Marker>
                    })
                }
            </MapContainer>
            <IonList>
                {
                    scales.map((scale, index) => {
                        console.log(scale.data().location)
                        return (<IonItem button={true} key={index} onClick={() => setScaleAsCenter(scale.data())}>
                            {scale.data().serial}
                        </IonItem>)
                    })
                }
            </IonList>
        </Page>
    );
};

export default Locations;