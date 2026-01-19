import { Box, Button, Container, Typography } from '@mui/material'
import Link from 'next/link'

export default function NotFound() {
    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh',
                    textAlign: 'center',
                }}
            >
                <Typography variant="h1" sx={{ fontSize: '6rem', fontWeight: 'bold', color: 'primary.main' }}>
                    404
                </Typography>
                <Typography variant="h4" sx={{ mb: 2 }}>
                    Page Not Found
                </Typography>
                <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
                    Sorry, the page you're looking for doesn't exist.
                </Typography>
                <Link href="/" passHref>
                    <Button variant="contained" size="large">
                        Go Home
                    </Button>
                </Link>
            </Box>
        </Container>
    )
}
