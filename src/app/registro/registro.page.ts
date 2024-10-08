import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, AnimationController, NavController } from '@ionic/angular';
import { UsuarioService } from '../services/usuario/usuario.service';
import { SqliteService } from '../services/sqlite.service'; // Importa el servicio SQLite

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage{

  // Formulario de registro
  formularioRegistro: FormGroup;

  // Variables para controlar la visibilidad de las contraseñas
  hidePassword = true; // Controla la visibilidad de la contraseña
  hideConfirmPassword = true; // Controla la visibilidad de la confirmación de contraseña

  // Variables para el modal
  presentingElement: Element | null = null;
  canDismiss = false; // Controla si se puede cerrar el modal
  loading = false; // Controla la visibilidad de la barra de progreso

  constructor (
    public fb: FormBuilder, 
    public alertController: AlertController, 
    public navCtr: NavController, 
    public animationCtrl: AnimationController,
    public router: Router,
    public usuarioService: UsuarioService,
    public sqliteService: SqliteService
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
    // Resetea el formulario al inicializar
    this.formularioRegistro.reset();
    this.presentingElement = document.querySelector('.ion-page');
  }

  // Función para guardar el registro
async guardar() {
  // Obtener los valores del formulario
  let f = this.formularioRegistro.value;

  // Validar si el formulario es inválido
  if (this.formularioRegistro.invalid) {
    // Mostrar alerta si el formulario es inválido
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Favor de Seguir los Requisitos.',
      buttons: ['Aceptar'],
    });

    await alert.present();
    return;
  }

  // Crear objeto con los datos del usuario
  const nuevoUsuario = {
    nombre: f.nombre,
    email: f.email,
    password: f.password,
  };

  // Mostrar barra de progreso
  this.loading = true;

  try {
    // Guardar el usuario en SQLite localmente
    await this.sqliteService.addUser(nuevoUsuario.nombre, nuevoUsuario.email, nuevoUsuario.password);
    console.log('Usuario agregado localmente a SQLite');

    // Si SQLite es exitoso, intenta registrar al usuario en la API
    this.usuarioService.registrarUsuario(nuevoUsuario).subscribe({
      next: async (response) => {
        // Detener la barra de progreso
        this.loading = false;

        console.log('Usuario registrado:', response);

        // Guardar el usuario en localStorage (sin contraseña por seguridad)
        localStorage.setItem('usuario', JSON.stringify({ nombre: f.nombre, email: f.email }));
        localStorage.setItem('ingresado', 'true'); // Indicador de sesión iniciada

        // Mostrar alerta de éxito
        const alert = await this.alertController.create({
          header: 'Éxito',
          message: 'Usuario registrado correctamente.',
          buttons: ['Aceptar'],
        });

        await alert.present();

        // Redirigir a la página de inicio de sesión después de un tiempo
        setTimeout(() => {
          this.navCtr.navigateForward('/inicio');
        }, 1000);
      },
      error: async (err) => {
        // Detener la barra de progreso
        this.loading = false;
        console.error('Error al registrar usuario:', err);

        // Mostrar alerta de error
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'Ocurrió un error al registrar el usuario. Inténtalo de nuevo.',
          buttons: ['Aceptar'],
        });

        await alert.present();
      }
    });
  } catch (error) {
    // Si ocurre un error al guardar en SQLite
    this.loading = false;
    console.error('Error al guardar usuario en SQLite:', error);

    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Ocurrió un error al guardar el usuario localmente.',
      buttons: ['Aceptar'],
    });

    await alert.present();
  }
}

  

  // Cambiar visibilidad de la contraseña
  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  // Cambiar visibilidad de la confirmación de la contraseña
  toggleConfirmPasswordVisibility() {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }

  // Animación de entrada personalizada para el modal
  enterAnimation = (baseEl: HTMLElement) => {
    const root = baseEl.shadowRoot;
  
    if (!root) {
      // Devuelve una animación vacía si root es null
      return this.animationCtrl.create(); 
    }
  
    const backdropElement = root.querySelector('ion-backdrop');
    const wrapperElement = root.querySelector('.modal-wrapper');
  
    if (!backdropElement || !wrapperElement) {
      // Devuelve una animación vacía si los elementos no están presentes
      return this.animationCtrl.create(); 
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
      // Devuelve una animación vacía si baseEl es null
      return this.animationCtrl.create();
    }
  
    const enterAnim = this.enterAnimation(baseEl);
  
    if (!enterAnim) {
      // Devuelve una animación vacía si enterAnimation devolvió null
      return this.animationCtrl.create(); 
    }

    return enterAnim.direction('reverse');
  };

  // Maneja el cambio en la aceptación de términos y condiciones
  onTermsChanged(event: CustomEvent) {
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
    // Obtiene el valor de la contraseña del control del formulario
    const password = control.value;

    // Si el valor de la contraseña está vacío, no hay errores de formato
    if (!password) {
      return null;
    }

    // Verifica si la contraseña contiene al menos 4 números
    const hasFourNumbers = /^(?=(?:\D*\d){4})/.test(password);

    // Verifica si la contraseña contiene al menos 3 letras
    const hasThreeCharacters = /^(?=(?:[^a-zA-Z]*[a-zA-Z]){3})/.test(password);

    // Verifica si la contraseña contiene al menos 1 letra mayúscula
    const hasOneUppercase = /^(?=(?:[^A-Z]*[A-Z]){1})/.test(password);

    // La contraseña es válida si cumple con todas las condiciones anteriores
    const isValid = hasFourNumbers && hasThreeCharacters && hasOneUppercase;

    // Devuelve un objeto de errores si la contraseña es inválida, o null si es válida
    return isValid ? null : { passwordInvalidFormat: true };
  };
}

// ^ - Indica el inicio de la cadena.

// (?=(?:\D*\d){4}) - Esta es una afirmación de anticipación (lookahead) que asegura que la cadena cumple con una condición específica.

// (?:\D*\d) - Es un grupo de no captura (non-capturing group) que coincide con cualquier cantidad de caracteres que no sean dígitos (\D*) seguidos de un dígito (\d).

// {4} - El grupo anterior debe repetirse exactamente 4 veces para que la condición se cumpla.
