import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  newUser = { 
    firstname: "", 
    email:"", 
    password:"", 
    gender:"", 
    age:"", 
    city:"" 
  }
  confirmpassword;
  error;
  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
  }
  Register(){
    if(this.newUser.password != this.confirmpassword){
      this.error = "Oops, your password didnt match, please try again!"
    }else{
      let obs = this._httpService.createUser(this.newUser);
      obs.subscribe(data=>{
        console.log("createUser server respons data:", data)
        if(data['errors']){
          console.log(data['error']); 
        }else{
          console.log("Create User success", data);
          this.newUser = { 
            firstname: "", 
            email:"", 
            password:"", 
            gender:"", 
            age:"", 
            city:"" 
          }
          return this._router.navigate(['/dashboard/'+data['_id']])
        }
      })
    
    }
  }

}
