import { Component, OnInit } from '@angular/core';
import {ThingsService} from '../../core/services/things.service';
import {Thing} from '../../core/interfaces/thing.interface';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  things: Thing[];
  constructor(private thingsService: ThingsService) { }

  ngOnInit() {
    const test = this.thingsService.getAll();
    test.subscribe(res => this.things = res);
  }

}
