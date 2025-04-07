import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
// import {
//   AbstractControl,
//   Form,
//   FormBuilder,
//   FormControl,
//   FormGroup, FormsModule,
//   ReactiveFormsModule, ValidationErrors,
//   ValidatorFn,
//   Validators
// }from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import {HttpClient} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-pagina-register',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './pagina-register.component.html',
  styleUrl: './pagina-register.component.css'

})
export class PaginaRegisterComponent {
  // registerForm = new FormGroup({
  //   correoElectronico: new FormControl("", [Validators.email]),
  //   contrasegna: new FormControl("", [Validators.required, Validators.minLength(8)]),
  //   confirmarContrasegna: new FormControl("", [Validators.required, Validators.minLength(8)]),
  // }, { validators: this.passwdValidator });

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


  passwdValidator(){
      const contrasegna = this.Contrasenya;
      const confirmarContrasegna = this.ContrasenyaConfirma;
      return contrasegna == confirmarContrasegna
    };
  onsubmit() {
    if (this.passwdValidator()) {
      let email = this.email
      let password = this.Contrasenya
      this.http.post<{}>("http://192.168.19.45:3090/registreUsuariFitxer", {email:email, password:password });

      if(email && password) {
        this.authService.registerWithEmailAndPassword(email, password)
      }
      this.router.navigate(["/login"]);
    }
  }
}

