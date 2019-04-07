import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  lat: number = 51.678418;
  lng: number = 7.809007;

  ngOnInit() {
  }

  public handleAddressChange(address) {
    console.log(address);
    if (address.geometry) {
      this.lat = address.geometry.location.lat();
      this.lng = address.geometry.location.lng();
    }
  }

}
