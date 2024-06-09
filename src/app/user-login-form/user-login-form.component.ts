import { Component, OnInit, Input } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

interface UserData {
  Username: string;
  Password: string;
}

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrl: './user-login-form.component.scss'
})
export class UserLoginFormComponent implements OnInit {
  @Input() userData: UserData = { Username: "", Password: "" };

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    console.log(this.userData);
  }

  logInUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((result) => {
      localStorage.setItem('user', JSON.stringify(this.userData.Username));
      localStorage.setItem('token', result.token);
      console.log(result);
      this.dialogRef.close(); // This will close the modal on success!
      this.snackBar.open(`Login successful.`, "OK", {
        duration: 2000
      });

    }, (response) => {
      console.log(response);
      this.snackBar.open("Login unsuccessful", "OK", {
        duration: 2000
      })
    })
  }
}