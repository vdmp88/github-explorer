import { BackButton } from '@/components/ui/BackButton/BackButton'
import { Box, Container, Grid, Typography } from '@mui/material'

export default function DashboardLayout({
    repositories,
    events,
}: {
    repositories: React.ReactNode
    events: React.ReactNode
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
                    <Grid size={{ xs: 12, lg: 6 }}>{events}</Grid>

                    <Grid size={{ xs: 12, lg: 6 }}>{repositories}</Grid>
                </Grid>
            </Container>
        </Box>
    )
}
