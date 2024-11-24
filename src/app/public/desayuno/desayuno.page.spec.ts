import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DesayunoPage } from './desayuno.page';

describe('DesayunoPage', () => {
  let component: DesayunoPage;
  let fixture: ComponentFixture<DesayunoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DesayunoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
