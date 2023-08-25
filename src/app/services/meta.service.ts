import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MetaService {

  constructor(
    private titleService: Title,
    private metaTagService: Meta,
    private router: Router,
    private route: ActivatedRoute
  ) { 

    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(() => {
      const routeData = this.findRouteData(this.route.root);
      const metaDescription = routeData?.metaDescription || "Hey there, I'm Jay Barot - your go-to Software Developer! TheBarotCode is a testament to my passion for bringing your ideas to life. With a focus on customer satisfaction, I specialize in software design that truly resonates. Let's connect!";
      const title = routeData?.title || 'Jay Barot - Software Developer';
      
      this.titleService.setTitle(title);
      this.updateMetaTag(metaDescription);
    });

  }

  private findRouteData(route: ActivatedRoute): any {
    if (route.firstChild) {
      return this.findRouteData(route.firstChild);
    } else {
      return route.snapshot.data;
    }
  }

  private updateMetaTag(description: string): void {
    this.metaTagService.updateTag({ name: 'description', content: description });
  }

}
