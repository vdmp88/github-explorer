'use client'

import { useSession } from 'next-auth/react';
import { Avatar, Box, Typography, Stack } from '@mui/material';

export const UserProfile = () => {
    const { data: session } = useSession();
    if (!session) return null;

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2 }}>
            <Avatar
                src={session.user?.image || undefined}
                alt={session.user?.name || 'User'}
                sx={{ width: 56, height: 56 }}
            >
                {!session.user?.image && session.user?.name ? session.user.name.charAt(0).toUpperCase() : 'U'}
            </Avatar>
            <Stack>
                <Typography variant="h6" component="div">
                    {session.user?.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {session.user?.email}
                </Typography>
            </Stack>
        </Box>
    );
}