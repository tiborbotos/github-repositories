import { GithubUser, Identifiable } from './github';

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
