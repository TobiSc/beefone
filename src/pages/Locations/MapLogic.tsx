import { useScales } from "../../App";
import _ from "lodash";
import { useEffect } from "react";
import { useMap } from 'react-leaflet'
import { Scale } from "../../types/global";
import { GetScaleLocation } from "../../lib/Calculations";

export type MapLogicProps = {
    selectedScale: Scale | null
}

const MapLogic: React.FC<MapLogicProps> = ({ selectedScale }) => {
    const scales = useScales();
    const map = useMap();

    useEffect(() => {
        if (selectedScale !== null) {
            map.flyTo(GetScaleLocation(selectedScale))
        }
        else {
            map.fitBounds(scales.map(scale => [scale.data().location.latitude, scale.data().location.longitude]));
        }
    }, [selectedScale])
    return <></>;
};

export default MapLogic;