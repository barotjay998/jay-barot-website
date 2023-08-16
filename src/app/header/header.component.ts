import { Component, HostListener} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Platform } from '@angular/cdk/platform';
import { InteractionServiceService } from '../services/interaction-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  isNavbarTransparent = true;
  isTogglerClicked = false;
  // A standard header is without the contact me form.
  public isStandardHeader: boolean = false;

  constructor(
    private sanitizer: DomSanitizer, 
    private platform: Platform,
    private interactionService: InteractionServiceService
  ) { }

  ngOnInit() {
    this.interactionService.currentIsStandardFooter.subscribe(
      loaded => {
        this.isStandardHeader = loaded;

        // Make a standard header, which is by default non-transparent.
        if (this.isStandardHeader == true) {
          this.isNavbarTransparent = false;
        }
        else {
          this.isNavbarTransparent = true;
        }
      }
    );
  }

  // Make the navbar non-transparent when the user scrolls down.
  @HostListener('window:scroll')
  onWindowScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    // Check if the header is not a standard header.
    if (this.isStandardHeader != true) {
      if ((scrollPosition > 50) || (this.isTogglerClicked)) {
        this.isNavbarTransparent = false;
      } 
      else {
        this.isNavbarTransparent = true;
      }
    }
    
  }

  // Make the navbar non-transparent when the user clicks the toggler.
  togglerClicked(): void {
    // Check if the header is not a standard header.
    if (this.isStandardHeader != true) {
      this.isTogglerClicked = !this.isTogglerClicked;
    
      if (this.isTogglerClicked == true) {
        this.isNavbarTransparent = false;
      }
      else {
        this.isNavbarTransparent = true;
      }
    }
  }

  downloadFile() {

    // window.open('/assets/docs/jaybarotresume.pdf', '_blank');

    const filePath = '/assets/docs/Jay-Barot-Software-Developer-Resume.pdf'; // Path to the file relative to the 'assets' folder

    // Check if the platform is supported for file downloads
    if (this.platform.isBrowser) {
      // Create a temporary anchor element
      const link = document.createElement('a');
      link.href = filePath;
      link.download = 'Jay-Barot-Software-Developer-Resume.pdf'; // Specify the desired file name
  
      // Trigger a click event to simulate a download
      link.dispatchEvent(new MouseEvent('click'));
    }

  }

  sanitizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

}
