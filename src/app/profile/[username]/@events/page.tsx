import { GithubEventCard } from '@/components/features/EventsSlot/GithubEventCard'
import { apiFetch } from '@/lib/api'
import { Box, Paper, Typography } from '@mui/material'

export default async function Repositories({ params }: { params: Promise<{ username: string }> }) {
    const { username } = await params
    const { data }: { data: any[] } = await apiFetch(`/users/${username}/events`)

    return (
        <Paper
            sx={{
                height: 500,
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 3,
                overflow: 'hidden',
            }}
        >
            <Box
                sx={{
                    px: 3,
                    py: 2,
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                }}
            >
                <Typography variant="h6" fontWeight={600}>
                    Recent GitHub Activity
                </Typography>
            </Box>

            <Box
                sx={{
                    flex: 1,
                    overflowY: 'auto',
                    p: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 3,

                    '&::-webkit-scrollbar': {
                        width: 6,
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: 'grey.400',
                        borderRadius: 3,
                    },
                }}
            >
                {data.map((event) => (
                    <GithubEventCard key={event.id} event={event} />
                ))}
            </Box>
        </Paper>
    )
}
