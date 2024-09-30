import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BuscarResultPage } from './buscar-result.page';

describe('BuscarResultPage', () => {
  let component: BuscarResultPage;
  let fixture: ComponentFixture<BuscarResultPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarResultPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
