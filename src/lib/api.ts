export async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const headers = {
        Accept: 'application/vnd.github.v3+json',
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
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

    return res.json()
}
