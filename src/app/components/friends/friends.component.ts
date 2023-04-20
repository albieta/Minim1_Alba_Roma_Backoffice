import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Friend } from 'src/app/models/friend';
import { User } from 'src/app/models/user';
import { DialogService } from 'src/app/services/dialog-service.service';
import { FriendService } from 'src/app/services/friend-service.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  friends : Friend[] = [];
  currentPage:number=1;
  totalPages:number=1;
  limit:number=2;

  constructor(private _friendService: FriendService, 
    private route: ActivatedRoute,
    private _router: Router, 
    private dialogService: DialogService) {}

  ngOnInit(): void {
    this.getFriends();
  }

  getFriends(): void {
    this._friendService.getFriends(this.currentPage,this.limit).subscribe({
      next: data => {
        this.friends = data.friends;
        this.totalPages=data.totalPages;
      }, 
      error: error => {
      console.log(error);
      }
    })
  }

  editFriend(friend: Friend): void {
    this._router.navigate(['/edit-friend/' + friend._id]);
  }

  confirmDelete(friend: Friend) {
    this.dialogService.openConfirmDialog("Are you sure you wish to delete this element?", "Yes", "No")
    .afterClosed().subscribe(res => {
      if(res){
        this.deleteFriend(friend);
        this.getFriends();
      }
    });
  }

  deleteFriend(friend: Friend): void {
    this._friendService.deleteFriend(friend._id).subscribe(
      () => {
        this.getFriends();
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  addFriend(){
    //this._router.navigate(['/']);
  }

  isUser(user: User | string): user is User {
    return typeof user !== 'string';
  }

  prevPage(){
    this.currentPage=this.currentPage-1;
    this.getFriends();
  }
  nextPage(){
    this.currentPage=this.currentPage+1;
    this.getFriends();
  }
}
