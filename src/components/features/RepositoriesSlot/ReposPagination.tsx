'use client'

import { Pagination, Stack } from '@mui/material'
import { useSearchParams, useRouter } from 'next/navigation'

interface ReposPaginationProps {
  totalPages: number
}

export default function ReposPagination({ totalPages }: ReposPaginationProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get('page') ?? 1)

  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', String(value))
    router.push(`${window.location.pathname}?${params.toString()}`, { scroll: false })
  }

  return (
    <Stack spacing={2}>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handleChange}
        variant="outlined"
        color="primary"
      />
    </Stack>
  )
}
