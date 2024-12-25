import {Typography} from "@mui/material";
import {useSuspenseQuery} from "@tanstack/react-query";
import {Api} from "../../infra";

type CarProps = {
    id: string;
};

export function Car({id}: CarProps) {
    const {data: car} =
        useSuspenseQuery({
            queryKey: ["Car", id],
            queryFn: () => Api.getCar(id),
        });
    return (
        <Typography>
            {car.title} [{car.tires.brand} - {car.tires.size}]
        </Typography>);
}