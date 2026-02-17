'use client'

import LogoutIcon from '@mui/icons-material/Logout'
import Button from '@mui/material/Button'
import { signOut } from 'next-auth/react'

export const SignOut = () => {
    return (
        <Button
        style={{ marginTop: 'auto', marginBottom: 16, justifyContent: 'center'}}
            onClick={() => signOut({ callbackUrl: '/api/auth/signin' })}
            startIcon={<LogoutIcon />}
            
            sx={{ justifyContent: 'flex-start', width: '100%' }}
        >
            Sign out
        </Button>
    )
}
