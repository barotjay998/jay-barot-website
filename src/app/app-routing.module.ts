import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactMeComponent } from './contact-me/contact-me.component';
import { PageNotFoundComponent} from './page-not-found/page-not-found.component';
import { PublicationsComponent } from './publications/publications.component';
import { ExactivitiesComponent } from './exactivities/exactivities.component';
import { TechSkillsComponent } from './tech-skills/tech-skills.component';
import { SoftSkillsComponent } from './soft-skills/soft-skills.component'

const routes: Routes = [
  { path: '', redirectTo : '/home', pathMatch: 'full' },
  { path: 'home', component : HomeComponent },
  { path: 'contact-me', component : ContactMeComponent },
  { path: 'publications', component : PublicationsComponent },
  { path: 'exactivities', component : ExactivitiesComponent },
  { path: 'techskills', component : TechSkillsComponent },
  { path: 'softskills', component : SoftSkillsComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [
  HomeComponent, 
  PageNotFoundComponent,
  ContactMeComponent,
  PublicationsComponent,
  ExactivitiesComponent,
  TechSkillsComponent,
  SoftSkillsComponent
];
