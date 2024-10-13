import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecetaDetailPage } from './receta-detail.page';

describe('RecetaDetailPage', () => {
  let component: RecetaDetailPage;
  let fixture: ComponentFixture<RecetaDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RecetaDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
