import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
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
import { AuthService } from '../auth.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-pagina-register',
  imports: [ReactiveFormsModule, CommonModule],
  standalone: true,
  templateUrl: './pagina-register.component.html',
  styleUrl: './pagina-register.component.css'

})
export class PaginaRegisterComponent {
  registerForm = new FormGroup({
    correoElectronico: new FormControl("", [Validators.email]),
    contrasegna: new FormControl("", [Validators.required, Validators.minLength(8)]),
    confirmarContrasegna: new FormControl("", [Validators.required, Validators.minLength(8)]),
  }, { validators: this.passwdValidator });

  paginaNombre: string = 'GameStorm';
  email: any;
  Contrasenya: any;
  ContrasenyaConfirma: any;

  ngOnInit() {
    this.setTitle();
  }

  setTitle() {
    this.titleService.setTitle(`${this.paginaNombre} - Registro`);
  }

  constructor(private router: Router, private titleService: Title, public authService: AuthService, private http: HttpClient) {};


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
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;
      let email = this.email
      let password = this.Contrasenya
      this.http.post<{}>("http://192.168.19.158:3090/registreUsuariFitxer", {email, password});

      if(formData.correoElectronico && formData.contrasegna) {
        this.authService.registerWithEmailAndPassword(formData.correoElectronico, formData.contrasegna)
      }
      this.router.navigate(["/login"]);
    }
  }
}

