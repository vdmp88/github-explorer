import { BackButton } from '@/components/ui/BackButton/BackButton'
import { Box } from '@mui/material'

export default function DashboardLayout({
    repositories,
    anything,
}: {
    repositories: React.ReactNode
    anything: React.ReactNode
}) {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Box sx={{ p: 2 }}>
                <BackButton />
            </Box>
            <Box sx={{ p: 2, flexGrow: 1 }}>
                {anything}
                {repositories}
            </Box>
        </Box>
    )
}
