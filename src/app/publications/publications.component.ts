import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataServiceService } from '../services/data-service.service';
import { InteractionServiceService } from '../services/interaction-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.scss']
})
export class PublicationsComponent implements OnInit {

  // Declare the variables
  public publicationData: any;
  isHoverViewBtn: boolean = false;

  constructor(
    private interactionService: InteractionServiceService,
    private dataService: DataServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // We need standard header and footer for this page.
    this.interactionService.changeIsStandardFooter(true);
    this.interactionService.changeIsStandardHeader(true);
    this.scrollToTop();
    this.loadData();
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Remove the hash from the URL, so that the browser does not scroll to it on reload
    // hash part is the "fragment".
    history.replaceState({}, document.title, window.location.pathname);
  }

  loadData() {
    this.dataService.getPublicationsData().subscribe((data) => {
      this.publicationData = data;
    });
  }

  ngOnDestroy(): void {
    // Reset the standard header and footer.
    this.interactionService.changeIsStandardFooter(false);
    this.interactionService.changeIsStandardHeader(false);
  }

  onViewPublication(publication: any) {
    window.open(publication.links, '_blank');
  }

  onViewCertificate(publication: any) {
    window.open(publication.certificate, '_blank');
  }

  onBackHome() {
    this.router.navigate(['/home']);
  }

}
