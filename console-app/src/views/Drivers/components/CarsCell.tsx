import {GridRenderCellParams} from "@mui/x-data-grid";
import {Api, InlineItems} from "../../../infra";
import {useSuspenseQuery} from "@tanstack/react-query";
import _ from "lodash";
import {Car} from "../../../common";

export function CarsCell({value: driverId}: GridRenderCellParams<any, string>) {
    const {data: driverIdToCarModelsMap} =
        useSuspenseQuery({
            queryKey: ["CarsCell"],
            queryFn:
                async () => {
                    const carModels = await Api.getCarModels();
                    return _.groupBy(
                        carModels,
                        carModel => carModel.driverId);
                }
        });
    return (
        <InlineItems
            items={driverIdToCarModelsMap[driverId!]}
            itemsTranslator={count => ["1 Car", `${count} Cars`][count]}
            renderItem={car => <Car id={car.id}/>}
            variant="itemOrItemCount"/>);
}