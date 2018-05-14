import { GithubRepository } from './githubRepository';
import { GithubSearchResult } from './github';
import { GithubIssue } from './githubIssue';

export interface GithubRepositorySearchResult extends GithubSearchResult<GithubRepository> {
}

export interface GithubIssueSearchResult extends GithubSearchResult<GithubIssue> {
}
