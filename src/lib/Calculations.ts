import { get } from "lodash";
import { ScaleData } from "../types/global";

export function GetScaleWeight(scale: ScaleData) {
    let weight1 = get(scale, "Scale1", 0);
    let weight2 = get(scale, "Scale2", 0);
    let weight3 = get(scale, "Scale3", 0);
    let weight4 = get(scale, "Scale4", 0);
    return weight1 + weight2 + weight3 + weight4;
}