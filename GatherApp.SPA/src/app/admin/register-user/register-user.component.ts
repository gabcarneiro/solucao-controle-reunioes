import { Component, OnInit, Input } from '@angular/core';
import { AlertifyService } from '../../_services/alertify.service';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {
  model: any;
  day: any;
  userRegisterForm: FormGroup;

  constructor(
    private alertify: AlertifyService,
    private fb: FormBuilder,
    private userService: UserService
    ) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.userRegisterForm = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      department: [''],
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    }, {validator: this.passwordMissmatchValidator});
  }

  resetForm() {
    this.userRegisterForm.reset();
  }

  formatModel() {
    this.model = this.userRegisterForm.value;
  }
  registerUser() {
    this.userService.registerUser(this.userRegisterForm.value).subscribe( () => {
      this.alertify.success('Usuário cadastrado com sucesso!');
      this.userRegisterForm.reset();
    }, error => {
      this.alertify.error(error);
    });
  }

  passwordMissmatchValidator (AC: AbstractControl) {
    return AC.get('password').value === AC.get('confirmPassword').value ? null : {'missmatch' : true};
  }

}
