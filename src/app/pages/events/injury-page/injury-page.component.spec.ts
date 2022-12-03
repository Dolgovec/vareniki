import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InjuryPageComponent } from './injury-page.component';

describe('InjuryPageComponent', () => {
  let component: InjuryPageComponent;
  let fixture: ComponentFixture<InjuryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InjuryPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InjuryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
