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

  ngOnInit() {
    this.setTitle();
  }

  setTitle() {
    this.titleService.setTitle(`${this.paginaNombre} - Registro`);
  }

  constructor(private router: Router, private titleService: Title, public authService: AuthService) {};


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

      if(formData.correoElectronico && formData.contrasegna) {
        this.authService.registerWithEmailAndPassword(formData.correoElectronico, formData.contrasegna)
      }
      this.router.navigate(["/login"]);
    }
  }
}

