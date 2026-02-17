import Paper from '@mui/material/Paper'
import InputBase from '@mui/material/InputBase'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'

type SearchInputProps = {
    searchTerm?: string
    setSearchTerm?: (value: string) => void
}

export const SearchInput = ({ searchTerm, setSearchTerm }: SearchInputProps) => {
    return (
        <Paper
            component="form"
            sx={(theme) => ({
                p: '8px 16px',
                display: 'flex',
                alignItems: 'center',
                width: 450,
                maxWidth: '100%',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.03)',
                transition: 'box-shadow 0.3s ease-in-out',
                backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.common.white,
                '&:hover': {
                    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.04)',
                },
            })}
        >
            <IconButton sx={{ p: '10px' }} aria-label="search">
                <SearchIcon color="action" />
            </IconButton>
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search repositories..."
                inputProps={{ 'aria-label': 'Search repositories' }}
                onChange={(e) => setSearchTerm?.(e.target.value)}
                value={searchTerm}
            />
        </Paper>
    )
}
