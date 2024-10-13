import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecetaListPage } from './receta-list.page';

describe('RecetaListPage', () => {
  let component: RecetaListPage;
  let fixture: ComponentFixture<RecetaListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RecetaListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
