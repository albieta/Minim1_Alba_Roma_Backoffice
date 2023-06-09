import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user-service.service';
import { Router } from '@angular/router';
import { DialogService } from 'src/app/services/dialog-service.service';
import { Friend } from 'src/app/models/friend';
import { FriendService } from 'src/app/services/friend-service.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{

  currentPage: number = 1;
  totalPages: number = 1; 
  limit: number = 2; 
  userFriends: Friend[] = [];
  clickedUser = '';

  constructor( private _userService: UserService, private _friendService: FriendService, private _router: Router, private dialogService: DialogService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  users: User [] = [];

  getUsers(){
    this._userService.getUsers(this.currentPage, this.limit).subscribe(data => {
      this.users = data.users;
      this.totalPages = data.totalPages;
    }, error => {
      console.log(error);
    })
  }

  passUser(user: any) {
    this._router.navigate(['/edit-user/' + user._id]);
    console.log(user._id);
  }

  friendsOfUser(id: string, name: string) {
    this._friendService.getFriendsOfUser(id).subscribe(data => {
      this.userFriends = data.friends;
    }, error => {
      console.log(error);
    })
    console.log();
    this.clickedUser = name;
  }

  deleteAUser(id:any){
    this._userService.deleteUser(id).subscribe(data => {
      this.users = [];
      this.getUsers();    
    }, error => {
      console.log(error);
    })   
  }

  confirmDelete(id: any) {
    this.dialogService.openConfirmDialog("Are you sure you wish to delete this element?", "Yes", "No")
    .afterClosed().subscribe(res => {
      if(res){
        this.deleteAUser(id);
        this.getUsers();
      }
    });
  }

  addUser(){
    this._router.navigate(['/user']);
  }

  isUser(user: User | string): user is User {
    return typeof user !== 'string';
  }

  prevPage() {
    this.currentPage = this.currentPage - 1; 
    this.getUsers();
  }

  nextPage() {
    this.currentPage = this.currentPage + 1; 
    this.getUsers();
  }

}
