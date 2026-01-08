export async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const baseUrl = 'https://api.github.com'

    const headers = {
        Accept: 'application/vnd.github.v3+json',
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
        'X-GitHub-Api-Version': '2022-11-28',
        ...(options.headers || {}),
    }

    const res = await fetch(`${baseUrl}${endpoint}`, {
        ...options,
        headers,
        next: { revalidate: 3600 },
    })

    console.log('Fetch response:', res)

    if (!res.ok) {
        throw new Error(`Fetch error: ${res.status} ${res.statusText}`)
    }

    return res.json()
}
