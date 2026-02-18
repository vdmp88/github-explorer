
import { Paper, Box, CircularProgress } from '@mui/material'

export function SlotLoading() {
    return (
        <Paper
            sx={{
                height: 500, // такая же высота как у слотов
                borderRadius: 3,
                border: '1px solid',
                borderColor: 'grey.200',
                backgroundColor: 'background.paper',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <CircularProgress size={32} />
        </Paper>
    )
}
