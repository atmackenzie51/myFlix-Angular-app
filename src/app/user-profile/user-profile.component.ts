import { Component, OnInit, Input } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * Component representing the user profile
 * @selector 'app-user-profile'
 * @templateUrl './user-profile.component.html'
 * @styleUrls ['./user-profile.component.scss']
 */

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '', FavoriteMovies: [] };
  FavoriteMovies: any[] = [];
  movies: any[] = [];
  user: any = {};

  /** 
  * Called when creating an instance of the class
  * @param fetchProfile - connects the client to the API
  * @param snackBar - provides feedback after user interaction by displaying notifications
  * @param router - the Router module for navigation
  */

  constructor(
    public fetchProfile: UserRegistrationService,
    public snackBar: MatSnackBar,
    private router: Router
  ) { }

  //once component has mounted these functions must be invoked, ie the profile info of the user & their list of fav movies
  ngOnInit(): void {
    this.userProfile();
    this.getFavMovies();
  }

  userProfile(): void {
    this.user = this.fetchProfile.getOneUser();
    this.userData.Username = this.user.Username;
    this.userData.Password = this.user.Password;
    this.userData.Email = this.user.Email;
    this.userData.Birthday = this.user.Birthday;
    //this.fetchProfile.getAllMovies().subscribe((response) => {
    //  this.FavoriteMovies = response.filter((movie: any) => this.user.FavoriteMovies.includes(movie._id));
    //});
  }

  updateProfile(): void {
    this.fetchProfile.editUser(this.userData).subscribe((response) => {
      console.log('Profile Updated to', response);
      localStorage.setItem('user', JSON.stringify(response));
      this.snackBar.open('Profile updated successfully', 'OK', {
        duration: 2000
      });
    });
  }

  deleteUser(): void {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      this.fetchProfile.deleteUser().subscribe((response) => {
        console.log('Deleted User', response);
        localStorage.clear();
        this.router.navigate(['welcome']);
      });
    }
  }

  getFavMovies(): void {
    this.user = this.fetchProfile.getOneUser();
    this.userData.FavoriteMovies = this.user.FavoriteMovies;
    this.FavoriteMovies = this.user.FavoriteMovies;
  }



}