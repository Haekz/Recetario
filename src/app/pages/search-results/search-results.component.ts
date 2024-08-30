import { Component } from '@angular/core';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent {
  recipes = [
    { name: 'Pancakes', image: 'assets/images/pancakes.jpg', category: 'Breakfast' },
    { name: 'Caesar Salad', image: 'assets/images/salad.jpg', category: 'Lunch' },
    { name: 'Steak', image: 'assets/images/steak.jpg', category: 'Dinner' }
  ];

  constructor() {}
}
