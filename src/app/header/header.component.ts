import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  userSubscription: Subscription;
  isAuth: boolean = false;
  constructor(
    private dataStorage: DataStorageService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userSubscription = this.authService.user.subscribe(
      (user) => (this.isAuth = !!user)
    );
  }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  onSaveRecipes() {
    this.dataStorage.store();
  }

  onFetchRecipes() {
    this.dataStorage.index();
  }

  onLogout() {
    this.authService.logout();
  }
}
