import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { ValidateServiceProvider } from '../../providers/validate-service/validate-service';

import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  account: { name: string, username: string, email: string, password: string } = {
    name: '',
    username: '',
    email: '',
    password: ''
  };

  constructor(
    public navCtrl: NavController,
    public validateService: ValidateServiceProvider,
    private toastCtrl: ToastController,
    private authService: AuthServiceProvider
  ) { }

  doSignup() {
    //Required fields
    if (!this.validateService.validateRegister(this.account)) {
      if (this.account.name.localeCompare("") == 0) {
        document.getElementById('myH1').style.color = '#FF0000';
      }
      if (this.account.name.localeCompare("") == 0) {
        document.getElementById('myH2').style.color = '#FF0000';
      }
      if (this.account.name.localeCompare("") == 0) {
        document.getElementById('myH3').style.color = '#FF0000';
      }
      if (this.account.name.localeCompare("") == 0) {
        document.getElementById('myH4').style.color = '#FF0000';
      }
      let toast = this.toastCtrl.create({
        message: 'Please fill in all fields',
        duration: 3000,
        position: 'top'
      });
      toast.present();

      return false;
    }
    // Validate Email
    if (!this.validateService.validateEmail(this.account.email)) {
      let toast = this.toastCtrl.create({
        message: 'Please use a valid email',
        duration: 3000,
        position: 'top'
      });
      toast.present();

      return false;
    }
    // Register user
    this.authService.registerUser(this.account).subscribe(data => {
      if (data.success) {
        let toast = this.toastCtrl.create({
          message: 'You are now registered and can log in',
          duration: 3000,
          position: 'top'
        });
        toast.present();

        this.navCtrl.push(LoginPage);
      } else {
        let toast = this.toastCtrl.create({
          message: 'Something went wrong',
          duration: 3000,
          position: 'top'
        });
        toast.present();
        this.navCtrl.push(RegisterPage);
      }
    });
  }
}
