import { Box, Paper, Typography, Chip, Link, Avatar, Stack } from '@mui/material'
import RestorePageIcon from '@mui/icons-material/RestorePage'
import { GitHubIssueEvent } from '@/types/github'

interface GithubEventCardProps {
    event: GitHubIssueEvent
}

const getEstimatedContrastColor = (hex: string): string => {
    if (!hex || hex.length < 6) return '#000000'

    let cleanHex = hex.startsWith('#') ? hex.substring(1) : hex
    if (cleanHex.length === 3) {
        cleanHex = cleanHex
            .split('')
            .map((char) => char + char)
            .join('')
    }

    // Convert hex to R, G, B
    const r = parseInt(cleanHex.substring(0, 2), 16)
    const g = parseInt(cleanHex.substring(2, 4), 16)
    const b = parseInt(cleanHex.substring(4, 6), 16)

    // YIQ calculation for luminance: (299*R + 587*G + 114*B) / 1000
    const brightness = (r * 299 + g * 587 + b * 114) / 1000

    // Threshold 180 is generally a good spot for light/dark
    return brightness > 180 ? '#000000' : '#ffffff' // Black or White
}

const formatRelativeTime = (isoDate: string): string => {
    const date = new Date(isoDate)
    // Using a simplified mock date format
    return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        month: 'short',
        day: 'numeric',
    })
}

export const GithubEventCard = ({ event }: GithubEventCardProps) => {
    const { actor, repo, payload } = event
    const { action, issue } = payload
    const issueUrl = issue ? issue.html_url : '#'
    const updatedAt = issue ? issue.updated_at : new Date().toISOString()

    return (
        <Paper
            elevation={0}
            sx={{
                p: 3.5,
                borderRadius: 3,
                border: '1px solid',
                borderColor: 'grey.200',
                backgroundColor: 'background.paper',
                transition: 'all 0.25s ease',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',

                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                    borderColor: 'primary.light',
                },
            }}
        >
            <Stack direction="row" spacing={2} alignItems="center" mb={2.5}>
                <Avatar
                    alt={actor.login}
                    src={actor.avatar_url}
                    sx={{
                        width: 42,
                        height: 42,
                        boxShadow: 1,
                    }}
                />
                <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="body1" fontWeight={600}>
                        {actor.login}
                        <Typography component="span" variant="body1" color="text.secondary" ml={0.5}>
                            {action} issue in{' '}
                        </Typography>
                        <Link
                            href={`https://github.com/${repo.name}`}
                            target="_blank"
                            rel="noopener"
                            color="text.primary"
                            fontWeight={600}
                            sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                        >
                            {repo.name}
                        </Link>
                    </Typography>
                </Box>
                <Typography variant="caption" color="text.secondary">
                    {formatRelativeTime(updatedAt)}
                </Typography>
            </Stack>

            <Box
                sx={{
                    borderLeft: 4,
                    borderColor: 'success.main',
                    pl: 2,
                    mb: 2,
                }}
            >
                <Stack direction="row" spacing={1} alignItems="center">
                    <RestorePageIcon color="success" fontSize="small" />
                    <Link
                        href={issueUrl}
                        target="_blank"
                        rel="noopener"
                        variant="h6"
                        sx={{
                            fontWeight: 700,
                            textDecoration: 'none',
                            color: 'text.primary',
                            '&:hover': {
                                color: 'primary.main',
                            },
                        }}
                    >
                        {issue?.title}
                    </Link>
                </Stack>
                <Typography variant="body2" color="text.secondary" mt={0.5}>
                    #{issue?.number ?? 'N/A'} opened by {actor.login}
                </Typography>
            </Box>

            {/* LABELS */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 3 }}>
                {issue?.labels.map((label) => {
                    const color = `#${label.color}`
                    const contrastColor = getEstimatedContrastColor(color)

                    return (
                        <Chip
                            key={label.name}
                            label={label.name}
                            size="small"
                            variant="outlined"
                            sx={{
                                fontWeight: 600,
                                fontSize: '0.75rem',
                                height: 24,
                                backgroundColor: color,
                                color: contrastColor,
                                borderColor: color,
                                borderRadius: '6px',
                                '& .MuiChip-label': {
                                    px: 1,
                                },
                                '&:hover': {
                                    opacity: 0.85,
                                    backgroundColor: color,
                                },
                            }}
                            aria-label={`GitHub label: ${label.name}`}
                        />
                    )
                })}
            </Box>
        </Paper>
    )
}
