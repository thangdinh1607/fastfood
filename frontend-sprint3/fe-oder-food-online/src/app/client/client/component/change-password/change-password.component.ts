import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PasswordService} from "../../../../service/password.service";
import {PasswordDto} from "../../../../model/password-dto";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {comparePassword} from "./validation/compare-password";
import {ToastrService} from "ngx-toastr";
import {TokenStorageServiceService} from "../../../../service/token-storage-service.service";
import {UserService} from "../../../../service/user.service";
import {User2} from "../../../../model/user2";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<ChangePasswordComponent>,
              private passwordService : PasswordService,
              private toast : ToastrService,
              private tokenStorageService : TokenStorageServiceService,
              private userService : UserService) { }

user : User2
  password: PasswordDto;
  id: number;
  name : string;
  checkPassForm = new FormGroup({
    oldPassword: new FormControl('', [Validators.required, Validators.pattern('^\\w{5,}$')]),
    newPassword: new FormControl('', [Validators.required, Validators.pattern('^\\w{5,}$')]),
    confirmPassword: new FormControl('')
  }, comparePassword);
  ngOnInit(): void {
    this.getUserById()
  }

  getUserById() {
    const id = this.tokenStorageService.getUser().id
    this.id=id
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
  changePassword() {
    this.password = this.checkPassForm.value;
    const oldPassword = this.password.oldPassword;
    const newPassword = this.password.newPassword;
    const confirmPassword = this.password.confirmPassword;
    this.checkValidate(oldPassword);
    if (oldPassword === '') {
      this.toast.warning('Chưa nhập mật khẩu', 'Chú ý !');
    } else {
      if (!this.checkValidate(oldPassword)) {
        this.toast.warning('Mật khẩu phải là kí tự chữ a -z không dấu , kí tự số 0-9 , ít nhất 5 kí tự ', 'Chú ý');
      } else {
        if (newPassword === '') {
          this.toast.warning('Chưa nhập mật khẩu mới', 'Thông báo !');
        } else {
          if (!this.checkValidate(newPassword)) {
            this.toast.warning('Mật khẩu phải là kí tự chữ a -z không dấu , kí tự số 0-9 , ít nhất 5 kí tự ', 'Chú ý');
          } else {
            if (confirmPassword === '') {
              this.toast.warning('Chưa nhập lại mật khẩu mới', 'Thông báo');
            } else {
              if (newPassword === confirmPassword) {
                this.passwordService.sendPassword(this.id, this.password).subscribe(data => {
                  this.closeDialog();
                  this.toast.success(data.responseMsg, 'Thông báo !');
                  console.log(data);
                }, error => {
                  this.toast.warning(error.error.responseMsg, 'Thông báo !');
                  console.log(error);
                });
              } else {
                this.toast.warning('Mật khẩu không trùng khớp', 'Thông báo');
              }
            }
          }
        }
      }
    }
  }
  checkValidate(a: string) {
    const check = /^\w{5,}$/;
    return check.test(a);
  }
}
