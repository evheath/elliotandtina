import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LodgingPageComponent } from './lodging-page.component';

describe('LodgingPageComponent', () => {
  let component: LodgingPageComponent;
  let fixture: ComponentFixture<LodgingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LodgingPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LodgingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
