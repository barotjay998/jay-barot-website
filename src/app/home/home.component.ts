import { Component, ElementRef, HostListener, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataServiceService } from '../services/data-service.service';
import { MetaService } from '../services/meta.service';

declare var $: any;

interface Dictionary {
  [key: string]: boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('carouselIndicators', { static: false }) carousel!: ElementRef;

  // Declare the variables
  public projectData: any;
  public numRows: number = 0;
  public numProjects: number = 0;
  public isFlying: boolean = false;
  public maxProjectsOnSlide: number = 0;
  paginatedProjects: any[][] = [];
  projectsPerSlide = 3;

  // Tracking the visibility of the divs on the view.
  divVisibility: Dictionary = {
    "aboutTitle": false,
    "aboutInfoRowOne": false,
    "aboutInfoRowTwo": false,
    "aboutInfoRowThree": false,
    "aboutEmailCard": false,
    "aboutPhoneCard": false,
    "experienceTitle": false,
    "experienceCardLeft": false,
    "experienceCardRight": false,
    "projectsHeading": false,
    "carouselIndicators": false,
    "educationHeading": false,
    "educationCardLeft": false,
    "educationCardRight": false
  };

  constructor(
    private dataService: DataServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private elementRef: ElementRef,
    private metaService: MetaService
  ) { }

  async ngOnInit() {
    await this.loadData();

    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        const target = document.getElementById(fragment);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
    
    this.calculateProjectsPerSlide();

  }

  ngAfterViewInit() {
    $('#carouselIndicators').carousel({ interval: false }); // Disable auto-slide
    this.enableSwipe();
  }

  async loadData() {
    this.projectData = await this.dataService.getProjectData().toPromise();
  }


  getRange(num: number): number[] {
    return Array.from({length: num}, (_, index) => index);
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Remove the hash from the URL, so that the browser does not scroll to it on reload
    // hash part is the "fragment".
    history.replaceState({}, document.title, window.location.pathname);
  }

  scrollToFooter(event: Event) {
    event.preventDefault();
    const footerElement = this.elementRef.nativeElement.ownerDocument.querySelector('app-footer');
    footerElement.scrollIntoView({ behavior: 'smooth' });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    this.checkVisibility();
  }

  @HostListener('window:resize')
  calculateProjectsPerSlide() {
    const width = window.innerWidth;
    this.projectsPerSlide = width > 1250 ? 4 : width > 992 ? 3 : width > 768 ? 2 : width > 576 ? 1 : 1;
    this.paginateProjects();
  }

  paginateProjects() {
    // Convert the object to an array of values (projects)
    const projectsArray = Object.values(this.projectData);
  
    this.paginatedProjects = [];
    
    // Apply pagination logic on the array of projects
    for (let i = 0; i < projectsArray.length; i += this.projectsPerSlide) {
      this.paginatedProjects.push(projectsArray.slice(i, i + this.projectsPerSlide));
    }
  
    // Calculate the maximum number of projects on a slide
    this.maxProjectsOnSlide = Math.max(...this.paginatedProjects.map(page => page.length));
  }

  nextSlide() {
    $('#carouselIndicators').carousel('next');
  }

  prevSlide() {
    $('#carouselIndicators').carousel('prev');
  }

  enableSwipe() {
    const carousel = document.getElementById('carouselIndicators');
    
    if (!carousel) return; // Ensure carousel exists

    let touchstartX = 0;
    let touchendX = 0;

    carousel.addEventListener('touchstart', (event: TouchEvent) => {
      touchstartX = event.touches[0].clientX; // Store starting touch position
    });

    carousel.addEventListener('touchmove', (event: TouchEvent) => {
      touchendX = event.touches[0].clientX; // Store moving touch position
    });

    carousel.addEventListener('touchend', () => {
      if (touchstartX - touchendX > 50) {
        $('#carouselIndicators').carousel('next'); // Move to next slide
      } else if (touchstartX - touchendX < -50) {
        $('#carouselIndicators').carousel('prev'); // Move to previous slide
      }
    });
  }

  checkVisibility() {
    for (const divId in this.divVisibility) {
      const element = this.elementRef.nativeElement.querySelector(`#${divId}`);

      if (this.isElementInViewport(element)) {
        this.divVisibility[divId] = true;
      } 
      
      // If the element is not in the viewport, set the visibility to false
      // Once the animation class is added we do not want to remove it, so temporarily
      // we comment out the else statement. If you want to have the animation run every time
      // the element is in the viewport, uncomment the else statement.
      // 
      // else {
      //   this.divVisibility[divId] = false;
      // }

    }
  }

  isElementInViewport(element: HTMLElement) {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const windowWidth = window.innerWidth || document.documentElement.clientWidth;
    
    // Return True when full element is in viewport:: when all the edges of the div box is in viewport
    // return (
    //   rect.top >= 0 &&
    //   rect.left >= 0 &&
    //   rect.bottom <= windowHeight &&
    //   rect.right <= windowWidth
    // );
    
    // Return True on first sight of the element:: when the top edges of the div box is in viewport
    // return (
    //   (rect.top >= 0 && rect.top <= windowHeight) ||  // Check if top edge is in viewport
    //   (rect.left >= 0 && rect.left <= windowWidth)    // Check if left edge is in viewport
    // );

    // In this updated code, topInView checks if the top position of the element is between 0 and the window height,
    // and leftInView checks if the left position of the element is between 0 and the window width. 
    // Both conditions need to be true for the function to return true, indicating that the first few pixels 
    // of the element are in the viewport.
    const topInView = rect.top >= 0 && rect.top <= windowHeight;
    const leftInView = rect.left >= 0 && rect.left <= windowWidth;
  
    return topInView && leftInView;
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

  openLink(linkUri: string) {
    window.open(linkUri, '_blank');
  }

  onInternalLink(linkUri: string) {
    this.router.navigate([linkUri]);
  }

  sendEmail(email: string) {
    window.location.href = `mailto:${email}`;
  }

  callPhoneNumber() {
    window.location.href = `tel:+16157790420`;
  }

}
