export interface Identifiable {
    id: number;
}

declare namespace GithubEnums {
    const enum GithubIssueState {
        OPEN = 'Open',
        CLOSED = 'Closed'
    }

    const enum GithubIssueAuthorAssociation {
        NONE,
        CONTRIBUTOR,
        MEMBER
    }

    const enum GithubUserType {
        ORGANIZATION = 'Organization',
        USER = 'User'
    }
}

export interface GithubUser extends Identifiable {
    login: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    type: GithubEnums.GithubUserType;
}

export interface GithubSearchResult<T extends Identifiable> {
    total_count: number;
    incomplete_results: boolean;
    items: Array<T>;
}
