import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})

export class RegisterComponent {
/*  username: string = '';
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  onRegister() {
    // Aquí iría la lógica para registrar al usuario
    alert('Registro exitoso');
    this.router.navigate(['/login']); // Redirige al login después de registrar
  }

  goToLogin() {
    this.router.navigate(['/login']); // Navega al login si ya tiene una cuenta
  }
}*/


formularioRegistro: FormGroup;
hidePassword= true;
hideConfirmPassword= true;

constructor (public fb: FormBuilder, public alertController: AlertController, public navCtr: NavController) {

  this.formularioRegistro = this.fb.group({
    nombre: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, passwordFormatValidator()]],
    confirmPassword: ['', Validators.required]
  }, { validator: passwordMatchValidator('password', 'confirmPassword') });

 }

ngOnInit() {
  this.formularioRegistro.reset();
}

async guardar() {

  let f = this.formularioRegistro.value;

  if (this.formularioRegistro.invalid) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Favor de Seguir los Requisitos.',
      buttons: ['Aceptar'],
    });

    await alert.present();
    return;

  } else {

  } ;

  const usuario = {
    nombre: f.nombre,
    contraseña: f.password,
  }
  
  console.log('ingresado'),
  localStorage.setItem('usuario',JSON.stringify(usuario));
  localStorage.setItem('ingresado','true');
  this.navCtr.navigateRoot('/login');

}

togglePasswordVisibility() {
  this.hidePassword = !this.hidePassword;
}

toggleConfirmPasswordVisibility() {
  this.hideConfirmPassword = !this.hideConfirmPassword;
}
}

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