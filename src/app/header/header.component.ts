import { Component, HostListener} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Platform } from '@angular/cdk/platform';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  isNavbarTransparent = true;
  isTogglerClicked = false;

  constructor(private sanitizer: DomSanitizer, private platform: Platform) { }

  ngOnInit() {
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    if ((scrollPosition > 50) || (this.isTogglerClicked)) {
      this.isNavbarTransparent = false;
    }
    else {
      this.isNavbarTransparent = true;
    }
    
  }

  togglerClicked(): void {
    this.isTogglerClicked = !this.isTogglerClicked;
    
    if (this.isTogglerClicked == true) {
      this.isNavbarTransparent = false;
    }
    else {
      this.isNavbarTransparent = true;
    }
  }

  downloadFile() {

    // window.open('/assets/docs/jaybarotresume.pdf', '_blank');

    const filePath = '/assets/docs/jaybarotresume.pdf'; // Path to the file relative to the 'assets' folder

    // Check if the platform is supported for file downloads
    if (this.platform.isBrowser) {
      // Create a temporary anchor element
      const link = document.createElement('a');
      link.href = filePath;
      link.download = 'jaybarotresume.pdf'; // Specify the desired file name
  
      // Trigger a click event to simulate a download
      link.dispatchEvent(new MouseEvent('click'));
    }

  }

  sanitizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

}
