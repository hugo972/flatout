import {Typography} from "@mui/material";
import {useSuspenseQuery} from "@tanstack/react-query";
import {Api} from "../../infra";

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
        <Typography>
            {carModel.title} [{carModel.tires.brand} - {carModel.tires.size}]
        </Typography>);
}