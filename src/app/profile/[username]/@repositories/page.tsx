import RepositoryCard from '@/components/features/RepositoryCard'
import { apiFetch } from '@/lib/api'
import { Box, Typography, Grid } from '@mui/material'

export default async function Repositories({ params }: { params: Promise<{ username: string }> }) {
    const { username } = await params
    const repos: any[] = await apiFetch(`/users/${username}/repos?per_page=10&page=1`)
    console.log(repos, 'repos')

    return (
        <Box sx={{ flexGrow: 1, p: 3, backgroundColor: 'grey.50', minHeight: '100vh' }}>
            <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 4, fontWeight: 'bold' }}>
                Repositories for <span style={{ color: '#6A1B9A' }}>@{username}</span>
            </Typography>

            <Grid container spacing={3}>
                {repos.map((repo) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={repo.id}>
                        <RepositoryCard repo={repo} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}
