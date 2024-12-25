import _ from "lodash";
import {useSuspenseQuery} from "@tanstack/react-query";
import {Stack, Typography, useTheme} from "@mui/material";
import {Api} from "../infra";

export function Tracks() {
    const {data: tracks} =
        useSuspenseQuery({
            queryKey: ["Main", "getTracks"],
            queryFn: Api.getTracks
        });

    const theme = useTheme();
    return (
        <Stack
            direction="row"
            spacing={2}>
            {_.map(
                tracks,
                track =>
                    <Stack key={track.name}>
                        <Stack
                            alignItems="center"
                            direction="row-reverse">
                            <Typography variant="h3">
                                {track.name}
                            </Typography>
                            <img
                                alt={track.name}
                                height={theme.spacing(12)}
                                src={`/api/image/${track.id}`}
                                width={theme.spacing(12)}/>
                        </Stack>
                        {/*<Grid2
                            container
                            spacing={1}>
                            {_.map(
                                track.layouts,
                                layout =>
                                    <Grid2
                                        key={layout.name}
                                        size="auto">
                                        <Stack
                                            alignItems="center"
                                            direction="row-reverse">
                                            <Typography variant="h6">
                                                {layout.name}
                                            </Typography>
                                            <img
                                                alt={layout.name}
                                                height={theme.spacing(6)}
                                                src={`/api/image/${layout.imageId}`}
                                                width={theme.spacing(6)}/>
                                        </Stack>
                                    </Grid2>)}
                        </Grid2>*/}
                    </Stack>)}
        </Stack>);
}