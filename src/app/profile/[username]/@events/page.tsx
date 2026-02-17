import { apiFetch } from "@/lib/api"

export default async function Repositories({
  params,
}: {
  params: Promise<{ username: string }>
}){
    const { username } = await params
    const events = await apiFetch(`/users/${username}/events`);
    // console.log(events, "events");

    return <div>Events for user {username}</div>
}