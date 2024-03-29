import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../service/api.service';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { RESOURCE_CACHE_PROVIDER } from '@angular/platform-browser-dynamic';
import { CurrencyService } from '../service/currency.service';

@Component({
  selector: 'app-coin-detail',
  templateUrl: './coin-detail.component.html',
  styleUrls: ['./coin-detail.component.scss']
})
export class CoinDetailComponent implements OnInit {
  coinData : any;
  coinId! : string;
  days : number=1;
  currency : string ="INR";
  public lineChartData: ChartConfiguration['data'] = {
   datasets: [{

    data: [],
    label: 'Price Trends',
    fill: false,
    borderColor: '#4bc0c0',
    backgroundColor: 'rgba(148,159,177,0.2',
    pointBackgroundColor: '#4bc0c0',
    pointBorderColor: '#4bc0c0',
    pointHoverBackgroundColor: '#4bc0c0',
   }],
   labels: []
  }
  public lineChartOptions: ChartConfiguration['options'] = {
  elements:{
  point:{
    radius:1
  }
   },
   scales : {
   },
   plugins: {
    legend: {display:true}
   }
  }
  public lineChartType: ChartType = 'line';
  @ViewChild(BaseChartDirective) mylineChart !: BaseChartDirective;


  constructor(private api : ApiService, private activatedRoute: ActivatedRoute, private currencyService : CurrencyService) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(val =>{ 
      this.coinId = val['id'];
  });
  this.getCoinData();
  this.getGraphData(this.days);
  this.currencyService.getCurrency().subscribe(val =>{
    this.currency = val;
    this.getGraphData(this.days);
    this.coinData()
  })
   }

  getCoinData(){
    this.api.getCurrencyById(this.coinId)
    .subscribe(res => {
     console.log(res);
     this.coinData = res;
     if(this.currency === "USD"){
     res.market_data.current_price.inr = res.market_data.current_price.usd;
     }
     res.market_data.current_price.inr = res.market_data.current_price.inr;
     res.market_data.market_cap.inr = res.market_data.market_cap.inr;


     });
  }
  getGraphData(days: number){
    this.days = days
    this.api.getGraphicalCurrencyData(this.coinId,this.currency,this.days)
    .subscribe(res=>{
      console.log(res);
      setTimeout(() => {
        this.mylineChart.chart?.update();
      }, 200);
      this.lineChartData.datasets[0].data = res.prices.map((a:any)=>{
        return a[1];
      });
      this.lineChartData.labels = res.prices.map((a:any)=>{
        let date = new Date(a[0]);
        let time = date.getHours() > 12 ?
        `${date.getHours() - 12}: ${date.getMinutes()} PM` :
        `${date.getHours()}: ${date.getMinutes()} AM`
        return days === 1 ? time : date.toLocaleDateString();
      });
    });
  }
  }



