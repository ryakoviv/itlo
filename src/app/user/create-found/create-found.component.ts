import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AgmCircle, AgmMap} from '@agm/core';
import {ThingsService} from '../../core/services/things.service';
import {LatLngLiteral} from '@agm/core/services/google-maps-types';

@Component({
  selector: 'app-create-found',
  templateUrl: './create-found.component.html',
  styleUrls: ['./create-found.component.scss']
})
export class CreateFoundComponent implements OnInit {
  @ViewChild(AgmMap) map: AgmMap;
  @ViewChild(AgmCircle) mapCircle: AgmCircle;
  lat: number = 51.678418;
  lng: number = 7.809007;
  radius: number = 10000;

  form = new FormGroup({
    'name': new FormControl('', [
      Validators.required
    ]),
    'description': new FormControl(''),
    'happened_at': new FormControl(new Date(), [
      Validators.required
    ]),
    'location_text': new FormControl('', [
      Validators.required
    ]),
    'location_center_lat': new FormControl('', [
      Validators.required
    ]),
    'location_center_lng': new FormControl('', [
      Validators.required
    ]),
    'location_radius': new FormControl(this.radius, [
      Validators.required
    ]),
    'imageFile': new FormControl(),
  });
  maxDate = new Date();

  get name() { return this.form.get('name'); }
  get description() { return this.form.get('description'); }
  get happened_at() { return this.form.get('happened_at'); }
  get location_text() { return this.form.get('location_text'); }
  get location_center_lat() { return this.form.get('location_center_lat'); }
  get location_center_lng() { return this.form.get('location_center_lng'); }
  get location_radius() { return this.form.get('location_radius'); }
  get imageFile() { return this.form.get('imageFile'); }

  constructor(private thingsService: ThingsService) { }

  ngOnInit() {
  }

  getNameErrorMessage() {
    return this.name.hasError('required') ? 'Name cannot be blank' : '';
  }

  getDescriptionErrorMessage() {
    return '';
  }

  getHappenedAtErrorMessage() {
    return this.happened_at.hasError('required') ? 'Date cannot be blank' : '';
  }

  getLocationTextErrorMessage() {
    return this.location_text.hasError('required') ? 'Address cannot be blank' : '';
  }

  public handleAddressChange(address) {
    this.location_text.setValue(address.formatted_address);
    if (address.geometry) {
      this.lat = address.geometry.location.lat();
      this.lng = address.geometry.location.lng();
      this.map.triggerResize();
    }
  }

  handleMapCircleCenterChange(p: LatLngLiteral) {
    this.location_center_lat.setValue(p.lat);
    this.location_center_lng.setValue(p.lng);
  }

  handleMapCircleRadiusChange(radius: number) {
    this.location_radius.setValue(radius);
  }

  submit(e) {
    e.preventDefault();
    if (this.form.valid) {
      const happenedAtUnix = Math.round(this.happened_at.value.getTime() / 1000);
      this.thingsService.createFound(
        this.name.value,
        this.description.value,
        happenedAtUnix,
        this.location_text.value,
        this.location_center_lat.value,
        this.location_center_lng.value,
        this.location_radius.value,
        this.imageFile.value,
      ).subscribe(data => {
        console.log('success');
      }, error => {
        if (error.status === 404) {
          console.log('status 404');
        } else {
          console.log('status else');
        }
      });
    }
  }

}
