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
    this.loadData();
  }

  loadData() {
    this.dataService.getPublicationsData().subscribe((data) => {
      this.publicationData = data;
      console.log(this.publicationData);
    });
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
