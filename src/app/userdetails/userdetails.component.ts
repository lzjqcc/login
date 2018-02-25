import {Component, ElementRef, Renderer2} from '@angular/core';
import {User, UserDetails} from '../login/user';

@Component({
  selector: 'user-details',
  templateUrl: './userdetails.compont.html',
  styleUrls: ['./userdetails.component.css']
})
export class UserdetailsComponent {
  userDetails: UserDetails = new UserDetails();
}
