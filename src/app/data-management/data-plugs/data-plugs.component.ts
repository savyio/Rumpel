import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {DataPlugService} from "../data-plug.service";
import {MarketSquareService} from "../../market-square/market-square.service";

@Component({
  selector: 'rump-data-plugs',
  templateUrl: './data-plugs.component.html',
  styleUrls: ['./data-plugs.component.scss']
})
export class DataPlugsComponent implements OnInit {
  private dataplugs: Observable<Array<any>>;

  constructor(private dataplugsSvc: DataPlugService,
              private marketSvc: MarketSquareService) { }

  ngOnInit() {
    this.dataplugs = this.dataplugsSvc.dataplugs$;
  }

  openPlugPopup(plug: any) {
    let loginName = plug.name.charAt(0).toUpperCase() + plug.name.slice(1);

    let w = window.innerWidth;
    let h = window.innerHeight;

    let popupWidth = w * 0.6; let left = w * 0.2;
    let popupHeight = h * 0.7; let top = h * 0.15;

    let windowRef = window.open(
      `https://${this.marketSvc.hatDomain}/hatlogin?name=${loginName}&redirect=${plug.url}`,
      `Setting up ${plug.name} data plug`,
      `menubar=no,location=yes,resizable=yes,status=yes,chrome=yes,left=${left},top=${top},width=${popupWidth},height=${popupHeight}`
    );
  }
}
