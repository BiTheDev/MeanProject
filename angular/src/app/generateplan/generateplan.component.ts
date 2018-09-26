import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params } from  '@angular/router';

@Component({
  selector: 'app-generateplan',
  templateUrl: './generateplan.component.html',
  styleUrls: ['./generateplan.component.css']
})
export class GenerateplanComponent implements OnInit {

  _currentUser: any = {
    firstname : "",
    _id : "",
    Date : []
  }
  
  _dateForm: any = {
    date: null,
    time: null,
    activity: "",
    location: "",
    dressCode: "",
    user1: null,
    user2: null,
    invitaion: true
  }

  beErrors: {
    name : { message : ""},
    dressCode : { message : ""},
    time : { message : ""}
  }


  constructor(
    private _httpService : HttpService,
    private _route : ActivatedRoute
  ) { }


  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      let observer = this._httpService.getUser(params.userId);
      observer.subscribe(data => {
        if(data['errors']){
          console.log('There were errors getting current user': data['errors']);
        }
        else{
          console.log("Current User found.")
          this._currentUser['_id'] = data['_id'];
          this._currentUser['firstname'] = data['firstname'];
          this._currentUser['Date'] = data['Date'];
          this._dateForm.user1 = this._currentUser;
        }
      })
    })
  }

  // createDate will first grab a randomly matched user and attach it to the dateForm
  // it will then create the date with user1 (the inviter)
  // then it will take this date info and push it to user2

  createDate(){
    console.log("Hitting createDate");
    this.errorsReset(this.beErrors);
    this._dateForm.user2 = this.getRandomMatch();
    let observer = this._httpService.createDate(this._currentUser._id, this._dateForm);
    observer.subscribe(createData => {
      if(createData['errors']){
        console.log("There were errors creating date:", createData['errors'])
        if(createData['errors']['name']){
          this.beErrors['name'] =  createData['errors']['name'];
        }
        if(createData['errors']['time']){
          this.beErrors['time'] =  createData['errors']['time'];
        }
        if(createData['errors']['dressCode']){
          this.beErrors['dressCode'] =  createData['errors']['dressCode'];
        }
      }
      else{
        console.log("Date Created")
        let _dateData = createData;

        // push to invited user's date array
        let secondObs = this._httpService.updateUser(_dateData['user2']['_id'], _dateData);
        secondObs.subscribe(pushDateData => {
          console.log("Create Date data:", pushDateData);
          if (pushDateData['errors']){
            // if there is a failur to push date into other user's date array, delete the date from the database.
            console.log("Failed to add date to invitee, attempting to delete date:", pushDateData['errors']);
            let deleteObs = this._httpService.deleteDate(_dateData['_id']);
            deleteObs.subscribe(deleteData => {
              if (deleteData['errors']){
                console.log("Delete date had errors..... now what?:", deleteData['errors']);
              }
              else {
                console.log("Date delete has returned:", deleteData);
              }
            })
          }
          else {
            console.log("Date successfully created!", pushDateData);
          }
        })       
      }
    })
  }

  // grabs a random user that matches well
  // model.find based on logged in user's preferences
  // returns an array with which we can generate a random number
  // possibly only include those who don't currently don't have invites or less than 3 or somethig like that
  
  getRandomMatch(){
    let observer = this._httpService.getUsers(this._currentUser.city);
    observer.subscribe(data => {
      let _potentialMatches = data;
      for(let user in _potentialMatches){
        // Remove logged in user from the list if that shows up.
        if (user['_id'] == this._currentUser['_id']){
          delete _potentialMatches[user];
        }
        // Check gender (might happen in the query instead)
        if (user['gender'] != this._currentUser.gender){
          delete _potentialMatches[user];
        }
        // Removing the possibility of inviting a user that they already have invited on another date
        for(let i = 0; i < this._currentUser.Date.length; i++){
          if( this._currentUser.Date[i]['user2']['_id'] == user['_id']){

          }
        }
      }
      let num = Math.floor(Math.random() * Object.keys(_potentialMatches).length);
      let match = _potentialMatches[num];
      return match;
    })
  }

  // grab a random activity and location from the activities array.

  getRandomActivity(){
    let activities = this._httpService.activities;
    this._dateForm.activity = activities[Math.floor(Math.random()* activities.length)].activity;
    this._dateForm.location = this._dateForm.activity.locations[Math.floor(Math.random() * this._dateForm.activity.locations.length)];
  }

  getRandomLocation(){
    this._dateForm.location = this._dateForm.activity.locations[Math.floor(Math.random() * this._dateForm.activity.locations.length)];
  }

  errorsReset(errors){
    for (let key in errors){
      key['message'] = "";
    }
  }
}
