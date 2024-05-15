import { Component, OnInit } from '@angular/core';
import { ColumnType } from 'igniteui-angular';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  standalone: true,
  imports: [SharedModule],
})
export class HomePageComponent implements OnInit {
  title = 'home-page';

  ngOnInit(): void {}

  public onColumnInit(column: ColumnType): void {
    if (column.field === 'RegistererDate') {
      column.formatter = (date) => date.toLocaleDateString();
    }
  }
}
