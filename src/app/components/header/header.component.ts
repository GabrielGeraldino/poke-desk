import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(private router: Router) {}

  async navigate(path: string) {
    await this.router.navigateByUrl(`/${path}`);
  }
}
