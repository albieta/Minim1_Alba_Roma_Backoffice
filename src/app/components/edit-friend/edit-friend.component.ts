import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Friend } from 'src/app/models/friend';
import { DialogService } from 'src/app/services/dialog-service.service';
import { FriendService } from 'src/app/services/friend-service.service';

@Component({
  selector: 'app-edit-friend',
  templateUrl: './edit-friend.component.html',
  styleUrls: ['./edit-friend.component.css']
})
export class EditFriendComponent implements OnInit {

  form: FormGroup;

  friendId: any;
  friendData: Friend = { user: '', cool: false, quote: '', estado: '' };
  showMessage = false;

  constructor(private route: ActivatedRoute, private _friendService: FriendService, private _fb: FormBuilder, private _router: Router, private dialogService: DialogService) {
    this.form = this._fb.group({
      "user": ['', Validators.required],
      "cool": ['', Validators.required],
      "quote": ['', Validators.required],
      "estado": ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.friendId = this.route.snapshot.params['id'];
    console.log(this.friendId);
    this.getFriendData();
  }

  getFriendData(): void {
    this._friendService.getFriend(this.friendId).subscribe(
      (data: Friend) => {
        this.friendData = data;
        this.form.patchValue({
          user: this.friendData.user,
          cool: this.friendData.cool,
          quote: this.friendData.quote,
          estado: this.friendData.estado
        });
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  editFriend():void{

    this.dialogService.openConfirmDialog("The changes where done correctly.", "OK", "Cancel")
    .afterClosed().subscribe(res => {
      if(res){
        this._friendService.editFriend(this.friendId,this.form.value).subscribe(data =>{
          this._router.navigate(['/friends']);            
        }, error => {
          console.log(error);
        })
      }
    });
    
  }


}
