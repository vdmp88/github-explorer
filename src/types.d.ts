declare module '*.css'

export interface GitHubRepo {
    id: number
    name: string
    html_url: string
    description: string | null
    stargazers_count: number
    language: string | null
    owner: {
        avatar_url: string
        login: string
    }
    forks_count: number
}

export interface GitHubSearchResponse {
    total_count: number
    incomplete_results: boolean
    items: GitHubRepo[]
}
