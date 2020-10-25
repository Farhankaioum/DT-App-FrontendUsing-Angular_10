import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {};
  @Output() cancelRegister: EventEmitter<any> = new EventEmitter<any>();
  constructor(private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
  }

  register(){
    console.log(this.model);
    this.authService.register(this.model).subscribe(() => {
      this.alertify.success('registration successfull');
    }, error => {
      this.alertify.error(error);
    });
  }

  cancel(){
    this.cancelRegister.emit(false);
  }

}
