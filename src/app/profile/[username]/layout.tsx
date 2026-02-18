import { BackButton } from '@/components/ui/BackButton/BackButton'
import { Box, Container, Grid, Typography } from '@mui/material'

export default function DashboardLayout({
    repositories,
    events,
    about,
}: {
    repositories: React.ReactNode
    events: React.ReactNode
    about: React.ReactNode
}) {
    return (
        <Box
            sx={{
                minHeight: '100vh',
                backgroundColor: 'grey.50',
                py: 4,
            }}
        >
            <Container maxWidth="xl">
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mb: 4,
                    }}
                >
                    <BackButton />
                    <Typography variant="h5" fontWeight={700} sx={{ ml: 2 }}>
                        Dashboard
                    </Typography>
                    <Box />
                </Box>

                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, lg: 6 }}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 3,
                            }}
                        >
                            {about}
                            {events}
                        </Box>
                    </Grid>

                    <Grid size={{ xs: 12, lg: 6 }}>{repositories}</Grid>
                </Grid>
            </Container>
        </Box>
    )
}
