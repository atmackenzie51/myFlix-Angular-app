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
    this.userData.Birthday = this.formatDate(this.user.Birthday);
    //this.fetchProfile.getAllMovies().subscribe((response) => {
    //  this.FavoriteMovies = response.filter((movie: any) => this.user.FavoriteMovies.includes(movie._id));
    //});
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getUTCFullYear();
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const day = date.getUTCDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  updateProfile(): void {
    this.fetchProfile.editUser(this.userData).subscribe({
      next: (response) => {
        console.log('Profile Updated to:', response);
        localStorage.setItem('user', JSON.stringify(response));
        this.snackBar.open('Profile updated successfully', 'OK', {
          duration: 2000
        });
      },
      error: (error) => {
        console.error('Error updating profile:', error);
        this.snackBar.open('Failed to update profile', 'OK', {
          duration: 2000
        });
      }
    });
  }


  //chatGPT thinks that maybe the error code 200 that my API uses is incompatible with Angular's required 204 for a correct deletion request. However, Heroku will not log me in and update the API. The MFA is incorrect for some reason and they will not provide support without logging in...
  deleteUser(): void {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      console.log('Attempting to delete user:', this.userData.Username);
      this.fetchProfile.deleteUser().subscribe({
        next: () => {
          console.log('Deleted user:', this.userData.Username);
          localStorage.clear();
          console.log('Local storage cleared');
          this.navigateToWelcomeScreen();
        },
        error: (error) => {
          console.error('Error deleting user:', error);
          this.snackBar.open('Failed to delete user. Please try again later.', 'OK', {
            duration: 3000
          });
        }
      });
    }
  }

  private handlePostDeleteActions(): void {
    try {
      localStorage.clear();
      console.log('Local storage cleared');
      this.navigateToWelcomeScreen();
    } catch (err) {
      console.error('Error clearing local storage:', err);
    }
  }

  private navigateToWelcomeScreen(): void {
    console.log('Attempting to navigate to welcome screen');
    this.router.navigate(['welcome']).then(() => {
      console.log('Navigation to welcome screen successful');
    }).catch((err) => {
      console.error('Navigation to welcome screen failed', err);
    });
  }



  getFavMovies(): void {
    this.user = this.fetchProfile.getOneUser();
    this.userData.FavoriteMovies = this.user.FavoriteMovies;
    this.FavoriteMovies = this.user.FavoriteMovies;
  }



}