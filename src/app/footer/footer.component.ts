import { Component, ViewChild, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import { InteractionServiceService } from '../services/interaction-service.service';
declare const grecaptcha: any; // Declare the global grecaptcha object

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  @ViewChild('contactForm') contactForm: any;
  
  public recipientEmail: string = 'barotjay998@yahoo.com'
  public message: string;
  public senderEmail: string;
  public siteKey: string = environment.recaptcha.siteKey;
  public captchaError: string;

  // A standard footer is without the contact me form.
  public isStandardFooter: boolean = false;

  constructor(
    private interactionService: InteractionServiceService
  ) {
    // this.recipientEmail = '';
    this.message = '';
    this.senderEmail = '';
    this.captchaError = '';
  }

  ngOnInit(): void {
    this.interactionService.currentIsStandardFooter.subscribe(
      loaded => {
        this.isStandardFooter = loaded;
      }
    );
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
