import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { MatIconModule, MatToolbarModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { RepositoryListComponent } from './components/repository-list/repository-list.component';
import { RepositoryListItemComponent } from './components/repository-list-item/repository-list-item.component';
import { RepositoryDetailsComponent } from './components/repository-details/repository-details.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        RepositoryListComponent,
        RepositoryListItemComponent,
        RepositoryDetailsComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
        HttpClientModule,
        MatIconModule,
        MatToolbarModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
