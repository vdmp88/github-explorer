export default function DashboardLayout({
    repositories,
    anything,
}: {
    repositories: React.ReactNode
    anything: React.ReactNode
}) {
    return (
        <div>
            <div>{repositories}</div>
            <div>{anything}</div>
        </div>
    )
}
