import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {LatLngLiteral} from '@agm/core/services/google-maps-types';
import {AgmCircle, AgmMap} from '@agm/core';
import {Thing} from '../../core/interfaces/thing.interface';
import {ThingsService} from '../../core/services/things.service';
import {DataFilterParam} from '../../core/classes/data-filter-param.class';

@Component({
  selector: 'app-search-found',
  templateUrl: './search-found.component.html',
  styleUrls: ['./search-found.component.scss']
})
export class SearchFoundComponent implements OnInit {
  @ViewChild(AgmMap) map: AgmMap;
  @ViewChild(AgmCircle) mapCircle: AgmCircle;
  @ViewChild('name') name: ElementRef;
  navItems = [
    {link: '/user/lost-create', text: 'Create lost'},
    {link: '/user/lost-create', text: 'test1'},
    {link: '/user/lost-create', text: 'test2'},
  ];

  lat = 51.678418;
  lng = 7.809007;
  radius = 10000;
  things: Thing[];

  location_center_lat: number;
  location_center_lng: number;
  location_radius: number;
  constructor(private thingsService: ThingsService) { }

  ngOnInit() {
    this.location_center_lat = this.lat;
    this.location_center_lng = this.lng;
    this.location_radius = this.radius;
    this.search();
  }

  public handleAddressChange(address) {
    if (address.geometry) {
      this.lat = address.geometry.location.lat();
      this.lng = address.geometry.location.lng();
      this.map.triggerResize();
    }
  }

  handleMapCircleCenterChange(p: LatLngLiteral) {
    this.location_center_lat = p.lat;
    this.location_center_lng = p.lng;
  }

  handleMapCircleRadiusChange(radius: number) {
    this.location_radius = radius;
  }

  search() {
    const test = this.thingsService.getAllFound(
      1,
      20,
      '',
      '',
      [
        new DataFilterParam('name', this.name.nativeElement.value),
        new DataFilterParam('location_center_lat', this.location_center_lat),
        new DataFilterParam('location_center_lng', this.location_center_lng),
        new DataFilterParam('location_radius', this.location_radius),
      ]
    );
    test.subscribe(res => this.things = res);
  }
}
