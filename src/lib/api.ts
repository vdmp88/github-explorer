import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'

export async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const session = await getServerSession(authOptions)
    
    if (!session?.accessToken) throw new Error("Unauthorized");

    const headers = {
        Accept: 'application/vnd.github.v3+json',
        Authorization: `token ${session?.accessToken}`,
        'X-GitHub-Api-Version': '2022-11-28',
        ...(options.headers || {}),
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
        ...options,
        headers,
        next: { revalidate: 3600 },
    })

    if (!res.ok) {
        throw new Error(`Fetch error: ${res.status} ${res.statusText}`)
    }

    return res.json() as Promise<T>
}
