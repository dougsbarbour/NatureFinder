import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {ApiService} from './services/api.service';
import {BirdListComponent} from './bird-list/bird-list.component';
import {BirdSearchComponent} from './bird-search/bird-search.component';
import {BirdViewComponent} from "./bird-view/bird-view.component";
import {OrganismListComponent} from "./organism-list/organism-list.component";
import {OrganismRowComponent} from './organism-row/organism-row.component';
import {OrganismHeadingComponent} from "./organism-heading/organism-heading.component";
import {OrganismSearchComponent} from "./organism-search/organism-search.component";
import {FlowerSearchComponent} from "./flower-search/flower-search.component";
import {FlowerViewComponent} from './flower-view/flower-view.component';
import {FlowerListComponent} from "./flower-list/flower-list.component";
import {FishListComponent} from "./fish-list/fish-list.component";
import {AmphibianListComponent} from "./amphibian-list/amphibian-list.component";
import {MammalListComponent} from "./mammal-list/mammal-list.component";
import {ReptileListComponent} from "./reptile-list/reptile-list.component";
import {TreeListComponent} from "./tree-list/tree-list.component";
import {AmphibianSearchComponent} from "./amphibian-search/amphibian-search.component";
import {FishSearchComponent} from "./fish-search/fish-search.component";
import {MammalSearchComponent} from "./mammal-search/mammal-search.component";
import {ReptileSearchComponent} from "./reptile-search/reptile-search.component";
import {TreeSearchComponent} from "./tree-search/tree-search.component";
import {AppRoutingModule} from './app-routing.module';
import {SharingService} from "./services/sharing.service";
import {OrganismNavigationComponent} from './organism-navigation/organism-navigation.component';
import {AmphibianViewComponent} from "./amphibian-view/amphibian-view.component";
import {FishViewComponent} from "./fish-view/fish-view.component";
import {MammalViewComponent} from "./mammal-view/mammal-view.component";
import {ReptileViewComponent} from "./reptile-view/reptile-view.component";
import {TreeViewComponent} from "./tree-view/tree-view.component";
import {FlowerViewMapComponent} from './flower-view-map/flower-view-map.component';
import {CSVService} from "./services/csv.service";
import { ScrollIntoViewDirective } from './directives/scroll-into-view.directive';

@NgModule({
  declarations: [
    AppComponent,
    OrganismSearchComponent,
    OrganismListComponent,
    OrganismRowComponent,
    OrganismHeadingComponent,
    AmphibianListComponent,
    AmphibianSearchComponent,
    AmphibianViewComponent,
    BirdSearchComponent,
    BirdListComponent,
    BirdViewComponent,
    FishListComponent,
    FishSearchComponent,
    FishViewComponent,
    FlowerSearchComponent,
    FlowerListComponent,
    FlowerViewComponent,
    MammalSearchComponent,
    MammalListComponent,
    MammalViewComponent,
    ReptileSearchComponent,
    ReptileListComponent,
    ReptileViewComponent,
    TreeSearchComponent,
    TreeListComponent,
    TreeViewComponent,
    OrganismNavigationComponent,
    FlowerViewMapComponent,
    ScrollIntoViewDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [ApiService, SharingService, CSVService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
