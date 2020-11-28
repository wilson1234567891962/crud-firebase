import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { MyGuardService } from '../../services/my-guard-service-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user = '';
  password = '';
  show = false;
  alert: FormGroup;
  constructor(private router: Router, private loginService: LoginService, private build: FormBuilder,
    private myGuard: MyGuardService) { 
    const validator = Validators.required;
    this.alert = this.build.group({
      title: ['', validator],
      close: [true, validator],
      subTitle: ['', validator],
      showButtonContinues: [false, validator],
      showButtonCancel: [false, validator],
      showPopUp: [false, validator],
  });
  }

  ngOnInit(): void {

  }

  login() {
    this.show = true;
    
    this.loginService.login(this.user, this.password).then(() => {
      this.show = false;
      this.myGuard.setStateLogin(true);
      this.router.navigate(['home']).then(() => {});
    }, () => {
      this.setPropertyForm('title', 'Solicitud fallida');
      this.setPropertyForm('subTitle', 'Por favor revise el correo electronico o contraseña digitada.');
      this.show = false;
      this.setPropertyForm('showPopUp', true);
    });
  }

  onKey(value: string, state: number) {
    if (state === 0) {
        this.user = '';
        this.user += value;
    } else {
        this.password = '';
        this.password += value;
    }
  }

  private setPropertyForm(property: string, value: any) {
    this.alert.controls[property].setValue(value);
  }

  checkDisabled(): boolean {
    return this.user === '' || this.password === '';
  }

  closePopUp(state: boolean) {
    this.setPropertyForm('showPopUp', !state);
  }
}
