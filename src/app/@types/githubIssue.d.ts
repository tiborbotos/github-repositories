import { GithubEnums, GithubSearchResult, GithubUser, Identifiable } from './github';

export interface GithubIssueLabel extends Identifiable {
    url: string;
    name: string;
    color: string;
    default: boolean;
}

export interface GithubIssue extends Identifiable {
    url: string;
    html_url: string;
    title: string;
    user: GithubUser;
    state: GithubEnums.GithubIssueState;
    locked: boolean;
    assignee: GithubUser;
    assignees: Array<GithubUser>;
    labels: Array<GithubIssueLabel>;
    comments: number;
    created_at: string;
    updated_at: string;
    closed_at: string;
    author_association: GithubEnums.GithubIssueAuthorAssociation;
    body: string;
    number: number;
    score: number;
}

export interface GithubIssueSearchResult extends GithubSearchResult<GithubIssue> {
}
