import RepoGrid from '@/components/features/RepoGrid'
import { apiFetch } from '@/lib/api'
import { GitHubSearchResponse } from '@/types'

export default async function Home() {
    const data: GitHubSearchResponse = await apiFetch(
        '/search/repositories?q=stars:>1&sort=stars&order=desc&per_page=100'
    )

    return <RepoGrid repos={data.items} />
}
