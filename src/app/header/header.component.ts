import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  isNavbarTransparent = true;

  @HostListener('window:scroll')
  onWindowScroll() {
    this.isNavbarTransparent = (window.pageYOffset <= 50);
  }

  ngOnInit() {
  }

}
