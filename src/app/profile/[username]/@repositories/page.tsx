import RepositoryCard from '@/components/features/RepositoriesSlot/RepositoryCard'
import ReposPagination from '@/components/features/RepositoriesSlot/ReposPagination'
import { apiFetch } from '@/lib/api'
import { Box, Typography, Grid, Stack, Paper } from '@mui/material'

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
        <Box sx={{ height: '100%' }}>
            <Paper
                sx={{
                    height: '100%',
                    borderRadius: 3,
                    p: 3.5,
                    display: 'flex',
                    flexDirection: 'column',
                    border: '1px solid',
                    borderColor: 'grey.200',
                    backgroundColor: 'background.paper',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                }}
            >
                <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        Repositories for{' '}
                        <Box
                            component="span"
                            sx={{
                                color: 'primary.main',
                                fontWeight: 700,
                            }}
                        >
                            @{username}
                        </Box>
                    </Typography>
                </Box>

                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <Grid container spacing={3}>
                        {data.map((repo: any) => (
                            <Grid key={repo.id} size={{ sm: 12, md: 6 }}>
                                <RepositoryCard repo={repo} />
                            </Grid>
                        ))}
                    </Grid>

                    <Stack spacing={2} alignItems="center" sx={{ mt: 'auto', pt: 4 }}>
                        <ReposPagination totalPages={totalPages} />
                    </Stack>
                </Box>
            </Paper>
        </Box>
    )
}
