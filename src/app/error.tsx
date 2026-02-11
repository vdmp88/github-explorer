'use client'

import { Box, Button, Card, CardContent, Typography, Alert, Collapse } from '@mui/material'
import { useState } from 'react'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    const [showDetails, setShowDetails] = useState(false)

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                mt: 8,
                px: 2,
            }}
        >
            <Card
                sx={{
                    maxWidth: 500,
                    width: '100%',
                    borderRadius: 3,
                    boxShadow: 4,
                }}
            >
                <CardContent>
                    <Alert severity="error" sx={{ mb: 2 }}>
                        Dashboard failed to load
                    </Alert>

                    <Typography variant="h6" gutterBottom>
                        Something broke in this section.
                    </Typography>

                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                        This error is local to the dashboard page.
                    </Typography>

                    <Button variant="contained" onClick={() => reset()} sx={{ mr: 2 }}>
                        Retry
                    </Button>

                    <Button variant="text" onClick={() => setShowDetails((prev) => !prev)}>
                        {showDetails ? 'Hide details' : 'Show details'}
                    </Button>

                    <Collapse in={showDetails}>
                        <Box
                            sx={{
                                mt: 2,
                                p: 2,
                                bgcolor: 'grey.100',
                                borderRadius: 2,
                                fontSize: 12,
                                fontFamily: 'monospace',
                                wordBreak: 'break-word',
                            }}
                        >
                            {error.message}
                        </Box>
                    </Collapse>
                </CardContent>
            </Card>
        </Box>
    )
}
