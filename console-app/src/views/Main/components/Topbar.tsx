import {NavLink} from "react-router";
import {Avatar, Button, Stack, Typography, useTheme} from "@mui/material";
import React from "react";
import {useSuspenseQuery} from "@tanstack/react-query";
import {Api} from "../../../infra";
import _ from "lodash";

export function Topbar() {
    const {data: userModel} =
        useSuspenseQuery({
            queryKey: ["Main"],
            queryFn: async () => {
                const {userModel} = await Api.getUserModel();
                return userModel;
            },
        });

    const theme = useTheme();
    return (
        <Stack
            direction="row"
            justifyContent="space-between"
            sx={{
                backgroundColor: theme.palette.background.paper,
                width: "100%"
            }}>
            <Stack
                alignItems="center"
                direction="row"
                spacing={5}>
                <img
                    alt="logo"
                    src="logo.png"/>
                <Stack
                    alignItems="baseline"
                    direction="row"
                    spacing={2}>
                    <NavigationItem
                        title="Home"
                        url="/"/>
                    <NavigationItem
                        title="Leaderboard"
                        url="/leaderboard"/>
                </Stack>
            </Stack>
            <Stack
                alignItems="center"
                direction="row"
                sx={{
                    height: "100%",
                    padding: theme.spacing(1)
                }}>
                {_.isNil(userModel) &&
                    <Button
                        href="/login"
                        variant="text">
                        Login
                    </Button>}
                <Avatar
                    sx={{
                        height: 24,
                        width: 24
                    }}
                    title={userModel?.name}>
                    {userModel?.name.
                        split(" ").
                        map(namePart => namePart[0].toUpperCase()).
                        join()}
                </Avatar>
            </Stack>
        </Stack>
    );
}

type NavigationItemProps = {
    title: string;
    url: string;
};

function NavigationItem({title, url}: NavigationItemProps) {
    const theme = useTheme();
    return (
        <NavLink
            style={{textDecoration: "none"}}
            to={url}>
            <Typography
                sx={{
                    ".active &": {
                        color: theme.palette.text.primary,
                        fontWeight: 800
                    },
                    color: theme.palette.text.secondary,
                    fontStyle: "italic"
                }}
                variant="h4">
                {title}
            </Typography>
        </NavLink>);
}