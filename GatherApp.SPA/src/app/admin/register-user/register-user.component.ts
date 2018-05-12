import { Component, OnInit, Input } from '@angular/core';
import { AlertifyService } from '../../_services/alertify.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {
  model: any = {};
  day: any;
  userRegisterForm: FormGroup;

  constructor(
    private alertify: AlertifyService,
    private fb: FormBuilder,
    private userService: UserService
    ) {}

  ngOnInit() {
    this.createForm();
    this.model = {};
  }

  createForm() {
    this.userRegisterForm = this.fb.group({
      name: ['',Validators.required],
      lastName: ['',Validators.required],
      department: [''],
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmpassword: ['', Validators.required],

    }, this.userTimeValidator);
  }

  formatModel(){
    this.model = {
      username: this.userRegisterForm.get('username'),
      password: this.userRegisterForm.get('password'),
      name: this.userRegisterForm.get('name'),
      lastName: this.userRegisterForm.get('lastName'),
      department: this.userRegisterForm.get('department')
    }
  }
  registerUser() {
    this.formatModel();
    this.userService.registerUser(this.model).subscribe( () => {
      this.alertify.success('Usuário cadastrado com sucesso!');
    }, error => {
      this.alertify.error(error);
    });
  }
  userTimeValidator (g: FormGroup) {
    return g.get('finishingTime').value > g.get('startingTime').value ? null : {'missmatch' : true};
  }

}
