import { apiFetch } from '@/lib/api'
import { Avatar, Box, Button, Card, CardContent, Chip, Container, Divider, Stack, Typography } from '@mui/material'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import TwitterIcon from '@mui/icons-material/Twitter'
import WorkIcon from '@mui/icons-material/Work'
import { BackButton } from '@/components/ui/BackButton/BackButton'
import { Stat } from './Stat'

export interface GitHubUser {
    login: string
    id: number
    node_id: string

    avatar_url: string
    gravatar_id: string

    url: string
    html_url: string
    followers_url: string
    following_url: string
    gists_url: string
    starred_url: string
    subscriptions_url: string
    organizations_url: string
    repos_url: string
    events_url: string
    received_events_url: string

    type: 'User' | 'Organization'
    user_view_type?: 'public' | 'private'
    site_admin: boolean

    name: string | null
    company: string | null
    blog: string | null
    location: string | null
    email: string | null
    hireable: boolean | null
    bio: string | null
    twitter_username: string | null

    public_repos: number
    public_gists: number
    followers: number
    following: number

    created_at: string
    updated_at: string
}

export default async function Page({ params }: { params: Promise<{ username: string }> }) {
    const { username } = await params

    const data = await apiFetch<GitHubUser>(`/users/${username}`)

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Box mb={2}>
                <BackButton />
            </Box>
            <Card>
                <CardContent>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={4}>
                        <Avatar src={data.avatar_url} alt={data.name || data.login} sx={{ width: 120, height: 120 }} />
                        <Box flex={1}>
                            <Stack spacing={1}>
                                <Typography variant="h5">{data.name || data.login}</Typography>
                                <Typography color="text.secondary">@{data.login}</Typography>
                                {data.bio && <Typography sx={{ mt: 1 }}>{data.bio}</Typography>}
                                <Stack direction="row" spacing={2} flexWrap="wrap" mt={1}>
                                    {data.location && (
                                        <Chip icon={<LocationOnIcon />} label={data.location} variant="outlined" />
                                    )}

                                    {data.company && (
                                        <Chip icon={<WorkIcon />} label={data.company} variant="outlined" />
                                    )}

                                    {data.hireable && <Chip color="success" label="Open to work" variant="outlined" />}
                                </Stack>
                                <Stack direction="row" spacing={2} mt={2}>
                                    <Button
                                        variant="contained"
                                        endIcon={<OpenInNewIcon />}
                                        href={data.html_url}
                                        target="_blank"
                                    >
                                        GitHub
                                    </Button>
                                    {data.blog && (
                                        <Button variant="outlined" href={data.blog} target="_blank">
                                            Website
                                        </Button>
                                    )}
                                    {data.twitter_username && (
                                        <Button
                                            variant="outlined"
                                            startIcon={<TwitterIcon />}
                                            href={`https://twitter.com/${data.twitter_username}`}
                                            target="_blank"
                                        >
                                            Twitter
                                        </Button>
                                    )}
                                </Stack>
                            </Stack>
                        </Box>
                    </Stack>
                    <Divider sx={{ my: 4 }} />
                    <Stack direction="row" spacing={4} justifyContent="center">
                        <Stat label="Repositories" value={data.public_repos} />
                        <Stat label="Followers" value={data.followers} />
                        <Stat label="Following" value={data.following} />
                    </Stack>
                </CardContent>
            </Card>
        </Container>
    )
}
