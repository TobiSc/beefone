import { get } from "lodash";
import { Scale, ScaleData } from "../types/global";
import { LatLngBoundsExpression, LatLngTuple } from "leaflet";

export function GetScaleWeight(scale: ScaleData) {
    let weight1 = get(scale, "Scale1", 0);
    let weight2 = get(scale, "Scale2", 0);
    let weight3 = get(scale, "Scale3", 0);
    let weight4 = get(scale, "Scale4", 0);
    return weight1 + weight2 + weight3 + weight4;
}

export function GetScaleLocation(scale: Scale) {
    return [scale.location.latitude, scale.location.longitude] as LatLngTuple;
}