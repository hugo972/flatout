import {ReactNode, useState} from "react";
import {Popover, Stack, Typography, useTheme} from "@mui/material";
import _ from "lodash";

type InlineItemsProps<TItem> = {
    items: TItem[];
    itemsTranslator: (count: number) => string;
    renderItem?: (item: TItem) => ReactNode;
    variant: "itemCount" | "itemOrItemCount";
};

export function InlineItems<TItem>({items, itemsTranslator, renderItem, variant}: InlineItemsProps<TItem>) {
    return (
        <>
            {items.length === 1 && variant == "itemOrItemCount"
                ? renderItem?.(items[0]) ?? items[0] as string
                : <Items {...{items, itemsTranslator, renderItem, variant}}/>}
        </>);
}

function Items<TItem>({items, itemsTranslator, renderItem}: InlineItemsProps<TItem>) {
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    return (
        <>
            <Typography
                sx={{
                    color: theme.palette.action.active,
                    textDecoration: "underline"
                }}
                onClick={() => setOpen(true)}>
                {itemsTranslator(items.length)}
            </Typography>
            {open &&
                <Popover
                    open={true}
                    onClose={() => setOpen(false)}>
                    <Stack>
                        {_.map(
                            items,
                            item =>
                                renderItem?.(item) ??
                                <Typography>
                                    {item as string}
                                </Typography>)}
                    </Stack>
                </Popover>}
        </>);
}