import { Box, Typography } from "@mui/material";

export function Stat({ label, value }: { label: string; value: number }) {
    return (
        <Box textAlign="center">
            <Typography variant="h6">{value}</Typography>
            <Typography color="text.secondary" variant="body2">
                {label}
            </Typography>
        </Box>
    )
}
