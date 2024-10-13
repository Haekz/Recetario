import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecetaAllPage } from './receta-all.page';

describe('RecetaAllPage', () => {
  let component: RecetaAllPage;
  let fixture: ComponentFixture<RecetaAllPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RecetaAllPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
