import { GithubUser, Identifiable } from './github';

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
