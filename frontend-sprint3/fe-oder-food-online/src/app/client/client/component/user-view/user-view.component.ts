import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UserService} from "../../../../service/user.service";
import {User2} from "../../../../model/user2";
import {TokenStorageServiceService} from "../../../../service/token-storage-service.service";

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {
  user: User2;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<UserViewComponent>,
              private userService: UserService,
              private tokenStorageService: TokenStorageServiceService,) {
  }

  ngOnInit(): void {
    this.getUserById()
  }

  getUserById() {

    const id = this.tokenStorageService.getUser().id
    console.log(id)
    this.userService.getUserById(id).subscribe(data => {
      this.user = data
      console.log(data)
    }, error => {
      console.log(error)
    })
  }

  closeDialog() {
    this.dialogRef.close()
  }
}
