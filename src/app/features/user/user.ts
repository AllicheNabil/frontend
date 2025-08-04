import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from './user.service';
import { User } from './user.model';
import { SidebarComponent } from '@app/shared/sidebar/sidebar.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.html',
  styleUrls: ['./user.css'],
  standalone: true,
  imports: [ReactiveFormsModule, SidebarComponent]
})
export class UserComponent implements OnInit {
  profileForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.profileForm = this.fb.group({
      name: [''],
      email: [''],
      specialty: [''],
      address: [''],
      phoneNumber: [''],
      orderNumber: [''],
    });
  }

  ngOnInit(): void {
    this.userService.getProfile().subscribe((user: User) => {
      this.profileForm.patchValue(user);
    });
  }

  onSubmit(): void {
    this.userService
      .updateProfile(this.profileForm.value)
      .subscribe((updatedUser: User) => {
        console.log('Profile updated successfully', updatedUser);
        this.router.navigate(['/patients']); // Navigate to patient page
      });
  }
}