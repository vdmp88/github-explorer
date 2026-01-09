'use client'

import GitHubRepoCard from '@/components/features/GitHubRepoCard'
import Masonry from 'react-masonry-css'
import { GitHubRepo, GitHubSearchResponse } from '@/types/github'
import { useInfiniteQuery } from '@tanstack/react-query'

interface RepoGridProps {
    repos: GitHubRepo[]
}

export default function RepoGrid({ repos }: RepoGridProps) {
    const breakpointCols = {
        default: 3,
        1100: 3,
        700: 2,
        500: 1,
    }

    return (
        <Masonry breakpointCols={breakpointCols} className="my-masonry-grid" columnClassName="my-masonry-grid_column">
            {repos.map((repo: GitHubRepo) => (
                <GitHubRepoCard key={repo.id} repo={repo} />
            ))}
        </Masonry>
    )
}
