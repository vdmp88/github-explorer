import RepoGrid from '@/components/features/RepoGrid'

export default async function Home() {
    const response = await fetch('https://api.github.com/repositories', {
        headers: {
            Authorization: `token ${process.env.GITHUB_TOKEN}`,
            Accept: 'application/vnd.github.v3+json',
            'X-GitHub-Api-Version': '2022-11-28',
        },
        next: { revalidate: 3600 },
    })

    if (!response.ok) {
        return <div>Error fetching GitHub API: {response.status}</div>
    }

    const repos = await response.json()

    console.log(repos)

    return (
        <>
            <RepoGrid repos={repos} />
        </>
    )
}
