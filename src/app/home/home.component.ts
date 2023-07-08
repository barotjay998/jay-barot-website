import { Component, ElementRef, ViewChild, HostListener, Inject, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataServiceService } from '../services/data-service.service';

interface Dictionary {
  [key: string]: boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  // Declare the variables
  public projectData: any;
  public numRows: number = 0;
  public numProjects: number = 0;
  public isFlying: boolean = false;
  // Tracking the visibility of the divs on the view.
  divVisibility: Dictionary = {
    "aboutTitle": false,
    "aboutInfoRowOne": false,
    "aboutInfoRowTwo": false,
    "aboutInfoRowThree": false,
    "aboutEmailCard": false,
    "aboutPhoneCard": false,
    "aboutChatNow": false,
    "experienceTitle": false,
    "experienceCardLeft": false,
    "experienceCardRight": false,
    "projectsHeading": false,
    "carouselExampleIndicators": false,
    "educationHeading": false,
    "educationCardLeft": false,
    "educationCardRight": false
  };

  constructor(
    private dataService: DataServiceService,
    private route: ActivatedRoute,
    private elementRef: ElementRef,
  ) { }

  ngOnInit() {
    this.loadData();

    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        const target = document.getElementById(fragment);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });

  }

  loadData() {
    this.dataService.getProjectData().subscribe((data) => {
      this.projectData = data;

      // Process the data
      this.processData();
    });
    
  }

  processData() {
    // Get the number of objects in the projectData array
    this.numProjects = Object.keys(this.projectData).length;

    // Get the number of rows needed to display the projects
    this.numRows = this.divideAndCeil(this.numProjects);

    // Divide the projects into rows
    this.projectData = this.chunkArray(this.projectData, 3);
  }

  chunkArray(array: any[], size: number) {
    const chunkedArray = [];

    for (let i = 0; i < array.length; i += size) {
      const chunk = array.slice(i, i + size);
      chunkedArray.push(chunk);
    }
    
    return chunkedArray;
  }

  divideAndCeil(num: number) {
    // We are going to have three projects card per carousel slide
    return Math.ceil(num / 3);
  }

  getRange(num: number): number[] {
    return Array.from({length: num}, (_, index) => index);
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

}
