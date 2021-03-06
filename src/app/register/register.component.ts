import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { User } from '../_models/user';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User;
  @Output() cancelRegister: EventEmitter<any> = new EventEmitter<any>();
  registerForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;

  constructor(private authService: AuthService,
              private alertify: AlertifyService,
              private fb: FormBuilder,
              private router: Router) { }

  ngOnInit() {
    this.bsConfig = {
      containerClass: 'theme-red'
    };
    this.createRegisterForm();
  }

  createRegisterForm(){
    this.registerForm = this.fb.group({
      gender: ['male'],
      username: ['', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: [null , Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator});
  }

  createRegisterFormTraditionalWay(){
    this.registerForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]),
      confirmPassword: new FormControl('', [Validators.required])
    }, this.passwordMatchValidator);
  }


  passwordMatchValidator(g: FormGroup){
    return g.get('password').value === g.get('confirmPassword').value ? null : { mismatch: true};
  }

  register(){
    if (this.registerForm.valid){
      this.user = Object.assign({}, this.registerForm.value);
      this.authService.register(this.user)
        .subscribe(() => {
          this.alertify.success('Registration successful');
        }, error => {
          this.alertify.error(error);
        }, () => {
          this.authService.login(this.user)
            .subscribe(() => {
              this.router.navigate(['/members']);
            }, error => {
              this.alertify.error(error + ' for login');
            });
        });
    }
  }

  cancel(){
    this.cancelRegister.emit(false);
  }

}
