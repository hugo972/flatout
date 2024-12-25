import {Box, Stack, Typography, useTheme} from "@mui/material";
import {useSuspenseQuery} from "@tanstack/react-query";
import _ from "lodash";
import React from "react";
import {Event} from "./components";
import {useNavigate, useParams} from "react-router";
import {Api} from "../../infra";

export function Leaderboard() {
    const {data: eventModels} =
        useSuspenseQuery({
            queryKey: ["Leaderboard"],
            queryFn: Api.getEventModels
        });

    const navigate = useNavigate();
    const {eventId} = useParams();
    const eventModel =
        _.find(
            eventModels,
            eventModel => eventModel.id === eventId);
    const theme = useTheme();
    return (
        <Stack alignItems="center">
            <Typography variant="h1">
                Leaderboard
            </Typography>
            {_.isNil(eventModel)
                ? <Stack spacing={3}>
                    {_.map(
                        eventModels,
                        eventModel =>
                            <Box
                                key={eventModel.id}
                                sx={{
                                    border: "solid 1px white",
                                    borderRadius: 12,
                                    padding: theme.spacing(2, 4)
                                }}
                                onClick={() => navigate(`/leaderboard/${eventModel.id}`)}>
                                <Event
                                    eventModel={eventModel}
                                    variant="tile"/>
                            </Box>)}
                </Stack>
                : <Event
                    eventModel={eventModel}
                    variant="page"/>}
        </Stack>);
}