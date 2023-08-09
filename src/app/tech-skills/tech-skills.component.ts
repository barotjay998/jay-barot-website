import { Component } from '@angular/core';
import { InteractionServiceService } from '../services/interaction-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tech-skills',
  templateUrl: './tech-skills.component.html',
  styleUrls: ['./tech-skills.component.scss']
})
export class TechSkillsComponent {

  public isFlying: boolean = false;

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

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Remove the hash from the URL, so that the browser does not scroll to it on reload
    // hash part is the "fragment".
    history.replaceState({}, document.title, window.location.pathname);
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

  onBackHome() {
    this.router.navigate(['/home']);
  }

  ngOnDestroy(): void {
    // Reset the standard header and footer.
    this.interactionService.changeIsStandardFooter(false);
    this.interactionService.changeIsStandardHeader(false);
  }

}
