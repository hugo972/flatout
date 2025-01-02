import {Stack} from "@mui/material";
import {useSuspenseQuery} from "@tanstack/react-query";
import {Api} from "../../infra";
import {DataGrid} from "@mui/x-data-grid";
import {CarsCell} from "./components";

export function Drivers() {
    const {data: driverModels} =
        useSuspenseQuery({
            queryKey: ["Drivers"],
            queryFn: Api.getDriverModels
        });
    return (
        <Stack alignItems="center">
            <DataGrid
                rows={driverModels}
                columns={[
                    {
                        field: 'name',
                        headerName: 'Driver',
                        width: 200
                    },
                    {
                        display: 'flex',
                        field: 'id',
                        headerName: 'Cars',
                        renderCell: CarsCell,
                        width: 350
                    },
                ]}/>
        </Stack>);
}