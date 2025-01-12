import { Component } from '@angular/core';
import {
  AbstractControl,
  Form,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule, ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagina-register',
  imports: [ReactiveFormsModule, CommonModule],
  standalone: true,
  templateUrl: './pagina-register.component.html',
  styleUrl: './pagina-register.component.css'

})
export class PaginaRegisterComponent {
  registerForm = new FormGroup({
    nombreCompleto: new FormControl("", [Validators.required, Validators.minLength(4)]),
    nombreUsuario: new FormControl("", [Validators.required, Validators.minLength(4)]),
    correoElectronico: new FormControl("", [Validators.email]),
    numeroTelefono: new FormControl("", [Validators.required, Validators.minLength(4)]),
    contrasegna: new FormControl("", [Validators.required, Validators.minLength(8)]),
    confirmarContrasegna: new FormControl("", [Validators.required, Validators.minLength(8)]),
    gender: new FormControl(""),
  }, { validators: this.passwdValidator });
  user: User = new User();

  constructor(private router: Router) {};


  passwdValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const contrasegna = control.get('contrasegna')?.value;
      const confirmarContrasegna = control.get('confirmarContrasegna')?.value;
      return contrasegna && confirmarContrasegna && contrasegna !== confirmarContrasegna
        ? { contrasegnasNoCoinciden: true }
        : null;
    };
  }
  onsubmit() {
    console.log("Ñeh");
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;

      const newUser: User = {
        nombre: formData.nombreCompleto || '',
        userName: formData.nombreUsuario || '',
        email: formData.correoElectronico || '',
        phoneNumber: formData.numeroTelefono || '',
        contrasegna: formData.contrasegna || '',
        genero: formData.gender === 'Hombre' ? Genero.Hombre : Genero.Mujer,
      };

      UserStorage.addUser(newUser);

      this.router.navigate(["login"]);
    }
  }
}
export class User {
  nombre: string = "";
  userName: string = "";
  email: string = "";
  phoneNumber: string = "";
  contrasegna: string = "";
  genero: Genero = Genero.Hombre;
}
export enum Genero {
  Hombre,
  Mujer,
}

export class UserStorage {
  private static USER_STORAGE_NAME = "users";
  private static LOGGED_STORAGE_NAME = "loggedIn";

  static getMap(): Map<string, User> {
    const storedMap = localStorage.getItem(this.USER_STORAGE_NAME);

    if (!storedMap) {
      return new Map();
    }

    const parsedObject = JSON.parse(storedMap);
    return new Map(Object.entries(parsedObject));
  }

  static storeUsers(users: Map<string, User>): void {
    const serializedMap = JSON.stringify(Object.fromEntries(users));
    localStorage.setItem(this.USER_STORAGE_NAME, serializedMap);
  }

  static getUsers(): User[] {
    const usersMap = this.getMap();
    return Array.from(usersMap.values());
  }

  static getUser(userName: string): User | null {
    const usersMap = this.getMap();
    return usersMap.get(userName) || null;
  }

  static addUser(user: User): boolean {
    const usersMap = this.getMap();

    if (usersMap.has(user.userName)) {
      return false;
    }

    usersMap.set(user.userName, user);
    this.storeUsers(usersMap);
    return true;
  }

  static userExists(userName: string): boolean {
    const usersMap = this.getMap();
    return usersMap.has(userName);
  }

  static loginUser(user: User): void {
    localStorage.setItem(this.LOGGED_STORAGE_NAME, user.userName);
  }

  static getLoggedUserName(): string | null {
    return localStorage.getItem(this.LOGGED_STORAGE_NAME);
  }

  static getLoggedUser(): User | null {
    const userName = this.getLoggedUserName();
    return userName ? this.getUser(userName) : null;
  }

  static logoutUser(): void {
    localStorage.removeItem(this.LOGGED_STORAGE_NAME);
  }
}
