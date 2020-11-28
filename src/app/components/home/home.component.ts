import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../services/crud.service';
import { User } from '../../models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  userData: any[] = new Array();
  user = '';
  apellido = '';
  nick = '';
  alert: FormGroup;
  show = false;

  constructor(private crud : CrudService, private build: FormBuilder) { 
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
    this.getData();
  }

  getData(){
    this.crud.getUserData().subscribe( (result: User[]) => {
        this.userData = new Array();
        for (var key in result) {
          if (result.hasOwnProperty(key)) {
              const user : User = result[key];
              this.userData.push(user);
          }
        }
    });
  }

  onKey(value: string, state: number) {
    if (state === 0) {
        this.user = '';
        this.user += value;
    } else if(state === 1) {
        this.apellido = '';
        this.apellido += value;
    } else {
      this.nick = '';
      this.nick += value;
    }
  }

  saveData(message: string ){
    if (this.checkDisabled()) {
      this.showValidationMessage('Informativa', 'Debe diligenciar los campos' );
      return 
    }
    this.show = true;
    const user = new User();
     user.name = this.user;
     user.apellido = this.apellido;
     user.nick = this.nick;
    this.crud.saveUser(user).then(() => {
       this.getData();
       this.show = false;
       this.showValidationMessage('Solicitud Exitosa', message);
    }, () => {
      this.show = false;
      this.showValidationMessage('Revise los datos ingresados por favor.', 'Solicitud fallida');
    });
  }


  deleteUser(){
    if (this.checkDisabled()) {
      this.showValidationMessage('Informativa', 'Se elimino el registro correctamente' );
      return 
    }
    this.show = true;
    const user = new User();
     user.name = this.user;
     user.apellido = this.apellido;
     user.nick = this.nick;
    this.crud.delete(user).then(() => {
       this.getData();
       this.show = false;
       this.showValidationMessage('Solicitud Exitosa', 'Datos guardados con exito.' );
    }, () => {
      this.show = false;
      this.showValidationMessage('Revise los datos ingresados por favor.', 'Solicitud fallida');
    });
  }

  private showValidationMessage(message: String,  title: String){
    this.setPropertyForm('title', message);
    this.setPropertyForm('subTitle', title);
    this.show = false;
    this.setPropertyForm('showPopUp', true);
  }


  private setPropertyForm(property: string, value: any) {
    this.alert.controls[property].setValue(value);
  }

  checkDisabled(): boolean {
    return this.user === '' || this.apellido === '' && this.nick === '';
  }

  closePopUp(state: boolean) {
    this.setPropertyForm('showPopUp', !state);
  }
}
