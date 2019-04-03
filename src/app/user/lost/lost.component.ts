import { Component, OnInit } from '@angular/core';
import {Thing} from '../../core/interfaces/thing.interface';
import {ThingsService} from '../../core/services/things.service';

@Component({
  selector: 'app-lost',
  templateUrl: './lost.component.html',
  styleUrls: ['./lost.component.scss']
})
export class LostComponent implements OnInit {

  things: Thing[];
  constructor(private thingsService: ThingsService) { }

  ngOnInit() {
    const test = this.thingsService.getLostByUser();
    test.subscribe(res => this.things = res);
  }

}
