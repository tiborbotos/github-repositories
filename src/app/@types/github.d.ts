import { GithubRepository } from './githubRepository';

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
