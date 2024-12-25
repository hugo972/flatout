import {Button, CircularProgress, Stack, TextField, Typography, useTheme} from "@mui/material";
import {useState} from "react";
import {Api} from "../infra";
import {useNavigate} from "react-router";

export function Login() {
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    const [loginError, setLoginError] = useState(false);
    const [loginExecuting, setLoginExecuting] = useState(false);

    const navigate = useNavigate();

    async function login() {
        setLoginError(false);
        setLoginExecuting(true);

        try {
            await Api.login({
                password,
                username
            });

            navigate("/");
        } catch {
            setLoginError(true);
        }

        setLoginExecuting(false);
    }

    const theme = useTheme();
    return (
        <Stack
            alignItems="center"
            spacing={3}
            sx={{marginTop: theme.spacing(20)}}>
            <TextField
                label="username"
                value={username}
                onChange={event => setUsername(event.target.value)}/>
            <TextField
                type="password"
                label="passowrd"
                value={password}
                onChange={event => setPassword(event.target.value)}/>
            <Stack
                alignItems="center"
                direction="row">
                {loginError &&
                    <Typography>Login failed</Typography>}
                {loginExecuting &&
                    <CircularProgress
                        size={theme.spacing(2)}
                        variant="indeterminate"/>}
                <Button
                    href="/"
                    variant="text">
                    cancel
                </Button>
                <Button
                    variant="text"
                    onClick={login}>
                    login
                </Button>
            </Stack>
        </Stack>);
}