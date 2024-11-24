import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EnsaladasPage } from './ensaladas.page';

describe('EnsaladasPage', () => {
  let component: EnsaladasPage;
  let fixture: ComponentFixture<EnsaladasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EnsaladasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
