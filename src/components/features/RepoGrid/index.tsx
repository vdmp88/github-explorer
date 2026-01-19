'use client'

import GitHubRepoCard from '@/components/features/GitHubRepoCard'
import Masonry from 'react-masonry-css'
import { useInfiniteQuery } from '@tanstack/react-query'
import { GitHubRepo } from '@/types/github'
import { useEffect, useRef } from 'react'

interface RepoGridProps {
    initialData: {
        items: GitHubRepo[]
        totalCount: number
        page: number
        perPage: number
    }
}

const breakpointCols = {
    default: 3,
    1100: 3,
    700: 2,
    500: 1,
}

export default function RepoGrid({ initialData, search }: any) {
    const query = search ? `${search} stars:>1` : 'stars:>1'

    const { items: initialItems, totalCount, page: initialPage, perPage } = initialData

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryKey: ['repos', search],
        queryFn: async ({ pageParam = 1 }) => {
            const res = await fetch(
                `https://api.github.com/search/repositories?q=${encodeURIComponent(
                    query
                )}&sort=stars&order=desc&per_page=${perPage}&page=${pageParam}`
            )
            const json = await res.json()
            return {
                items: json.items,
                totalCount: json.total_count,
                nextPage: pageParam + 1,
            }
        },
        getNextPageParam: (lastPage, allPages) => {
            const loadedItems = allPages.reduce((acc, page) => acc + page.items.length, 0)
            return loadedItems < totalCount ? lastPage.nextPage : undefined
        },
        initialData: !search
            ? {
                  pages: [{ items: initialItems, totalCount, nextPage: initialPage + 1 }],
                  pageParams: [initialPage],
              }
            : undefined,
        initialPageParam: initialPage,
    })

    const repos = data?.pages.flatMap((page) => page.items) ?? []

    const loadMoreRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!loadMoreRef.current || !hasNextPage) return

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) fetchNextPage()
            },
            { rootMargin: '200px' }
        )

        observer.observe(loadMoreRef.current)
        return () => observer.disconnect()
    }, [fetchNextPage, hasNextPage])

    return (
        <>
            <Masonry
                breakpointCols={breakpointCols}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
            >
                {repos.map((repo: GitHubRepo) => (
                    <GitHubRepoCard key={repo.id} repo={repo} />
                ))}
            </Masonry>
            <div ref={loadMoreRef} style={{ height: 1 }} />
            {isFetchingNextPage && <p>Loading more...</p>}
        </>
    )
}
