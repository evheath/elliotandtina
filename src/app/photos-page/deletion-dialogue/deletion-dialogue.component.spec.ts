import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletionDialogueComponent } from './deletion-dialogue.component';

describe('DeletionDialogueComponent', () => {
  let component: DeletionDialogueComponent;
  let fixture: ComponentFixture<DeletionDialogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletionDialogueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletionDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
