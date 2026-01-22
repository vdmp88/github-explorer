export default async function Page({ params }: { params: Promise<{ owner: string; repo: string }> }) {
    const { repo, owner } = await params

    console.log(owner, repo)

    return (
        <>
            owner: {owner}, repo: {repo}
        </>
    )
}
