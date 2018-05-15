
export interface Identifiable {
    id: number;
}

declare enum GithubUserType {
    ORGANIZATION = 'Organization',
    USER = 'User'
}

export interface GithubUser extends Identifiable {
    login: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    type: GithubUserType;
}

export interface GithubSearchResult<T extends Identifiable> {
    total_count: number;
    incomplete_results: boolean;
    items: Array<T>;
}

declare enum GithubIssueState {
    OPEN = 'Open',
    CLOSED = 'Closed',
}

declare enum GithubIssueAuthorAssociation {
    NONE,
    CONTRIBUTOR,
    MEMBER
}

export interface GithubIssueLabel extends Identifiable {
    url: string;
    name: string;
    color: string;
    default: boolean;
}

export interface GithubIssue extends Identifiable {
    url: string;
    title: string;
    user: GithubUser;
    state: GithubIssueState;
    locked: boolean;
    assignee: GithubUser;
    assignees: Array<GithubUser>;
    labels: Array<GithubIssueLabel>;
    comments: number;
    created_at: string;
    updated_at: string;
    closed_at: string;
    author_association: GithubIssueAuthorAssociation;
    body: string;
    score: number;
}

export interface GithubIssueSearchResult extends GithubSearchResult<GithubIssue> {
}

export interface GithubRepository extends Identifiable {
    name: string;
    full_name: string;
    owner: GithubUser;
    private: boolean;
    description: string;
    fork: boolean;
    html_url: string;
    homepage: string;
    size: number;
    stargazers_count: number;
    watchers_count: number;
    has_issues: boolean;
    has_projects: boolean;
    has_downloads: boolean;
    has_wiki: boolean;
    has_pages: boolean;
    forks_count: number;
    archived: boolean;
    open_issues_count: number;
    license: { name: string };
    forks: number;
    open_issues: number;
    watchers: number;
    score: number;
}

export interface GithubRepositorySearchResult extends GithubSearchResult<GithubRepository> {
}
