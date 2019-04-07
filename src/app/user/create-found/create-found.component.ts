import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AgmCircle, AgmMap} from '@agm/core';
import {ThingsService} from '../../core/services/things.service';

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
    'date': new FormControl(new Date(), [
      Validators.required
    ]),
    'addressText': new FormControl('', [
      Validators.required
    ]),
    'addressCenterLat': new FormControl('', [
      Validators.required
    ]),
    'addressCenterLng': new FormControl('', [
      Validators.required
    ]),
    'addressRadius': new FormControl('', [
      Validators.required
    ]),
  });
  maxDate = new Date();

  get name() { return this.form.get('name'); }
  get description() { return this.form.get('description'); }
  get date() { return this.form.get('date'); }
  get addressText() { return this.form.get('addressText'); }
  get addressCenterLat() { return this.form.get('addressCenterLat'); }
  get addressCenterLng() { return this.form.get('addressCenterLng'); }
  get addressRadius() { return this.form.get('addressRadius'); }

  constructor(private thingsService: ThingsService) { }

  ngOnInit() {
  }

  getNameErrorMessage() {
    return this.name.hasError('required') ? 'Name cannot be blank' : '';
  }

  getDescriptionErrorMessage() {
    return '';
  }

  getDateErrorMessage() {
    return this.date.hasError('required') ? 'Date cannot be blank' : '';
  }

  getAddressTextErrorMessage() {
    return this.addressText.hasError('required') ? 'Address cannot be blank' : '';
  }

  public handleAddressChange(address) {
    console.log(address);
    if (address.geometry) {
      this.lat = address.geometry.location.lat();
      this.lng = address.geometry.location.lng();
      this.map.triggerResize();
    }
  }

  public handleMapCicleChange() {
    this.addressCenterLat.setValue(this.mapCircle.latitude);
    this.addressCenterLng.setValue(this.mapCircle.longitude);
    this.addressRadius.setValue(this.mapCircle.radius);
  }

  submit(e) {
    e.preventDefault();
    if (this.form.valid) {
      this.thingsService.createFound(
        this.name.value,
        this.description.value,
        this.date.value,
        this.addressText.value,
        this.addressCenterLat.value,
        this.addressCenterLng.value,
        this.addressRadius.value,
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
