import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { MatButtonModule, MatIconModule, MatSnackBar, MatSnackBarModule, MatToolbarModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { RepositoryListComponent } from './components/repository-list/repository-list.component';
import { RepositoryListItemComponent } from './components/repository-list-item/repository-list-item.component';
import { RepositoryDetailsComponent } from './components/repository-details/repository-details.component';
import { RepositoriesChartComponent } from './components/repositories-chart/repositories-chart.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        RepositoryListComponent,
        RepositoryListItemComponent,
        RepositoryDetailsComponent,
        RepositoriesChartComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
        HttpClientModule,
        MatButtonModule,
        MatIconModule,
        MatToolbarModule,
        MatSnackBarModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
