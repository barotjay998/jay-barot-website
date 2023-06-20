import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  isNavbarTransparent = true;
  isTogglerClicked = false;

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

  ngOnInit() {
  }

}
