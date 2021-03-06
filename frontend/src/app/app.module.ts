import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {ApiService} from './services/api.service';
import {BirdListComponent} from './bird-list/bird-list.component';
import {OrganismListComponent} from "./organism-list/organism-list.component";
import {OrganismRowComponent} from './organism-row/organism-row.component';
import {OrganismHeadingComponent} from "./organism-heading/organism-heading.component";
import {OrganismSearchComponent} from "./organism-search/organism-search.component";
import {FlowerListComponent} from "./flower-list/flower-list.component";
import {FishListComponent} from "./fish-list/fish-list.component";
import {AmphibianListComponent} from "./amphibian-list/amphibian-list.component";
import {MammalListComponent} from "./mammal-list/mammal-list.component";
import {ReptileListComponent} from "./reptile-list/reptile-list.component";
import {TreeListComponent} from "./tree-list/tree-list.component";
import {AppRoutingModule} from './app-routing.module';
import {SharingService} from "./services/sharing.service";
import {OrganismNavigationComponent} from './organism-navigation/organism-navigation.component';
import {TreeViewComponent} from "./tree-view/tree-view.component";
import {CSVService} from "./services/csv.service";
import {ScrollIntoViewDirective} from './directives/scroll-into-view.directive';
import {LoginComponent} from "./login/login.component";
import {AuthService} from "./services/auth.service";
import {OrganismDetailComponent} from './organism-detail/organism-detail.component';
import {OrganismViewComponent} from './organism-view/organism-view.component';
import {InsectListComponent} from './insect-list/insect-list.component';
import {OrganismViewMapComponent} from "./organism-view-map/organism-view-map.component";
import {MediaWatchDirective} from './directives/media-watch.directive';
import {MatchingGameComponent} from './matching-game/matching-game.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ImagePreloadDirective} from './directives/image-preload.directive';
import {AutofocusDirective} from './directives/autofocus.directive';

@NgModule({
  declarations: [
    LoginComponent,
    AppComponent,
    OrganismSearchComponent,
    OrganismListComponent,
    OrganismRowComponent,
    OrganismHeadingComponent,
    AmphibianListComponent,
    BirdListComponent,
    FishListComponent,
    FlowerListComponent,
    MammalListComponent,
    ReptileListComponent,
    TreeListComponent,
    TreeViewComponent,
    OrganismNavigationComponent,
    OrganismViewMapComponent,
    ScrollIntoViewDirective,
    OrganismDetailComponent,
    OrganismViewComponent,
    InsectListComponent,
    MediaWatchDirective,
    MatchingGameComponent,
    ImagePreloadDirective,
    AutofocusDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [AuthService, ApiService, SharingService, CSVService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
