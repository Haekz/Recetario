import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecetaAddPage } from './receta-add.page';

describe('RecetaAddPage', () => {
  let component: RecetaAddPage;
  let fixture: ComponentFixture<RecetaAddPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RecetaAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
