import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import { InteractionServiceService } from '../services/interaction-service.service';
import { RecaptchaService } from '../services/recaptcha.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  
  siteKey: string = '';
  public recipientEmail: string = 'barotjay998@yahoo.com'
  captchaResolved: boolean = false;

  // A standard footer is without the contact me form.
  public isStandardFooter: boolean = false;

  constructor(
    private interactionService: InteractionServiceService,
    private recaptchaService: RecaptchaService,
    private formBuilder: FormBuilder

  ) {
    // Set the site key for the reCAPTCHA.
    const selectedOption = 1;
    this.siteKey = this.recaptchaService.getSiteKey(selectedOption);
  }

  // Build the footer contact form.
  footerContactForm = this.formBuilder.group({
    message: ["Hi Jay! I'd love to learn more about your software development services. Can we schedule a time to chat ?", Validators.required],
    senderEmail: ['', [Validators.required, Validators.email]],
    captchaResponse: ['', Validators.required],
  });

  onCaptchaResolved(response: string) {
    this.captchaResolved = true;
    this.footerContactForm.patchValue({ captchaResponse: response });
  }

  isCaptchaInvalid() {
    const captchaControl = this.footerContactForm.get('captchaResponse');
    return captchaControl?.invalid && this.captchaResolved;
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

    if (this.footerContactForm.valid && this.captchaResolved) {
      // Form submission logic here
      emailjs.send('service_p7hgqfe', 'template_g42gv1f', {
        to_name: 'Jay Barot',
        to_email: this.recipientEmail,
        message: this.footerContactForm.value.message,
        sender_email: this.footerContactForm.value.senderEmail
      }, 'kgADkdTn3yQLJM4Zp')
      .then((response: EmailJSResponseStatus) => {

        // console.log('Email sent successfully:', response);

        // Success Message
        this.alertConfirmation();

        // Reset the form and clear form controls
        this.footerContactForm.reset();
        this.captchaResolved = false;

      }, (error) => {
        // console.error('Error sending email:', error);
      });
    }
  }

  // SweetAlert2 Success Message
  alertConfirmation() {
    Swal.fire({
      title: 'Message sent!',
      text: 'Jay shall be in touch shortly..',
      icon: 'success',
      showConfirmButton: false,
      timer: 2000,
      position: 'top-end',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    });
  }

}
