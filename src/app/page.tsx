import RepoGrid from '@/components/features/RepoGrid'
import { apiFetch } from '@/lib/api'
import { GitHubSearchResponse } from '@/types/github'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

export default async function Home() {
    const session = await getServerSession(authOptions)

    console.log('Session:', session)

    if (!session) {
        redirect('/api/auth/signin')
    }

    const data: GitHubSearchResponse = await apiFetch(
        '/search/repositories?q=stars:>1&sort=stars&order=desc&per_page=20&page=1'
    )


    return <RepoGrid repos={data.items} />
}
