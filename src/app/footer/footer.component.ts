import { Component, OnInit } from '@angular/core';
import { InteractionServiceService } from '../services/interaction-service.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  // A standard footer is without the contact me form.
  public isStandardFooter: boolean = false;
  currentYear = new Date().getFullYear();

  constructor(
    private interactionService: InteractionServiceService,

  ) {
  }

  ngOnInit(): void {
    this.interactionService.currentIsStandardFooter.subscribe(
      loaded => {
        this.isStandardFooter = loaded;
      }
    );

  }

  sendEmail(email: string) {
    window.location.href = `mailto:${email}`;
  }

  callPhoneNumber() {
    window.location.href = `tel:+16157790420`;
  }

}
