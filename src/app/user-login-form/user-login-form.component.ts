import { Component, OnInit, Input } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrl: './user-login-form.component.scss'
})
export class UserLoginFormComponent implements OnInit {
  @Input() userData = { Username: "", Password: "" };

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void { }

  logInUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((response) => {
      this.dialogRef.close(); // This will close the modal on success!
      console.log(response);
      this.snackBar.open(`Login successful.`, "OK", {
        duration: 2000
      });
      localStorage.setItem('user', JSON.stringify(response.user));
      localStorage.setItem('token', response.token);
      console.log(response.user);
    }, (response) => {
      console.log(response);
      this.snackBar.open("Login unsuccessful", "OK", {
        duration: 2000
      })
    })
  }
}