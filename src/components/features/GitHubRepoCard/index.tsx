import {
    Card,
    CardContent,
    CardActions,
    Button,
    Typography,
    Avatar,
    Box,
    Link as MuiLink,
    Divider,
} from '@mui/material'
import { Star, Language as LanguageIcon, Visibility as VisibilityIcon } from '@mui/icons-material'
import { GitHubRepo } from '@/types/github'
import Link from 'next/link'

interface GitHubRepoCardProps {
    repo: GitHubRepo
}

export default function GitHubRepoCard({ repo }: GitHubRepoCardProps) {
    return (
        <Card
            variant="outlined"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 2,
                transition: '0.3s',
                '&:hover': {
                    boxShadow: 6,
                    borderColor: 'transparent',
                    transform: 'translateY(-4px)',
                },
            }}
        >
            <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar alt={repo.owner.login} src={repo.owner.avatar_url} sx={{ width: 48, height: 48, mr: 2 }} />
                    <Box>
                        <Typography variant="h6" component="h2" noWrap>
                            {repo.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <MuiLink component={Link} href={`/profile/${repo.owner.login}`} underline="hover">
                                Owner: {repo.owner.login}
                            </MuiLink>
                        </Typography>
                    </Box>
                </Box>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        minHeight: '40px',
                        mb: 2,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                    }}
                >
                    {repo.description || 'No description.'}
                </Typography>

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        mt: 2,
                    }}
                >
                    {repo.language && (
                        <Box display="flex" alignItems="center">
                            <LanguageIcon
                                sx={{
                                    fontSize: 16,
                                    mr: 0.5,
                                    color: 'text.secondary',
                                }}
                            />
                            <Typography variant="body2">{repo.language}</Typography>
                        </Box>
                    )}

                    <Box display="flex" alignItems="center">
                        <Star
                            sx={{
                                fontSize: 16,
                                mr: 0.5,
                                color: 'text.secondary',
                            }}
                        />
                        <Typography variant="body2">{repo.stargazers_count}</Typography>
                    </Box>

                    <Box display="flex" alignItems="center">
                        <VisibilityIcon
                            sx={{
                                fontSize: 16,
                                mr: 0.5,
                                color: 'text.secondary',
                            }}
                        />
                        <Typography variant="body2">Forks: {repo.forks_count}</Typography>
                    </Box>
                </Box>
            </CardContent>

            <Divider />

            <CardActions>
                <MuiLink href={repo.html_url} target="_blank" rel="noopener" underline="none">
                    <Button size="small" color="primary">
                        Go to repository
                    </Button>
                </MuiLink>
            </CardActions>
        </Card>
    )
}
