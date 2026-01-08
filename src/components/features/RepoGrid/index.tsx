'use client'

import GitHubRepoCard from '@/components/features/GitHubRepoCard'
import Masonry from 'react-masonry-css'

interface RepoGridProps {
    repos: any[]
}

export default function RepoGrid({ repos }: RepoGridProps) {
    const breakpointCols = {
        default: 4,
        1100: 3,
        700: 2,
        500: 1,
    }

    return (
        <Masonry
            breakpointCols={breakpointCols}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
        >
            {repos.map((repo: any) => (
                <GitHubRepoCard key={repo.id} repo={repo} />
            ))}
        </Masonry>
    )
}
