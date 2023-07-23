import { Component } from '@angular/core';
import { InteractionServiceService } from '../services/interaction-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exactivities',
  templateUrl: './exactivities.component.html',
  styleUrls: ['./exactivities.component.scss']
})
export class ExactivitiesComponent {

  constructor(
    private interactionService: InteractionServiceService,
    private router: Router
    ) {
  }

  ngOnInit(): void {
    // We need standard header and footer for this page.
    this.interactionService.changeIsStandardFooter(true);
    this.interactionService.changeIsStandardHeader(true);
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
