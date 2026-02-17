'use client'

import { Container, Typography, Button, Box } from '@mui/material'
import { Error as ErrorIcon, Refresh } from '@mui/icons-material'

export default function Error({ error: _error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    return (
        <Container
            maxWidth="sm"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                textAlign: 'center',
            }}
        >
            <Box sx={{ mb: 4 }}>
                <ErrorIcon sx={{ fontSize: 80, color: 'error.main', mb: 2 }} />
                <Typography variant="h4" component="h1" gutterBottom>
                    Oops! Something went wrong
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                    We encountered an unexpected error. Please try again or contact support if the problem persists.
                </Typography>
            </Box>
            <Button variant="contained" color="primary" startIcon={<Refresh />} onClick={() => reset()} size="large">
                Try Again
            </Button>
        </Container>
    )
}
