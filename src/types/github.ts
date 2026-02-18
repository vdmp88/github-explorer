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
        id: number
    }
    forks_count: number
}

export interface GitHubSearchResponse {
    total_count: number
    incomplete_results: boolean
    items: GitHubRepo[]
}

// TODO: Fix this type

export interface LabelType {
    name: string
    color: string
    description: string | null
}

export interface ActorType {
    login: string
    avatar_url: string
}

export interface IssueType {
    number: number
    title: string
    html_url: string
    updated_at: string
    labels: LabelType[]
}

export interface GitHubIssueEvent {
    id: string
    type: 'IssuesEvent'
    actor: ActorType
    repo: {
        name: string
    }
    payload: {
        action: 'reopened'
        issue: IssueType
    }
}
