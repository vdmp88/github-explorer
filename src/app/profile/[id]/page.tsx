export default async function Page({ params }: any) {
    const { id } = await params

    return <div>Profile here {id}</div>
}
