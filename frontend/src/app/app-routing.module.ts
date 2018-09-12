import {NgModule} from '@angular/core';
import {MammalListComponent} from "./mammal-list/mammal-list.component";
import {TreeListComponent} from "./tree-list/tree-list.component";
import {TreeSearchComponent} from "./tree-search/tree-search.component";
import {Route, RouterModule, Routes} from "@angular/router";
import {FlowerSearchComponent} from "./flower-search/flower-search.component";
import {FishListComponent} from "./fish-list/fish-list.component";
import {MammalSearchComponent} from "./mammal-search/mammal-search.component";
import {FlowerListComponent} from "./flower-list/flower-list.component";
import {BirdListComponent} from "./bird-list/bird-list.component";
import {AmphibianSearchComponent} from "./amphibian-search/amphibian-search.component";
import {BirdSearchComponent} from "./bird-search/bird-search.component";
import {ReptileListComponent} from "./reptile-list/reptile-list.component";
import {ReptileSearchComponent} from "./reptile-search/reptile-search.component";
import {FlowerViewComponent} from "./flower-view/flower-view.component";
import {AmphibianListComponent} from "./amphibian-list/amphibian-list.component";
import {FishSearchComponent} from "./fish-search/fish-search.component";
import {AmphibianViewComponent} from "./amphibian-view/amphibian-view.component";
import {BirdViewComponent} from "./bird-view/bird-view.component";
import {FishViewComponent} from "./fish-view/fish-view.component";
import {MammalViewComponent} from "./mammal-view/mammal-view.component";
import {ReptileViewComponent} from "./reptile-view/reptile-view.component";
import {TreeViewComponent} from "./tree-view/tree-view.component";
import {FlowerViewMapComponent} from "./flower-view-map/flower-view-map.component";

const routes: Route[] = [
  {path: 'amphibians', component: AmphibianListComponent},
  {path: 'amphibians/search', component: AmphibianSearchComponent},
  {path: 'amphibians/:id', component: AmphibianViewComponent},
  {path: 'birds', component: BirdListComponent},
  {path: 'birds/search', component: BirdSearchComponent},
  {path: 'birds/:id', component: BirdViewComponent},
  {path: 'fish', component: FishListComponent},
  {path: 'fish/search', component: FishSearchComponent},
  {path: 'fish/:id', component: FishViewComponent},
  {path: 'flowers', component: FlowerListComponent},
  {path: 'flowers/search', component: FlowerSearchComponent},
  {path: 'flowers/:id', component: FlowerViewComponent},
  {path: 'flowers/:id/map', component: FlowerViewMapComponent},
  {path: 'mammals', component: MammalListComponent},
  {path: 'mammals/search', component: MammalSearchComponent},
  {path: 'mammals/:id', component: MammalViewComponent},
  {path: 'reptiles', component: ReptileListComponent},
  {path: 'reptiles/search', component: ReptileSearchComponent},
  {path: 'reptiles/:id', component: ReptileViewComponent},
  {path: 'trees', component: TreeListComponent},
  {path: 'trees/search', component: TreeSearchComponent},
  {path: 'trees/:id', component: TreeViewComponent},
  {path: 'trees/:id/zoom/:zoomType', component: TreeViewComponent}
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'/*, enableTracing: true*/})]
})
export class AppRoutingModule {
}
