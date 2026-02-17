import { Card, CardContent, Typography, Chip, Stack, Divider } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import CallSplitIcon from '@mui/icons-material/CallSplit'
import AccessTimeIcon from '@mui/icons-material/AccessTime'

interface Repository {
    id: number
    name: string
    description: string | null
    language: string | null
    stargazers_count: number
    forks_count: number
    updated_at: string
}

interface RepositoryCardProps {
    repo: Repository
}

export default function RepositoryCard({ repo }: RepositoryCardProps) {
    const updatedAt = repo.updated_at
        ? new Date(repo.updated_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
          })
        : 'N/A'

    const language = repo.language ?? 'Unknown'

    const languageColor: Record<string, string> = {
        JavaScript: '#f7df1e',
        TypeScript: '#3178c6',
        Python: '#3572a5',
        CSS: '#563d7c',
        HTML: '#e34c26',
        Unknown: '#9e9e9e',
        Default: '#f1e05a',
    }

    const langColor = languageColor[language] ?? languageColor.Default

    return (
        <Card
            variant="outlined"
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 3,
                borderColor: 'grey.100',
                transition: 'all 0.3s ease',
                '&:hover': {
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.05)',
                    transform: 'translateY(-2px)',
                    borderColor: 'primary.main',
                },
            }}
        >
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" sx={{ mb: 1.5, fontWeight: 600 }}>
                    {repo.name}
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2, minHeight: 40 }}
                >
                    {repo.description ?? 'No description provided'}
                </Typography>

                <Divider sx={{ mb: 2 }} />

                <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    useFlexGap
                    flexWrap="wrap"
                >
                    {/* Language */}
                    <Chip
                        size="small"
                        label={language}
                        sx={{
                            backgroundColor: langColor,
                            color:
                                langColor === '#f7df1e'
                                    ? 'black'
                                    : 'white',
                            fontWeight: 500,
                        }}
                    />

                    {/* Stars */}
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                        <StarIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                            {repo.stargazers_count}
                        </Typography>
                    </Stack>

                    {/* Forks */}
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                        <CallSplitIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                            {repo.forks_count}
                        </Typography>
                    </Stack>

                    {/* Updated */}
                    <Stack
                        direction="row"
                        alignItems="center"
                        spacing={0.5}
                        sx={{ ml: 'auto !important' }}
                    >
                        <AccessTimeIcon
                            sx={{ fontSize: 16, color: 'text.secondary' }}
                        />
                        <Typography variant="caption" color="text.secondary">
                            {updatedAt}
                        </Typography>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    )
}
