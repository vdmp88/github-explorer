'use client'

import { SlotError } from '@/components/features/SlotError/SlotError'

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
    console.error('Error loading GitHub events:', error)
    return <SlotError error={error} reset={reset} />
}
