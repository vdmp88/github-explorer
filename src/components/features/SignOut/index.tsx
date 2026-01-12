'use client'

import LogoutIcon from '@mui/icons-material/Logout'
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { signOut } from 'next-auth/react'

export const SignOut = () => {
    return (
        <ListItemButton onClick={() => signOut({ callbackUrl: '/api/auth/signin' })}>
            <ListItemIcon>
                <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Sign out" />
        </ListItemButton>
    )
}
