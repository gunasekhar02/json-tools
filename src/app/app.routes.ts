import { Routes } from '@angular/router';
import { FormatterComponent } from './formatter/formatter.component';
import { ComparerComponent } from './comparer/comparer.component';
import { DomViewComponent } from './domview/domview.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { JwtDecoderComponent } from './jwt-decoder/jwt-decoder.component';
import { JsonToCsharpComponent } from './json-to-csharp/json-to-csharp.component';
import { GuidGeneratorComponent } from './guid-generator/guid-generator.component';
import { ExcelToJsonComponent } from './excel-to-json/excel-to-json.component';
import { JsonMergerComponent } from './json-merger/json-merger.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'json-formatter', component: FormatterComponent },
  { path: 'json-compare', component: ComparerComponent },
  { path: 'json-domview', component: DomViewComponent },
  { path: 'about', component: AboutComponent },
  { path: 'home', component: HomeComponent },
  { path: 'excel-to-json', component: ExcelToJsonComponent },
  { path: 'jwt-decoder',component: JwtDecoderComponent},
  { path: 'json-to-csharp', component: JsonToCsharpComponent },
  { path: 'guid-generator', component: GuidGeneratorComponent },
  { path: 'json-merger', component: JsonMergerComponent }
];
