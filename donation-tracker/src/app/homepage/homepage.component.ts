import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  pieData: any;
  dimensions: any;

  constructor(private http: HttpClient) {
    this.dimensions = {height : 300, width: 300};
    this.loadData();
  }

  ngOnInit() {
  }

  loadData(){
    this.http.get('assets/data.json').subscribe(data => {
      var dPie1 = [{ name : 'Received', value : data['Received']}, { name : 'Remaining', value : data['Target'] - data['Received']}]
      this.pieData = dPie1;
    })
  }  
}
