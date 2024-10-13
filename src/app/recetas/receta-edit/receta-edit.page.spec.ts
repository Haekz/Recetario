import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecetaEditPage } from './receta-edit.page';

describe('RecetaEditPage', () => {
  let component: RecetaEditPage;
  let fixture: ComponentFixture<RecetaEditPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RecetaEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
