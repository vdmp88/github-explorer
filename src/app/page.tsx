import { RepoGridPage } from '@/components/features/RepoGridPage'
import { apiFetch } from '@/lib/api'
import { GitHubRepo, GitHubSearchResponse } from '@/types/github'

export interface RepoPageData {
    items: GitHubRepo[]
    totalCount: number
    page: number
    perPage: number
}

export default async function Home() {
    const data: GitHubSearchResponse = await apiFetch(
        '/search/repositories?q=stars:>1&sort=stars&order=desc&per_page=20&page=1'
    )

    const initialData: RepoPageData = {
    items: data.items,
    totalCount: data.total_count,
    page: 1,
    perPage: 20,
}


    return (
        <RepoGridPage
            initialData={initialData}
        />
    )
}
