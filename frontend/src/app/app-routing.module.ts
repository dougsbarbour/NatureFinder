import {NgModule} from '@angular/core';
import {MammalListComponent} from "./mammal-list/mammal-list.component";
import {TreeListComponent} from "./tree-list/tree-list.component";
import {TreeSearchComponent} from "./tree-search/tree-search.component";
import {Route, RouterModule, Routes} from "@angular/router";
import {FishListComponent} from "./fish-list/fish-list.component";
import {FlowerListComponent} from "./flower-list/flower-list.component";
import {BirdListComponent} from "./bird-list/bird-list.component";
import {BirdSearchComponent} from "./bird-search/bird-search.component";
import {ReptileListComponent} from "./reptile-list/reptile-list.component";
import {AmphibianListComponent} from "./amphibian-list/amphibian-list.component";
import {FishSearchComponent} from "./fish-search/fish-search.component";
import {TreeViewComponent} from "./tree-view/tree-view.component";
import {LoginComponent} from "./login/login.component";
import {OrganismViewComponent} from "./organism-view/organism-view.component";
import {Amphibian} from "./models/amphibian";
import {Bird} from "./models/bird";
import {Fish} from "./models/fish";
import {Flower} from "./models/flower";
import {Mammal} from "./models/mammal";
import {Reptile} from "./models/reptile";
import {Insect} from "./models/insect";
import {InsectListComponent} from "./insect-list/insect-list.component";
import {OrganismSearchComponent} from "./organism-search/organism-search.component";
import {OrganismViewMapComponent} from "./organism-view-map/organism-view-map.component";
import {Tree} from "./models/tree";

const routes: Route[] = [
  {path: 'login', component: LoginComponent},
  {path: 'amphibians', component: AmphibianListComponent},
  {path: 'amphibians/search', component: OrganismSearchComponent, data: {modelName: 'amphibian'}},
  {path: 'amphibians/:id', component: OrganismViewComponent, data: {domainClass: Amphibian}},
  {path: 'amphibians/:id/map', component: OrganismViewMapComponent, data: {domainClass: Amphibian}},
  {path: 'birds', component: BirdListComponent},
  {path: 'birds/search', component: BirdSearchComponent},
  {path: 'birds/:id', component: OrganismViewComponent, data: {domainClass: Bird}},
  {path: 'birds/:id/map', component: OrganismViewMapComponent, data: {domainClass: Bird}},
  {path: 'fish', component: FishListComponent},
  {path: 'fish/search', component: FishSearchComponent},
  {path: 'fish/:id', component: OrganismViewComponent, data: {domainClass: Fish}},
  {path: 'fish/:id/map', component: OrganismViewMapComponent, data: {domainClass: Fish}},
  {path: 'flowers', component: FlowerListComponent},
  {path: 'flowers/search', component: OrganismSearchComponent, data: {modelName: 'flower'}},
  {path: 'flowers/:id', component: OrganismViewComponent, data: {domainClass: Flower}},
  {path: 'flowers/:id/map', component: OrganismViewMapComponent, data: {domainClass: Flower}},
  {path: 'insects', component: InsectListComponent},
  {path: 'insects/search', component: OrganismSearchComponent, data: {modelName: 'insect'}},
  {path: 'insects/:id', component: OrganismViewComponent, data: {domainClass: Insect}},
  {path: 'insects/:id/map', component: OrganismViewMapComponent, data: {domainClass: Insect}},
  {path: 'mammals', component: MammalListComponent},
  {path: 'mammals/search', component: OrganismSearchComponent, data: {modelName: 'mammal'}},
  {path: 'mammals/:id', component: OrganismViewComponent, data: {domainClass: Mammal}},
  {path: 'mammals/:id/map', component: OrganismViewMapComponent, data: {domainClass: Mammal}},
  {path: 'reptiles', component: ReptileListComponent},
  {path: 'reptiles/search', component: OrganismSearchComponent, data: {modelName: 'reptile'}},
  {path: 'reptiles/:id', component: OrganismViewComponent, data: {domainClass: Reptile}},
  {path: 'reptiles/:id/map', component: OrganismViewMapComponent, data: {domainClass: Reptile}},
  {path: 'trees', component: TreeListComponent},
  {path: 'trees/search', component: TreeSearchComponent},
  {path: 'trees/:id', component: TreeViewComponent},
  {path: 'trees/:id/map', component: OrganismViewMapComponent, data: {domainClass: Tree}},
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'/*, enableTracing: true*/})]
})
export class AppRoutingModule {
}
