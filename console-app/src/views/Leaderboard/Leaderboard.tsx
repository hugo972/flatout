import {Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography} from "@mui/material";
import {useSuspenseQuery} from "@tanstack/react-query";
import _ from "lodash";
import {Car, Driver} from "../../common/components";
import React from "react";
import {Types} from "../../common";

export function Leaderboard() {
    const {data: eventModels} =
        useSuspenseQuery({
            queryKey: ["Leaderboard"],
            queryFn:
                async () => {
                    const eventsResponse = await fetch("/api/events/getEventModels")
                    return await eventsResponse.json() as Types.EventModel[]
                }
        });

    return (
        <Stack alignItems="center">
            <Stack
                alignItems="center"
                direction="row">
                <img
                    alt="logo"
                    src="logo.png"/>
                <Typography variant="h1">
                    Leaderboard
                </Typography>
            </Stack>
            <Stack spacing={3}>
                {_.map(
                    eventModels,
                    eventModel =>
                        <Stack
                            key={eventModel.id}
                            spacing={1}>
                            <Typography variant="h2">
                                {eventModel.name}
                            </Typography>
                            {_.map(
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
                                                        result =>
                                                            <TableRow key={result.id}>
                                                                <TableCell>
                                                                    <Car id={result.carId}/>
                                                                </TableCell>
                                                                <TableCell>
                                                                    <Driver id={result.driverId}/>
                                                                </TableCell>
                                                                <TableCell>
                                                                    <Typography>
                                                                        {result.lapTime}
                                                                    </Typography>
                                                                </TableCell>
                                                            </TableRow>).
                                                    value()}
                                            </TableBody>
                                        </Table>
                                    </Stack>)}
                        </Stack>)}
            </Stack>
        </Stack>);
}