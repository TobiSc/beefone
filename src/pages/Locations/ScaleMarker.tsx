import { useScales } from "../../App";
import _ from "lodash";
import { RefAttributes, RefObject, useEffect, useRef } from "react";
import { Marker, MarkerProps, Popup, useMap } from 'react-leaflet'
import { Scale } from "../../types/global";
import { GetScaleLocation } from "../../lib/Calculations";
import ScalePreviewData from "../../components/ScalePreviewData";
import { Marker as MarkerRef, MarkerOptions } from "leaflet";

export type ScaleMarkerProps = {
    scale: Scale,
    selectedScale: Scale | null,
}

const ScaleMarker: React.FC<ScaleMarkerProps> = ({ scale, selectedScale }) => {
    const map = useMap();
    const marker = useRef<MarkerRef>(null);

    useEffect(() => {
        if (selectedScale?.serial === scale.serial && marker.current) {
            marker.current.openPopup();
        }
    }, [selectedScale])

    return (
        <Marker ref={marker} position={GetScaleLocation(scale)}>
            <Popup>
                Nr. {scale.serial}<br />
                <ScalePreviewData scale={scale} />
            </Popup>
        </Marker>)
};

export default ScaleMarker;