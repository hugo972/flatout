import {Typography} from "@mui/material";
import {useSuspenseQuery} from "@tanstack/react-query";
import {Types} from "../types";

type CarProps = {
    id: string;
};

export function Car({id}: CarProps) {
    const {data: car} =
        useSuspenseQuery({
            queryKey: ["Car", id],
            queryFn:
                async () => {
                    const carResponse = await fetch(`/api/cars/getCar/${id}`)
                    return await carResponse.json() as Types.Car
                },
        });
    return (
        <Typography>
            {car.title} [{car.tires.brand} - {car.tires.size}]
        </Typography>);
}