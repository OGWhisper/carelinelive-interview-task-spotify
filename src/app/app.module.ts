import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlaylistAnalysisComponent } from './components/playlist-analysis/playlist-analysis.component';
import { TrackCardComponent } from './components/track-card/track-card.component';
import { SearchPlaylistElementComponent } from './components/search-playlist-element/search-playlist-element.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
    declarations: [
        AppComponent,
        TrackCardComponent,
        PlaylistAnalysisComponent,
        SearchPlaylistElementComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatCardModule,
        FormsModule,
        ReactiveFormsModule,
        NgxChartsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
