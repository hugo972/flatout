import {Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography} from "@mui/material";
import _ from "lodash";
import {Car, Driver} from "../../../common/components";
import React from "react";
import {Types} from "../../../common";
import duration from 'dayjs/plugin/duration';
import dayjs from "dayjs";

dayjs.extend(duration);

type EventProps = {
    eventModel: Types.EventModel;
    variant: "page" | "tile";
};

export function Event({eventModel, variant}: EventProps) {
    return (
        <Stack spacing={1}>
            <Typography variant="h2">
                {eventModel.name}
            </Typography>
            {variant === "tile"
                ? undefined
                : _.map(
                    eventModel.events,
                    event =>
                        <Stack key={event.id}>
                            <Typography variant="h4">
                                {event.name}
                            </Typography>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            Rank
                                        </TableCell>
                                        <TableCell>
                                            Car
                                        </TableCell>
                                        <TableCell>
                                            Driver
                                        </TableCell>
                                        <TableCell>
                                            Lap Time
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {_(event.results).
                                        orderBy(
                                            result => result.lapTime,
                                            "desc").
                                        map(
                                            (result, resultIndex) =>
                                                <TableRow key={result.id}>
                                                    <TableCell>
                                                        <Typography>
                                                            #{resultIndex + 1}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Car id={result.carId}/>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Driver id={result.driverId}/>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography>
                                                            {dayjs.duration(result.lapTime * 1000).
                                                                format("mm:ss:SSS")}
                                                        </Typography>
                                                    </TableCell>
                                                </TableRow>).
                                        value()}
                                </TableBody>
                            </Table>
                        </Stack>)}
        </Stack>);
}