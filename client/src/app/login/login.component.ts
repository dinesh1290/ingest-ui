import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {environment} from '../../environments/environment';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  buildTimestamp = environment.buildTimestamp;

  constructor(public auth: AuthService, public router: Router) {
    if(auth.isAuthenticated()){
      router.navigate(['/home'])
    }
  }

  ngOnInit() {
  }

}
