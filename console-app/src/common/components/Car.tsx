import {Divider, Stack, Tooltip, Typography} from "@mui/material";
import {useSuspenseQuery} from "@tanstack/react-query";
import {Api} from "../../infra";
import _ from "lodash";
import {Types} from "../types";
import {Driver} from "./Driver";

type CarProps = {
    id: string;
};

export function Car({id}: CarProps) {
    const {data: carModel} =
        useSuspenseQuery({
            queryKey: ["Car", id],
            queryFn: () => Api.getCarModel(id),
        });

    return (
        <Tooltip title={<Info carModel={carModel}/>}>
            <Typography>
                {carModel.title} | {carModel.tires.brand} {carModel.tires.size}
            </Typography>
        </Tooltip>);
}

type InfoProps = {
    carModel: Types.CarModel;
};

function Info({carModel}: InfoProps) {
    return (
        <Stack spacing={1}>
            <Stack>
                <Driver id={carModel.driverId}/>
                <Typography variant="h4">
                    {carModel.title}
                </Typography>
            </Stack>
            <Divider/>
            <Stack>
                <Typography variant="h6">
                    {carModel.tires.brand} {carModel.tires.size}
                </Typography>
                <Typography variant="h6">
                    {carModel.horsepower}HP | {carModel.drivetrain} | {carModel.enginePlacement} engine
                </Typography>
            </Stack>
            <Divider/>
            <Stack>
                {_.map(
                    carModel.mods,
                    mod =>
                        <Typography key={mod}>
                            {mod}
                        </Typography>)}
            </Stack>
        </Stack>);
}