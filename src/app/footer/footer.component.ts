import { Component } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  public recipientEmail: string = 'barotjay998@yahoo.com'
  public message: string;
  public senderEmail: string;

  constructor() {
    // this.recipientEmail = '';
    this.message = '';
    this.senderEmail = '';
  }

  public sendEmail(): void {
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
  }

}
