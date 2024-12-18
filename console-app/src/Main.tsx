import _ from "lodash";
import {useSuspenseQuery} from "@tanstack/react-query";
import {Stack, Typography} from "@mui/material";
import {Track} from "./common";

export function Main() {
    const {data: tracks} =
        useSuspenseQuery({
            queryKey: ["Main", "getTracks"],
            queryFn:
                async () => {
                    const tracksResponse = await fetch("/api/getTracks")
                    return await tracksResponse.json() as Track[]
                }
        })

    return (
        <Stack>
            {_.map(
                tracks,
                track =>
                    <Stack key={track.name}>
                        <Typography>
                            {track.name}
                        </Typography>
                        <img
                            alt={track.name}
                            height={80}
                            src={`/api/image/${track.id}`}
                            width={80}/>
                    </Stack>)}
        </Stack>);
}