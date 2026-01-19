'use client'

import { SearchInput } from '@/components/ui/SearchInput/SearchInput'
import RepoGrid from '../RepoGrid'
import { Box } from '@mui/material'
import { useDebounce } from '@uidotdev/usehooks'
import { useState } from 'react'

export const RepoGridPage = ({ initialData }: any) => {
    const [searchTerm, setSearchTerm] = useState('')
    const debouncedSearch = useDebounce(searchTerm, 1000)

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 3,
                }}
            >
                <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </Box>
            <RepoGrid initialData={initialData} search={debouncedSearch} />
        </>
    )
}
