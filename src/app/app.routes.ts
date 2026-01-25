import { Routes } from '@angular/router';
import { FormatterComponent } from './formatter/formatter.component';
import { ComparerComponent } from './comparer/comparer.component';
import { DomViewComponent } from './domview/domview.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: 'json-formatter', pathMatch: 'full' },
  { path: 'json-formatter', component: FormatterComponent },
  { path: 'json-compare', component: ComparerComponent },
  { path: 'json-domview', component: DomViewComponent },
  { path: 'about', component: AboutComponent },
  { path: 'home', component: HomeComponent }, 

];