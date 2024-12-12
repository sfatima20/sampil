import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userIsAuthenticated: boolean = false;
  private authListenerSub: Subscription | undefined;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSub = this.authService.getAuthStatusListener().subscribe((isAuthenticated: boolean) => {
      this.userIsAuthenticated = isAuthenticated;
    });
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    if (this.authListenerSub) {
      this.authListenerSub.unsubscribe();
    }
  }


}