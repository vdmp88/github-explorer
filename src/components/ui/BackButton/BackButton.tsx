'use client'

import { IconButton, Tooltip } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useRouter } from 'next/navigation'

export function BackButton() {
    const router = useRouter()

    return (
        <Tooltip title="Back">
            <IconButton onClick={() => router.back()}>
                <ArrowBackIcon />
            </IconButton>
        </Tooltip>
    )
}
