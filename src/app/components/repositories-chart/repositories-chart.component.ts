import { Component, Input, OnInit } from '@angular/core';
import { GithubRepositorySearchResult } from '../../@types/githubRepository';
import { Chart } from 'chart.js';

interface BarChartData {
    labels: Array<string>;
    datasets: Array<{
        label: string,
        backgroundColor: string,
        data: Array<number>
    }>;
}

@Component({
    selector: 'ghr-repositories-chart',
    templateUrl: './repositories-chart.component.html',
    styleUrls: ['./repositories-chart.component.css']
})
export class RepositoriesChartComponent implements OnInit {

    @Input()
    searchResult: GithubRepositorySearchResult;

    chart: Chart;

    constructor() {
    }

    ngOnInit() {
        this.chart = new Chart('canvas', {
            type: 'bar',
            data: this.prepareRepositoriesData(),
            options: {
                responsive: true,
                legend: {
                    position: 'bottom',
                },
                title: {
                    display: true,
                    text: 'Stargazers, forks and open issues (first 5)'
                }
            },
            scales: {
                xAxes: [{
                    ticks: {
                        maxRotation: 90,
                        minRotation: 80
                    }
                }],
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        });
    }

    private prepareRepositoriesData(): BarChartData {
        const items = this.searchResult.items.slice(0, 5),
            labels = items.map((item) => item.full_name),
            datasets = [{
                label: 'Stargazers',
                data: items.map((item) => item.stargazers_count),
                backgroundColor: 'rgba(255, 197, 82, .5)'
            }, {
                label: 'Forks',
                data: items.map((item) => item.forks_count),
                backgroundColor: 'rgba(82, 108, 255, .5)'
            }, {
                label: 'Open Issues',
                data: items.map((item) => item.open_issues_count),
                backgroundColor: 'rgba(255, 82, 94, .5)'
            }];

        return {
            labels,
            datasets
        };
    }
}
