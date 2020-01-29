import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { NavController, MenuController, ToastController, AlertController, LoadingController } from '@ionic/angular';
import { MessagesService } from '../../components/messages/messages';
import { ApiAuthService } from '../../providers/auth-service';
import { Router } from '@angular/router';
import { Storage } from "@ionic/storage";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public onLoginForm: FormGroup;

  loginControl: AbstractControl;
  passwordControl: AbstractControl;


  responseData : any;
  userData = {"username":"", "password":""};


  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private authService: ApiAuthService,
    private message: MessagesService,
    private storage: Storage,
    public router: Router
  ) { }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
    this.initForm();
  }


  private initForm() {
    this.onLoginForm = this.formBuilder.group({
      'login': [null, Validators.compose([
        Validators.required
      ])],
      'password': [null, Validators.compose([
        Validators.required
      ])]
    });

    this.loginControl = this.onLoginForm.controls["login"];
    this.passwordControl = this.onLoginForm.controls["password"];
  }
 
    async goToHome() {

    let online = window.navigator.onLine;
    if (!online) {
      this.message.presentToast("No tiene conexión a Internet", 3000);
      return;
    }

    let loading = await this.message.presentLoading("Cargando");
    await loading.present();
   
    let userData = { "username" : this.loginControl.value, "password" : this.passwordControl.value};

    this.authService.login(userData,'login').then((result) => {
      loading.dismiss();
      this.responseData = result;

      if(this.responseData.access_token){
            this.storage.set("token", this.responseData.token);
            this.storage.set("user", this.responseData.user_token);
            this.navCtrl.navigateRoot('/home-results');
        }else{
              this.message.presentToast(
                "Login y/o contraseña incorrectos",
                5000
              );
        }

        }, (error) => {
          console.error(error);
          loading.dismiss();
          this.message.presentToast("Authentication failed ", 5000);
        });
    
  }

  async forgotPass() {
    const alert = await this.alertCtrl.create({
      header: 'Forgot Password?',
      message: 'Enter you email address to send a reset link password.',
      inputs: [
        {
          name: 'email',
          type: 'email',
          placeholder: 'Email'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Confirm',
          handler: async () => {
            const loader = await this.loadingCtrl.create({
              duration: 2000
            });

            loader.present();
            loader.onWillDismiss().then(async l => {
              const toast = await this.toastCtrl.create({
                showCloseButton: true,
                message: 'Email was sended successfully.',
                duration: 3000,
                position: 'bottom'
              });

              toast.present();
            });
          }
        }
      ]
    });

    await alert.present();
  }

  goToRegister() {
    this.navCtrl.navigateRoot('/register');
  }

}
