import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, CommonModule], // Add CommonModule here
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected title = 'hello-angular';
  showSidebar: boolean = true;

  private router = inject(Router);

  ngOnInit(): void {
    console.log('App component ngOnInit - Initial showSidebar:', this.showSidebar);
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      console.log('NavigationEnd event - urlAfterRedirects:', event.urlAfterRedirects);
      const currentUrl = event.urlAfterRedirects;
      this.showSidebar = !(currentUrl === '/' || currentUrl.includes('/login') || currentUrl.includes('/register'));
      console.log('showSidebar updated to:', this.showSidebar);
    });
  }
}
