import { Component, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
declare const grecaptcha: any; // Declare the global grecaptcha object

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  @ViewChild('contactForm') contactForm: any;
  
  public recipientEmail: string = 'barotjay998@yahoo.com'
  public message: string;
  public senderEmail: string;
  public siteKey: string = environment.recaptcha.siteKey;
  public captchaError: string;

  constructor() {
    // this.recipientEmail = '';
    this.message = '';
    this.senderEmail = '';
    this.captchaError = '';
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
