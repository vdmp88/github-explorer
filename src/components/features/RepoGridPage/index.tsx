'use client'

import { SearchInput } from '@/components/ui/SearchInput/SearchInput'
import RepoGrid from '../RepoGrid'
import { Box } from '@mui/material'
import { useDebounce } from "@uidotdev/usehooks";
import { useState } from 'react'

export const RepoGridPage = ({ initialData }: any) => {
    const [searchTerm, setSearchTerm] = useState('')
    const debouncedSearch = useDebounce(searchTerm, 400)

    console.log('debouncedSearch', debouncedSearch)
    
    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    bgcolor: (theme) =>
                        theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
                    padding: 3,
                }}
            >
                <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </Box>
            {searchTerm && <Box sx={{ padding: 2, textAlign: 'center' }}>Searching for "{debouncedSearch}"</Box>}
            <RepoGrid initialData={initialData} />
        </>
    )
}
