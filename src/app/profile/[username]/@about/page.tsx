import { apiFetch } from '@/lib/api'
import { Box, Paper, Typography, Avatar, Stack, Chip, Link, Divider } from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import BusinessIcon from '@mui/icons-material/Business'
import LinkIcon from '@mui/icons-material/Link'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import PeopleIcon from '@mui/icons-material/People'
import FolderIcon from '@mui/icons-material/Folder'

export default async function About({ params }: { params: Promise<{ username: string }> }) {
    const { username } = await params

    const { data }: any = await apiFetch(`/users/${username}`)
    const { data: followers }: any = await apiFetch(`/users/${username}/followers`)
    const { data: following }: any = await apiFetch(`/users/${username}/following`)

    const createdAt = new Date(data.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
    })

    return (
        <Paper
            sx={{
                borderRadius: 3,
                p: 3.5,
                border: '1px solid',
                borderColor: 'grey.200',
                backgroundColor: 'background.paper',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            }}
        >
            {/* Header */}
            <Stack direction="row" spacing={3} alignItems="center">
                <Avatar
                    src={data.avatar_url}
                    alt={data.login}
                    sx={{
                        width: 96,
                        height: 96,
                        boxShadow: 2,
                    }}
                />

                <Box>
                    <Typography variant="h6" fontWeight={700}>
                        {data.name || data.login}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                        @{data.login}
                    </Typography>

                    {data.bio && (
                        <Typography variant="body2" sx={{ mt: 1, maxWidth: 500 }} color="text.secondary">
                            {data.bio}
                        </Typography>
                    )}
                </Box>
            </Stack>

            <Divider sx={{ my: 3 }} />

            {/* Meta Info */}
            <Stack spacing={1.5}>
                {data.company && (
                    <Stack direction="row" spacing={1} alignItems="center">
                        <BusinessIcon fontSize="small" color="action" />
                        <Typography variant="body2">{data.company}</Typography>
                    </Stack>
                )}

                {data.location && (
                    <Stack direction="row" spacing={1} alignItems="center">
                        <LocationOnIcon fontSize="small" color="action" />
                        <Typography variant="body2">{data.location}</Typography>
                    </Stack>
                )}

                {data.blog && (
                    <Stack direction="row" spacing={1} alignItems="center">
                        <LinkIcon fontSize="small" color="action" />
                        <Link href={data.blog} target="_blank" rel="noopener" underline="hover">
                            {data.blog}
                        </Link>
                    </Stack>
                )}

                <Stack direction="row" spacing={1} alignItems="center">
                    <CalendarMonthIcon fontSize="small" color="action" />
                    <Typography variant="body2">Joined GitHub in {createdAt}</Typography>
                </Stack>
            </Stack>

            <Divider sx={{ my: 3 }} />

            {/* Stats */}
            <Stack direction="row" spacing={2} flexWrap="wrap">
                <Chip icon={<FolderIcon />} label={`${data.public_repos} Repositories`} variant="outlined" />
                <Chip icon={<PeopleIcon />} label={`${followers.length} Followers`} variant="outlined" />
                <Chip
                    icon={<PeopleIcon />}
                    label={`${following.length} Following`}
                    variant="outlined"
                    color="primary"
                />
            </Stack>

            {/* GitHub link */}
            <Box sx={{ mt: 3 }}>
                <Link href={data.html_url} target="_blank" rel="noopener" underline="hover" fontWeight={600}>
                    View full profile on GitHub →
                </Link>
            </Box>
        </Paper>
    )
}
