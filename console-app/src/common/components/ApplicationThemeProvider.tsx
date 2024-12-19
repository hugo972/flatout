import React from "react";
import {createTheme, GlobalStyles, ThemeProvider} from "@mui/material";

const theme =
    createTheme({
        breakpoints: {
            values: {
                lg: 1440,
                md: 1280,
                sm: 600,
                xl: 1920,
                xs: 0
            }
        },
        palette: {
            background: {
                default: "#242424"
            },
            text: {
                disabled: "#616161",
                primary: "#E2E2E3",
                secondary: "#A8A7A7"
            }
        },
        typography: {
            fontFamily: "Heebo, Sans-serif"
        }
    });

const globalStylesTheme = {
    "*::-webkit-scrollbar": {
        height: "8px",
        width: "8px"
    },
    "*::-webkit-scrollbar-corner": {
        background: "transparent"
    },
    ".CodeMirror-info, .CodeMirror-lint-tooltip, reach-portal": {
        position: "fixed",
        zIndex: theme.zIndex.snackbar
    },
    ".MuiBox-root": {
        boxSizing: "border-box"
    },
    body: {
        "&.col-resize": {
            cursor: "ew-resize !important"
        },
        "&.dark": {
            "--bg-categories": "#555E6B",
            "--bg-primary": "#2B2E33",
            "--border": "#3D4149",
            "--box-shadow": "0px 0px 250px 0px rgba(0, 0, 0, 0.90)",
            "--primary": "#0079DD",
            "--text-alternate": "#FFFFFF",
            "--text-primary": "#E2E2E3",
            "--text-secondary": "#9E9E9E"
        },
        "--bg-categories": "#E0F2FF",
        "--bg-primary": "#FFFFFF",
        "--border": "#E0E0E0",
        "--box-shadow": "0px 0px 50px 0px rgba(19, 49, 125, 0.15)",
        "--primary": "#0079DD",
        "--text-alternate": "#FFFFFF",
        "--text-primary": "#37474F",
        "--text-secondary": "#9E9E9E",
        "--toastify-toast-top": theme.spacing(7),
        height: "100%",
        margin: 0,
        overflow: "hidden"
    },
    html: {
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        fontFamily: "Inter",
        fontSize: 12,
        height: "100%"
    },
    "input::-ms-reveal, input::-ms-clear": {
        display: "none"
    },
    textarea: {
        background: "transparent",
        color: theme.palette.text.primary,
        cursor: "auto"
    }
};

type ApplicationThemeProviderProps = {
    children: React.ReactElement;
};

export const ApplicationThemeProvider = ({children}: ApplicationThemeProviderProps) =>
    <ThemeProvider theme={theme}>
        <GlobalStyles styles={globalStylesTheme}/>
        {children}
    </ThemeProvider>;