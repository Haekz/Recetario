import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, AnimationController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {

  formularioRegistro: FormGroup;
  hidePassword = true; // Controla la visibilidad de la contraseña
  hideConfirmPassword = true; // Controla la visibilidad de la confirmación de contraseña
  presentingElement: Element | null = null;
  canDismiss = false;
  loading = false;

  constructor (
    public fb: FormBuilder, 
    public alertController: AlertController, 
    public navCtr: NavController, 
    public animationCtrl: AnimationController,
    public router: Router
  ) {

    // Inicialización del formulario con validaciones
    this.formularioRegistro = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, passwordFormatValidator()]],
      confirmPassword: ['', Validators.required]
    }, { validator: passwordMatchValidator('password', 'confirmPassword') });
  }

  ngOnInit() {
    this.formularioRegistro.reset(); // Resetea el formulario al inicializar
    this.presentingElement = document.querySelector('.ion-page');
  }

  async guardar() {
    let f = this.formularioRegistro.value;

    if (this.formularioRegistro.invalid) {

      // Muestra alerta si el formulario es inválido
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Favor de Seguir los Requisitos.',
        buttons: ['Aceptar'],
      });

      await alert.present();
      return;
    }

    const usuario = {
      nombre: f.nombre,
      contraseña: f.password,
    };
    
    // Guardar usuario en localStorage y navegar al login
    this.loading = true; // Mostrar barra de progreso
    setTimeout(() => {
      this.loading = false; // Ocultar barra de progreso después de cargar
      //localStorage.setItem('usuario', JSON.stringify(usuario));
      //localStorage.setItem('ingresado', 'true');
      this.navCtr.navigateForward('/login'); // Navegar a la página de registro
    }, 1000);
    
  }

  // Cambiar visibilidad de la contraseña
  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  // Cambiar visibilidad de la confirmación de contraseña
  toggleConfirmPasswordVisibility() {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }

  // Animación de entrada personalizada para el modal
  enterAnimation = (baseEl: HTMLElement) => {
    const root = baseEl.shadowRoot;
  
    if (!root) {
      return this.animationCtrl.create(); // Devuelve una animación vacía si root es null
    }
  
    const backdropElement = root.querySelector('ion-backdrop');
    const wrapperElement = root.querySelector('.modal-wrapper');
  
    if (!backdropElement || !wrapperElement) {
      return this.animationCtrl.create(); // Devuelve una animación vacía si los elementos no están presentes
    }
  
    const backdropAnimation = this.animationCtrl
      .create()
      .addElement(backdropElement)
      .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');
  
    const wrapperAnimation = this.animationCtrl
      .create()
      .addElement(wrapperElement)
      .keyframes([
        { offset: 0, opacity: '0', transform: 'scale(0)' },
        { offset: 1, opacity: '0.99', transform: 'scale(1)' },
      ]);
  
    return this.animationCtrl
      .create()
      .addElement(baseEl)
      .easing('ease-out')
      .duration(500)
      .addAnimation([backdropAnimation, wrapperAnimation]);
  };

  // Animación de salida personalizada para el modal
  leaveAnimation = (baseEl: HTMLElement | null) => {
    if (!baseEl) {
      return this.animationCtrl.create(); // Devuelve una animación vacía si baseEl es null
    }
  
    const enterAnim = this.enterAnimation(baseEl);
  
    if (!enterAnim) {
      return this.animationCtrl.create(); // Devuelve una animación vacía si enterAnimation devolvió null
    }

    return enterAnim.direction('reverse');
  };

  onTermsChanged(event: CustomEvent) {
    // Usa CustomEvent y accede a detail.checked
    this.canDismiss = (event.detail as { checked: boolean }).checked;
  }
  
}

// Validación para asegurar que las contraseñas coincidan
export function passwordMatchValidator(password: string, confirmPassword: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const passwordControl = control.get(password);
    const confirmPasswordControl = control.get(confirmPassword);

    if (!passwordControl || !confirmPasswordControl) {
      return null;
    }

    const isMatching = passwordControl.value === confirmPasswordControl.value;
    return isMatching ? null : { passwordsMismatch: true };
  };
}

// Validación para asegurar que la contraseña tiene 4 números, 3 letras y 1 mayúscula
export function passwordFormatValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.value;
    if (!password) {
      return null;
    }

    const hasFourNumbers = /^(?=(?:\D*\d){4})/.test(password);
    const hasThreeCharacters = /^(?=(?:[^a-zA-Z]*[a-zA-Z]){3})/.test(password);
    const hasOneUppercase = /^(?=(?:[^A-Z]*[A-Z]){1})/.test(password);

    const isValid = hasFourNumbers && hasThreeCharacters && hasOneUppercase;

    return isValid ? null : { passwordInvalidFormat: true };
  };
}
