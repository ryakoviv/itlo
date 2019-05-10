import {Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {ThingsService} from '../../core/services/things.service';
import {Thing} from '../../core/interfaces/thing.interface';
import {AgmCircle, AgmMap} from '@agm/core';
import {LatLngLiteral} from '@agm/core/services/google-maps-types';
import {DataFilterParam} from '../../core/classes/data-filter-param.class';
import {ActivatedRoute, Router} from '@angular/router';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-search-lost',
  templateUrl: './search-lost.component.html',
  styleUrls: ['./search-lost.component.scss']
})
export class SearchLostComponent implements OnInit {
  @ViewChild(AgmMap) map: AgmMap;
  @ViewChild(AgmCircle) mapCircle: AgmCircle;
  @ViewChild('name') name: ElementRef;
  navItems = [
    {link: '/user/found-create', text: 'Create found'},
    {link: '/user/lost-create', text: 'Create lost'},
  ];

  thingName: string;
  lat: number;
  lng: number;
  radius: number;
  things: Thing[];

  location_center_lat: number;
  location_center_lng: number;
  location_radius: number;
  constructor(private thingsService: ThingsService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.initDataFromQueryParams();
    this.location_center_lat = this.lat;
    this.location_center_lng = this.lng;
    this.location_radius = this.radius;
    this.search();
  }

  private initDataFromQueryParams() {
    this.activatedRoute.queryParams.pipe(first()).subscribe(params => {
      this.lat = +params.location_center_lat || 51.678418;
      this.lng = +params.location_center_lng || 7.809007;
      this.radius = +params.location_radius || 10000;
      this.thingName = params.name || '';
    });
  }

  private saveDataInQueryParams() {
    this.router.navigate(
      [],
      {
        relativeTo: this.activatedRoute,
        queryParams: {
          name: this.name.nativeElement.value,
          location_center_lat: this.location_center_lat,
          location_center_lng: this.location_center_lng,
          location_radius: this.location_radius
        },
        queryParamsHandling: 'merge', // remove to replace all query params by provided
        replaceUrl: true
      }
    );
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
    this.thingsService.getAllLost(
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
    ).subscribe(res => this.things = res);

    this.saveDataInQueryParams();
  }

}
