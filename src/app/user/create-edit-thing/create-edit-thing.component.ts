import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AgmCircle, AgmMap} from '@agm/core';
import {ThingsService} from '../../core/services/things.service';
import {LatLngLiteral} from '@agm/core/services/google-maps-types';
import {Router, ActivatedRoute} from '@angular/router';
import {Thing} from '../../core/interfaces/thing.interface';

@Component({
  selector: 'app-create-edit-thing',
  templateUrl: './create-edit-thing.component.html',
  styleUrls: ['./create-edit-thing.component.scss']
})
export class CreateEditThingComponent implements OnInit {
  static TYPE_CREATE_LOST = 'create_lost';
  static TYPE_CREATE_FOUNT = 'create_found';
  static TYPE_EDIT = 'edit';
  type: string;
  @ViewChild(AgmMap) map: AgmMap;
  @ViewChild(AgmCircle) mapCircle: AgmCircle;
  imagePlaceholderSrc: string;
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

  editThing: Thing;
  editThingId: number;

  get name() { return this.form.get('name'); }
  get description() { return this.form.get('description'); }
  get happened_at() { return this.form.get('happened_at'); }
  get location_text() { return this.form.get('location_text'); }
  get location_center_lat() { return this.form.get('location_center_lat'); }
  get location_center_lng() { return this.form.get('location_center_lng'); }
  get location_radius() { return this.form.get('location_radius'); }
  get imageFile() { return this.form.get('imageFile'); }

  constructor(private thingsService: ThingsService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route
      .data
      .subscribe(data => {
        this.type = data.type;
        if (this.type === CreateEditThingComponent.TYPE_EDIT) {
          this.route.params.subscribe(params => {
            this.editThingId = +params['id'];
            const sub = this.thingsService.getThing(this.editThingId);
            sub.subscribe(thing => {
              this.editThing = thing;
              this.fillFormWithThingData();
            });
          });
        }
      });
  }

  protected fillFormWithThingData() {
    if (this.editThing.image) {
      this.imagePlaceholderSrc = this.editThing.image.src;
    }
    this.form.get('name').setValue(this.editThing.name);
    this.form.get('description').setValue(this.editThing.description);
    this.form.get('happened_at').setValue(new Date(this.editThing.happened_at * 1000));
    this.form.get('location_text').setValue(this.editThing.location_text);
    this.lat = this.editThing.location_center_lat;
    this.lng = this.editThing.location_center_lng;
    this.radius = this.editThing.location_radius;
  }

  getPageHeader() {
    switch (this.type) {
      case CreateEditThingComponent.TYPE_CREATE_LOST:
        return 'Register found thing';
      case CreateEditThingComponent.TYPE_CREATE_FOUNT:
        return 'Register lost thing';
      case CreateEditThingComponent.TYPE_EDIT:
        if (this.editThing) {
          return 'Edit ' + this.editThing.name;
        }
    }
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

  getCreateMethodName() {
    switch (this.type) {
      case CreateEditThingComponent.TYPE_CREATE_FOUNT:
        return 'createFound';
      case CreateEditThingComponent.TYPE_CREATE_LOST:
        return 'createLost';
      case CreateEditThingComponent.TYPE_EDIT:
        return 'updateThing';
    }
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
      this.thingsService[this.getCreateMethodName()](
        this.name.value,
        this.description.value,
        happenedAtUnix,
        this.location_text.value,
        this.location_center_lat.value,
        this.location_center_lng.value,
        this.location_radius.value,
        this.imageFile.value,
        this.editThingId
      ).subscribe(data => {
        this.router.navigate(['user/thing-details', data.id]);
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
