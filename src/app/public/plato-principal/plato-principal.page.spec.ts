import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlatoPrincipalPage } from './plato-principal.page';

describe('PlatoPrincipalPage', () => {
  let component: PlatoPrincipalPage;
  let fixture: ComponentFixture<PlatoPrincipalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatoPrincipalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
