import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { IgxGridModule } from 'igniteui-angular';
import { ListDecksComponent } from './list-decks.component';

describe('ListDecksComponent', () => {
  let component: ListDecksComponent;
  let fixture: ComponentFixture<ListDecksComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
	  imports: [NoopAnimationsModule, IgxGridModule, ListDecksComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDecksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
