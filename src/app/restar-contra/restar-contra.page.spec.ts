import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RestarContraPage } from './restar-contra.page';

describe('RestarContraPage', () => {
  let component: RestarContraPage;
  let fixture: ComponentFixture<RestarContraPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RestarContraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
