import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactMeComponent } from './contact-me/contact-me.component';
import { PageNotFoundComponent} from './page-not-found/page-not-found.component';
import { PublicationsComponent } from './publications/publications.component';
import { ExactivitiesComponent } from './exactivities/exactivities.component';
import { TechSkillsComponent } from './tech-skills/tech-skills.component';

const routes: Routes = [
  { path: '', redirectTo : '/home', pathMatch: 'full' },
  { 
    path: 'home', 
    component : HomeComponent, 
    data: { 
      metaDescription: "Hey there, I'm Jay Barot - your go-to Software Developer! TheBarotCode is a testament to my passion for bringing your ideas to life. With a focus on customer satisfaction, I specialize in software design that truly resonates. Let's connect!",
      title: "Home | Jay Barot - Software Engineer"
    }
  },
  { 
    path: 'contact-me', 
    component : ContactMeComponent,
    data: {
      metaDescription: "Unlock your software goals with a seasoned Software Developer! Reach out to Jay for expertise across web apps, mobile solutions, and enterprise software. Connect now to supercharge your development needs.",
      title: "Contact | Jay Barot - Software Engineer"
    }
  },
  { 
    path: 'publications', 
    component : PublicationsComponent,
    data: {
      metaDescription: "Have a look into Jay Barot's contributions to academia through his technical paper publications. His research interests include web design, software engineering and machine learning",
      title: "Publications | Jay Barot - Software Engineer "
    }
  },
  { 
    path: 'exactivities', 
    component : ExactivitiesComponent,
    data: {
      metaDescription: "Explore the world beyond coding with Jay Barot, a dynamic computer programmer. Dive into his realm of extracurricular engagement, from leading impactful full stack web development workshops to shining as a class representative, exemplifying exceptional leadership and teamwork skills.",
      title: "Extracurricular Activities | Jay Barot - Software Engineer"
    }
  },
  { path: 'techskills', 
    component : TechSkillsComponent,
    data: {
      metaDescription: "Unlocking the Power of Code | Jay Barot - Proficient Software Developer in Java, Python, TypeScript, and More! Specializing in web and mobile app development, Jay leverages top software frameworks like Spring Boot, JAX-RS, Django, and Angular.", 
      title: "Tech Stack | Jay Barot Portfolio: Mastering Java, Python, TypeScript, and More"
    }
  },
  { 
    path: '**', 
    component: PageNotFoundComponent,
    data: {
      metaDescription: "The page you are looking for could not be found. Please try searching for it or returning to the homepage.",
      title: "Page Not Found | TheBarotCode "
    }
  }
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
  TechSkillsComponent
];
