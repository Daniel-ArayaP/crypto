import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-coin-detail',
  templateUrl: './coin-detail.component.html',
  styleUrls: ['./coin-detail.component.scss']
})
export class CoinDetailComponent implements OnInit {
  coinData : any;
  coinId !: string;
  days : number=1;
  currency : string ="INR";


  constructor(private api : ApiService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(val =>{ 
      this.coinId = val['id'];
  });
  this.getCoinData();
  }

  getCoinData(){
    this.api.getCurrencyById(this.coinId)
    .subscribe(res => {
     console.log(res);
     this.coinData = res;
     });
  }
}
