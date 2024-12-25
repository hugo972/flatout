import {Typography} from "@mui/material";
import {useSuspenseQuery} from "@tanstack/react-query";
import {Api} from "../../infra";

type DriverProps = {
    id: string;
};

export function Driver({id}: DriverProps) {
    const {data: driverModel} =
        useSuspenseQuery({
            queryKey: ["Driver", id],
            queryFn: () => Api.getDriverModel(id),
        });

    return (
        <Typography>
            {driverModel.name}
        </Typography>);
}