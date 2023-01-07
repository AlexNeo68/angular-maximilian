import { Component, ComponentFactoryResolver } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Observer, Subject } from 'rxjs';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { AuthResponse, AuthService } from '../auth.service';
import { User } from '../user.model';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  isLogginMode: boolean = true;
  isLoading: boolean = false;
  error: string = '';
  observer: Observable<AuthResponse>;
  user: Subject<User>;

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}
  toggleLoginMode() {
    this.isLogginMode = !this.isLogginMode;
  }
  onSubmit(form: NgForm) {
    if (!form.valid) return;

    this.isLoading = true;
    this.error = '';

    const email = form.value.email;
    const password = form.value.password;

    if (this.isLogginMode) {
      this.observer = this.authService.signin(email, password);
    } else {
      this.observer = this.authService.signup(email, password);
    }

    this.observer.subscribe(
      (resData) => {
        console.log(resData);
        this.router.navigate(['/recipes']);
        this.isLoading = false;
      },
      (errorMessage) => {
        this.error = errorMessage;
        this.isLoading = false;
      }
    );
    form.reset();
  }

  onShowAlert(message: string) {
    const alertCmpFactory =
      this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
  }

  onErrorHandle() {
    this.error = '';
  }
}
