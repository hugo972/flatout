import _ from "lodash";
import {useSuspenseQuery} from "@tanstack/react-query";

interface Track {
    name: string;
}

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
            <div>
                {_.map(
                    tracks,
                    track =>
                        <p key={track.name}>
                            {track.name}
                        </p>)}
            </div>);
}