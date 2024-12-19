import {Typography} from "@mui/material";
import {useSuspenseQuery} from "@tanstack/react-query";
import {Types} from "../types";

type DriverProps = {
    id: string;
};

export function Driver({id}: DriverProps) {
    const {data: driver} =
        useSuspenseQuery({
            queryKey: ["Driver", id],
            queryFn:
                async () => {
                    const driverResponse = await fetch(`/api/drivers/getDriver/${id}`)
                    return await driverResponse.json() as Types.Driver
                },
        });

    return (
        <Typography>
            {driver.name}
        </Typography>);
}