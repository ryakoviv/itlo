import { Component, OnInit } from '@angular/core';
import {Thing} from '../../core/interfaces/thing.interface';
import {ThingsService} from '../../core/services/things.service';

@Component({
  selector: 'app-found',
  templateUrl: './found.component.html',
  styleUrls: ['./found.component.scss']
})
export class FoundComponent implements OnInit {

  things: Thing[];
  constructor(private thingsService: ThingsService) { }

  ngOnInit() {
    const test = this.thingsService.getFoundByUser();
    test.subscribe(res => this.things = res);
  }

  getNavItems(): any[] {
      return [
        {link: ['/user/found-create'], text: 'Create found'},
        {link: ['/user/lost-create'], text: 'Create lost'}
      ];
  }

}
