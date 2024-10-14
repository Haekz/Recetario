import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, AnimationController, NavController } from '@ionic/angular';
import { UsuarioService } from '../services/usuario/usuario.service';
import { SqliteService } from '../services/sqlite.service'; // Importa el servicio SQLite
import { Usuario } from '../services/usuario/CLUsuario'; // Importa el modelo Usuario

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  formularioRegistro: FormGroup;
  usuarios: Usuario[] = [];
  nextId: string = "1"; // Inicializamos el ID con "1"
  loading = false;  // Inicializa la variable de carga
  presentingElement: any = null;  // Inicializa presentingElement
  canDismiss = false; // Controla si se puede cerrar el modal

  // Variables para controlar la visibilidad de las contraseñas
  hidePassword = true;
  hideConfirmPassword = true;

  constructor(
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
      password: ['', [Validators.required, passwordFormatValidator()]], // Validador de formato de contraseña
      confirmPassword: ['', Validators.required]
    }, { validator: passwordMatchValidator('password', 'confirmPassword') }); // Validador de coincidencia de contraseñas
  }

  ngOnInit() {
    this.formularioRegistro.reset();
    this.presentingElement = document.querySelector('.ion-page');

    // Obtener usuarios existentes para calcular el siguiente ID
    this.getUsuariosFromApi();
  }

  // Método para obtener los usuarios y calcular el próximo ID
  getUsuariosFromApi() {
    this.usuarioService.getAllUsuarios().subscribe(
      (data: Usuario[]) => {
        this.usuarios = data;
        this.generateNextId(); // Generar el próximo ID basado en los usuarios recibidos
      },
      (error) => {
        console.error('Error al obtener los usuarios:', error);
        this.usuarios = [];
      }
    );
  }

  // Generar el próximo ID basado en el ID más alto existente
  generateNextId() {
    if (this.usuarios.length > 0) {
      const lastUsuario = this.usuarios.reduce((prev, current) => (prev.id && current.id && prev.id > current.id) ? prev : current);
      this.nextId = ((+lastUsuario.id!) + 1).toString();  // Sumar 1 al último ID
    } else {
      this.nextId = "1";  // Si no hay usuarios, el ID será 1
    }
  }

  // Función para guardar el registro
  async guardar() {
    const f = this.formularioRegistro.value;

    if (this.formularioRegistro.invalid) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Favor de seguir los requisitos.',
        buttons: ['Aceptar'],
      });
      await alert.present();
      return;
    }

    // Verificar si el nombre de usuario existe
    this.usuarioService.verificarExistenciaUsuario(f.nombre).subscribe(async (usuarios) => {
      if (usuarios.length > 0) {
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'El nombre de usuario ya está en uso.',
          buttons: ['Aceptar'],
        });
        await alert.present();
        return;
      }

      // Verificar si el correo electrónico existe
      this.usuarioService.verificarExistenciaEmail(f.email).subscribe(async (emails) => {
        if (emails.length > 0) {
          const alert = await this.alertController.create({
            header: 'Error',
            message: 'El correo electrónico ya está en uso.',
            buttons: ['Aceptar'],
          });
          await alert.present();
          return;
        }

        // Crear objeto con los datos del usuario, incluyendo el nuevo ID
        const nuevoUsuario = {
          id: this.nextId,  // Asignamos el próximo ID calculado
          nombre: f.nombre,
          email: f.email,
          password: f.password,
        };

        this.loading = true;

        try {
          // Guardar el usuario en SQLite localmente
          await this.sqliteService.addUser(nuevoUsuario.nombre, nuevoUsuario.email, nuevoUsuario.password);
          console.log('Usuario agregado localmente a SQLite');

          // Intentar registrar al usuario en la API
          this.usuarioService.registrarUsuario(nuevoUsuario).subscribe({
            next: async (response) => {
              this.loading = false;
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
              this.loading = false;
              console.error('Error al registrar usuario:', err);
              const alert = await this.alertController.create({
                header: 'Error',
                message: 'Ocurrió un error al registrar el usuario. Inténtalo de nuevo.',
                buttons: ['Aceptar'],
              });
              await alert.present();
            }
          });
        } catch (error) {
          this.loading = false;
          console.error('Error al guardar usuario en SQLite:', error);
          const alert = await this.alertController.create({
            header: 'Error',
            message: 'Ocurrió un error al guardar el usuario localmente.',
            buttons: ['Aceptar'],
          });
          await alert.present();
        }
      });
    });
  }

  // Cambiar visibilidad de la contraseña
  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  // Cambiar visibilidad de la confirmación de la contraseña
  toggleConfirmPasswordVisibility() {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }

  // Maneja el cambio en la aceptación de términos y condiciones
  onTermsChanged(event: any) {
    this.canDismiss = event.detail.checked;
  }

  // Animación de entrada personalizada para el modal
  enterAnimation = (baseEl: HTMLElement) => {
    const root = baseEl.shadowRoot;

    if (!root) {
      return this.animationCtrl.create();
    }

    const backdropAnimation = this.animationCtrl
      .create()
      .addElement(root.querySelector('ion-backdrop')!)
      .fromTo('opacity', 0.01, 'var(--backdrop-opacity)');

    const wrapperAnimation = this.animationCtrl
      .create()
      .addElement(root.querySelector('.modal-wrapper')!)
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
  leaveAnimation = (baseEl: HTMLElement) => {
    return this.enterAnimation(baseEl).direction('reverse');
  };
}

// Validadores de contraseñas
export function passwordFormatValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.value;
    if (!password) return null;

    const hasFourNumbers = /^(?=(?:\D*\d){4})/.test(password);
    const hasThreeCharacters = /^(?=(?:[^a-zA-Z]*[a-zA-Z]){3})/.test(password);
    const hasOneUppercase = /^(?=(?:[^A-Z]*[A-Z]){1})/.test(password);

    const isValid = hasFourNumbers && hasThreeCharacters && hasOneUppercase;
    return isValid ? null : { passwordInvalidFormat: true };
  };
}

export function passwordMatchValidator(password: string, confirmPassword: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const passwordControl = control.get(password);
    const confirmPasswordControl = control.get(confirmPassword);
    if (!passwordControl || !confirmPasswordControl) return null;

    const isMatching = passwordControl.value === confirmPasswordControl.value;
    return isMatching ? null : { passwordsMismatch: true };
  };
}