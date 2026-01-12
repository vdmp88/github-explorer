import RepoGrid from '@/components/features/RepoGrid'
import { apiFetch } from '@/lib/api'
import { GitHubSearchResponse } from '@/types/github'

export default async function Home() {
    const data: GitHubSearchResponse = await apiFetch(
        '/search/repositories?q=stars:>1&sort=stars&order=desc&per_page=20&page=1'
    )


    return <RepoGrid repos={data.items} />
}
