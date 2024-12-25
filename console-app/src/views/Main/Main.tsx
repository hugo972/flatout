import {Leaderboard} from "../Leaderboard";
import {BrowserRouter, Route, Routes} from "react-router";
import {Stack} from "@mui/material";
import React from "react";
import {Dashboard, Login} from "..";
import {Topbar} from "./components";

export function Main() {
    return (
        <BrowserRouter>
            <Stack>
                <Topbar/>
                <Routes>
                    <Route
                        element={<Dashboard/>}
                        path="/"/>
                    <Route
                        element={<Leaderboard/>}
                        path="/leaderboard/:eventId?"/>
                    <Route
                        element={<Login/>}
                        path="/login"/>
                </Routes>
            </Stack>
        </BrowserRouter>);
}