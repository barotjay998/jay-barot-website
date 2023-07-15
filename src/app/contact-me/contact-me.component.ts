import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { InteractionServiceService } from '../services/interaction-service.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
declare const grecaptcha: any; // Declare the global grecaptcha object

@Component({
  selector: 'app-contact-me',
  templateUrl: './contact-me.component.html',
  styleUrls: ['./contact-me.component.scss']
})
export class ContactMeComponent implements OnInit {

  @ViewChild('contactForm') contactForm: any;
  
  public recipientEmail: string = 'barotjay998@yahoo.com'
  public message: string;
  public senderEmail: string;
  public siteKey: string = environment.recaptcha.siteKey;
  public captchaError: string;


  constructor(
    private interactionService: InteractionServiceService,
    private router: Router
    ) {
      this.message = '';
      this.senderEmail = '';
      this.captchaError = '';
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

  // Contact From Submit
  public sendEmail(): void {

    const captchaResponse = grecaptcha.getResponse();
    if (!captchaResponse) {
      // Handle case when reCAPTCHA response is not available
      // Display an error message or take appropriate action
      this.captchaError = 'Please verify the reCAPTCHA.';
      return;
    }

    emailjs.send('service_p7hgqfe', 'template_g42gv1f', {
      to_name: 'Jay Barot',
      to_email: this.recipientEmail,
      message: this.message,
      sender_email: this.senderEmail
    }, 'kgADkdTn3yQLJM4Zp')
      .then((response: EmailJSResponseStatus) => {
        // console.log('Email sent successfully:', response);
      }, (error) => {
        // console.error('Error sending email:', error);
      });

    // this.recipientEmail = '';
    this.message = '';
    this.senderEmail = '';
    this.captchaError = '';
    this.contactForm.reset();
  }

}
