import { Box, Typography, Button, Stack } from '@mui/material'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'

export function SlotError({ error, reset }: { error: Error; reset?: () => void }) {
    return (
        <Box
            sx={{
                height: 500,
                borderRadius: 3,
                border: '1px solid',
                borderColor: 'grey.200',
                backgroundColor: 'background.paper',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: 4,
                textAlign: 'center',
            }}
        >
            <Stack spacing={2} alignItems="center" maxWidth={400}>
                <ErrorOutlineIcon
                    sx={{
                        fontSize: 40,
                        color: 'error.main',
                        opacity: 0.8,
                    }}
                />

                <Typography variant="h6" fontWeight={700}>
                    Failed to load
                </Typography>

                <Typography variant="body2" color="text.secondary">
                    {error.message}
                </Typography>

                {reset && (
                    <Button variant="contained" size="small" onClick={reset} sx={{ mt: 1 }}>
                        Try again
                    </Button>
                )}
            </Stack>
        </Box>
    )
}
