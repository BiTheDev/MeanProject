import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  error;
  LoginUser: {email:"", password:""};
  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
  }
  Login(){
    let obs = this._httpService.login(this.LoginUser);
    if(obs == null){
      console.log("Invalid Email");
        this.error = "Invalid Email";
    }else{
      obs.subscribe(data=>{
        console.log("Login success");
        return this._router.navigate(['/dashboard']);
      })
    }
  }
}
