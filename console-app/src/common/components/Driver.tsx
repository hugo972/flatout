import {Typography} from "@mui/material";
import {useSuspenseQuery} from "@tanstack/react-query";
import {Api} from "../../infra";

type DriverProps = {
    id: string;
};

export function Driver({id}: DriverProps) {
    const {data: driver} =
        useSuspenseQuery({
            queryKey: ["Driver", id],
            queryFn: () => Api.getDriver(id),
        });

    return (
        <Typography>
            {driver.name}
        </Typography>);
}