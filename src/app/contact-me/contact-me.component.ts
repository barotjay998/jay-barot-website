import { Component, OnInit, OnDestroy } from '@angular/core';
import { InteractionServiceService } from '../services/interaction-service.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { RecaptchaService } from '../services/recaptcha.service';
import { MetaService } from '../services/meta.service';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import Swal from 'sweetalert2';

@Component({
  selector: 'contact-me',
  templateUrl: './contact-me.component.html',
  styleUrls: ['./contact-me.component.scss']
})
export class ContactMeComponent implements OnInit {
  
  siteKey: string = '';
  public recipientEmail: string = 'barotjay998@yahoo.com'
  captchaResolved: boolean = false;

  constructor(
    private interactionService: InteractionServiceService,
    private recaptchaService: RecaptchaService,
    private formBuilder: FormBuilder,
    private router: Router,
    private metaService: MetaService
    ) {
    // Set the site key for the reCAPTCHA.
    const selectedOption = 2;
    this.siteKey = this.recaptchaService.getSiteKey(selectedOption);
  }

  // Build the footer contact form.
  contactMePageContactForm = this.formBuilder.group({
    message: ["Start typing your message! (e.g., Project Inquiry, General Question, Just Saying Hi)", Validators.required],
    senderEmail: ['', [Validators.required, Validators.email]],
    captchaResponse: ['', Validators.required],
  });

  onCaptchaResolved(response: string) {
    this.captchaResolved = true;
    this.contactMePageContactForm.patchValue({ captchaResponse: response });
  }

  isCaptchaInvalid() {
    const captchaControl = this.contactMePageContactForm.get('captchaResponse');
    return captchaControl?.invalid && this.captchaResolved;
  }

  ngOnInit(): void {
    // We need standard header and footer for this page.
    this.interactionService.changeIsStandardFooter(true);
    this.interactionService.changeIsStandardHeader(true);
    this.scrollToTop();
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Remove the hash from the URL, so that the browser does not scroll to it on reload
    // hash part is the "fragment".
    history.replaceState({}, document.title, window.location.pathname);
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
    if (this.contactMePageContactForm.valid && this.captchaResolved) {
      // Form submission logic here
      emailjs.send('service_p7hgqfe', 'template_g42gv1f', {
        to_name: 'Jay Barot',
        from_name: this.recipientEmail,
        message: this.contactMePageContactForm.value.message,
        sender_email: this.contactMePageContactForm.value.senderEmail
      }, 'kgADkdTn3yQLJM4Zp')
      .then((response: EmailJSResponseStatus) => {

        // console.log('Email sent successfully:', response);

        // Success Message
        this.alertConfirmation();
        
        // Reset the form and clear form controls
        this.contactMePageContactForm.reset();
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