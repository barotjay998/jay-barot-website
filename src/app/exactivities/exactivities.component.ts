import { Component, HostListener, ElementRef } from '@angular/core';
import { InteractionServiceService } from '../services/interaction-service.service';
import { Router } from '@angular/router';

interface Dictionary {
  [key: string]: boolean;
}

@Component({
  selector: 'app-exactivities',
  templateUrl: './exactivities.component.html',
  styleUrls: ['./exactivities.component.scss']
})
export class ExactivitiesComponent {

  public isFlying: boolean = false;
  // Tracking the visibility of the divs on the view.
  divVisibility: Dictionary = {
    "wkp2_left": false,
    "wkp2_right": false,
    "sk1": false,
    "wkp3_left": false,
    "wkp3_right": false,
    "csx_left": false,
    "csx_right": false,
    "sk2": false,
    "cr": false,
    "sk3": false,
    "exact-top-btn": false,
  };

  constructor(
    private interactionService: InteractionServiceService,
    private router: Router,
    private elementRef: ElementRef,
    ) {
  }

  ngOnInit(): void {
    // We need standard header and footer for this page.
    this.interactionService.changeIsStandardFooter(true);
    this.interactionService.changeIsStandardHeader(true);
  }


  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    this.checkVisibility();
  }

  checkVisibility() {
    for (const divId in this.divVisibility) {
      const element = this.elementRef.nativeElement.querySelector(`#${divId}`);

      if (this.isElementInViewport(element)) {
        this.divVisibility[divId] = true;
      } 

    }
  }

  isElementInViewport(element: HTMLElement) {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const windowWidth = window.innerWidth || document.documentElement.clientWidth;
  
    const topInView = rect.top >= 0 && rect.top <= windowHeight;
    const leftInView = rect.left >= 0 && rect.left <= windowWidth;
  
    return topInView && leftInView;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Remove the hash from the URL, so that the browser does not scroll to it on reload
    // hash part is the "fragment".
    history.replaceState({}, document.title, window.location.pathname);
  }

  makeMeFly() {
    this.isFlying = true;

    setTimeout(() => {
      this.isFlying = false;
    }, 1000);

    setTimeout(() => {
      this.scrollToTop();
    }, 400);

  }

  ngOnDestroy(): void {
    // Reset the standard header and footer.
    this.interactionService.changeIsStandardFooter(false);
    this.interactionService.changeIsStandardHeader(false);
  }

  onBackHome() {
    this.router.navigate(['/home']);
  }

}
