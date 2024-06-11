import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataServiceService } from '../services/data-service.service';
import { InteractionServiceService } from '../services/interaction-service.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent {

  public feedData: any;

  constructor(
    private dataService: DataServiceService,
    private interactionService: InteractionServiceService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    // We need standard header and footer for this page.
    this.interactionService.changeIsStandardFooter(true);
    this.interactionService.changeIsStandardHeader(true);
    this.scrollToTop();
    this.loadData();
  }


  loadData() {
    this.dataService.getFeedData().subscribe((data) => {
      this.feedData = data;
      console.log(this.feedData);
    });
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Remove the hash from the URL, so that the browser does not scroll to it on reload
    // hash part is the "fragment".
    history.replaceState({}, document.title, window.location.pathname);
  }

  onBackHome() {
    this.router.navigate(['/home']);
  }

  ngOnDestroy(): void {
    // Reset the standard header and footer.
    this.interactionService.changeIsStandardFooter(false);
    this.interactionService.changeIsStandardHeader(false);
  }

}
