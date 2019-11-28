import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-donatePage',
  templateUrl: './donatePage.component.html',
  styleUrls: ['./donatePage.component.css']
})
export class DonatePageComponent implements OnInit {
  pieData: any;
  dimensions: any;
  donation: number;
  target: number;
  donationPercent: number;

  constructor(private http: HttpClient) {
    this.dimensions = {height : 300, width: 300};
  }

  ngOnInit() {
  }

  updateData(donation: number){
    this.http.get('assets/data.json').subscribe(data => {
      var dPie1 = [{ name : 'Target', value : data['Target'] - donation}, { name : 'Your Donation', value : donation + data['Received']}]
      this.pieData = dPie1;
      this.donation = donation;
      this.target = data['Target'];
      this.donationPercent = Math.floor((donation * 100) / this.target); 
    })
  }

  submitClicked(){
    var donation = parseInt((document.getElementById('DonationAmount') as HTMLInputElement).value);
    if(donation){
      this.updateData(donation);
    }
    (document.getElementById('DonationAmount') as HTMLInputElement).value = "";
  }
}
