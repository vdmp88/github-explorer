import { GithubEventCard } from '@/components/features/EventsSlot/GithubEventCard'
import { apiFetch } from '@/lib/api'
import { Box, Paper, Typography, Stack } from '@mui/material'
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined'

export default async function Repositories({ params }: { params: Promise<{ username: string }> }) {
    const { username } = await params
    const { data }: { data: any[] } = await apiFetch(`/users/${username}/events`)

    const hasEvents = data && data.length > 0

    return (
        <Paper
            sx={{
                height: 500,
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 3,
                overflow: 'hidden',
                border: '1px solid',
                borderColor: 'grey.200',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            }}
        >
            {/* Header */}
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

            {/* Content */}
            <Box
                sx={{
                    flex: 1,
                    overflowY: hasEvents ? 'auto' : 'hidden',
                    p: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 3,
                    justifyContent: hasEvents ? 'flex-start' : 'center',
                    alignItems: hasEvents ? 'stretch' : 'center',

                    '&::-webkit-scrollbar': {
                        width: 6,
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: 'grey.400',
                        borderRadius: 3,
                    },
                }}
            >
                {hasEvents ? (
                    data.map((event) => <GithubEventCard key={event.id} event={event} />)
                ) : (
                    <Stack spacing={2} alignItems="center" textAlign="center">
                        <InboxOutlinedIcon
                            sx={{
                                fontSize: 40,
                                color: 'text.disabled',
                            }}
                        />
                        <Typography variant="subtitle1" fontWeight={600}>
                            No recent activity
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            This user hasn’t performed any public GitHub actions yet.
                        </Typography>
                    </Stack>
                )}
            </Box>
        </Paper>
    )
}
