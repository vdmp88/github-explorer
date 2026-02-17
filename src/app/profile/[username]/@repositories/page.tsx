import RepositoryCard from '@/components/features/RepositoriesSlot/RepositoryCard'
import ReposPagination from '@/components/features/RepositoriesSlot/ReposPagination'
import { apiFetch } from '@/lib/api'
import { Box, Typography, Grid, Stack } from '@mui/material'

export default async function Repositories({
    params,
    searchParams,
}: {
    params: Promise<{ username: string }>
    searchParams: Promise<{ page?: string; perPage?: string }>
}) {
    const { username } = await params
    const resolvedSearchParams = await searchParams
    const page = Number(resolvedSearchParams.page ?? 1)
    const perPage = Number(resolvedSearchParams.perPage ?? 9)
    const { data, headers }: any = await apiFetch(`/users/${username}/repos?per_page=${perPage}&page=${page}`)

    const link = headers.get('Link')
    let totalPages = 1
    if (link) {
        const lastMatch = link.match(/&page=(\d+)>; rel="last"/)
        if (lastMatch) {
            totalPages = Number(lastMatch[1])
        } else {
            const prevMatch = link.match(/&page=(\d+)>; rel="prev"/)
            if (prevMatch) {
                totalPages = Number(prevMatch[1]) + 1
            }
        }
    }

    return (
        <Box sx={{ flexGrow: 1, p: 3, backgroundColor: 'grey.50', minHeight: '100vh' }}>
            <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 4, fontWeight: 'bold' }}>
                Repositories for <span style={{ color: '#6A1B9A' }}>@{username}</span>
            </Typography>

            <Grid container spacing={3}>
                {data.map((repo: any) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={repo.id}>
                        <RepositoryCard repo={repo} />
                    </Grid>
                ))}
            </Grid>

            <Stack spacing={2} sx={{ mt: 4 }} alignItems="center">
                <ReposPagination totalPages={totalPages} />
            </Stack>
        </Box>
    )
}
