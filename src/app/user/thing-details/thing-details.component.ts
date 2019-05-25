import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ThingsService} from '../../core/services/things.service';
import {Thing} from '../../core/interfaces/thing.interface';

@Component({
  selector: 'app-thing-details',
  templateUrl: './thing-details.component.html',
  styleUrls: ['./thing-details.component.scss']
})
export class ThingDetailsComponent implements OnInit {
  id: number;
  thing: Thing;
  private sub: any;
  constructor(private route: ActivatedRoute, private thingsService: ThingsService) { }

  getNavItems() {
    return [
      {link: ['/user/thing-edit', this.id], text: 'Edit'},
    ];
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      const sub = this.thingsService.getThing(this.id);
      sub.subscribe(thing => {
        this.thing = thing;
      });
    });
  }

}
