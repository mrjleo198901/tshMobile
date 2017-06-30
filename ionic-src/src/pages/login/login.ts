import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { ValidateServiceProvider } from '../../providers/validate-service/validate-service';
import { DashboardPage } from '../dashboard/dashboard'

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  account: { username: string, password: string } = {
    username: '',
    password: ''
  };

  constructor(
    public navCtrl: NavController,
    public validateService: ValidateServiceProvider,
    private toastCtrl: ToastController,
    private authService: AuthServiceProvider,
    public navParams: NavParams
  ) { }

  doLogin() {
    //Required fields
    if (!this.validateService.validateLogin(this.account)) {
      if (this.account.username.localeCompare("") == 0) {
        document.getElementById('myH1').style.color = '#FF0000';
      }
      if (this.account.password.localeCompare("") == 0) {
        document.getElementById('myH2').style.color = '#FF0000';
      }
      let toast = this.toastCtrl.create({
        message: 'Please fill in all fields',
        duration: 3000,
        position: 'top'
      });
      toast.present();

      return false;
    }

    this.authService.authenticateUser(this.account).subscribe(data => {
      //console.log(data);
      if (data.success) {
        this.authService.storeUserData(data.token, data.user);
        let toast = this.toastCtrl.create({
          message: 'You are now logged in',
          duration: 3000,
          position: 'top'
        });
        toast.present();

        this.navCtrl.push(DashboardPage);
      } else {
        let toast = this.toastCtrl.create({
          message: data.msg,
          duration: 3000,
          position: 'top'
        });
        toast.present();
        this.navCtrl.push(LoginPage);
      }
    });

  }

}
