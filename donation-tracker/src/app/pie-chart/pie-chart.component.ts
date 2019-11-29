import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-pie-chart',
  template: `<div id="pie"><svg></svg>`,
  encapsulation: ViewEncapsulation.None
})
export class PieChartComponent implements OnInit {
  @Input() data: any;
  @Input() dimensions: any;
  @Input() donationComplete: boolean;

  get height(): number { return this.dimensions.height; }
  get width(): number { return this.dimensions.width; }
  radius: number;
  // Arcs & pie
  private arc: any;  private pie: any;  private slices: any;
  private color: any;
  // Drawing containers
  private svg: any;  private mainContainer: any;
  private tooltip: any;  private total: number;
  ngOnChanges() {
    this.total = this.data.reduce((sum, it) => sum += it.value, 0);
    this.initialize();
  }

  constructor() {
  }

  ngOnInit() {
    this.tooltip = d3.select('#pie') // or d3.select('#bar')
    .append('div').attr('class', 'tooltip').style('display', 'none').style('opacity', 0);  
  }

  private initialize() {
    this.svg = d3.select('#pie').select('svg');
    this.setSVGDimensions();
    this.color = d3.scaleOrdinal(d3.schemeCategory10);
    this.mainContainer = this.svg.append('g').attr('transform', `translate(${this.radius},${this.radius})`);
    this.pie = d3.pie().sort(null).value((d: any) => d.value);
    this.draw();
  }

  private setSVGDimensions() {
    this.radius = (Math.min(this.width, this.height)) / 2;
    this.svg.attr('width', 2 * this.radius).attr('height', 2 * this.radius);
    this.svg.select('g').attr('transform', 'translate(' + this.radius + ',' + this.radius + ')');
  }
  private draw() {
    this.setArcs();
    this.drawSlices();
  }
  private setArcs() {
    this.arc = d3.arc().outerRadius(this.radius).innerRadius(0);
  }
  private drawSlices() {
    this.slices = this.mainContainer.selectAll('path')
      .remove().exit()
      .data(this.pie(this.data))
      .enter().append('g').append('path')
      .attr('d', this.arc);
    this.slices
    .attr('fill', (d, i) => this.color(i))
    .on('mousemove', function (s) {
      const percent = (Math.abs(s.data.value / this.total) * 100).toFixed(2) + '%';
      this.tooltip .style('top', (d3.event.layerY + 15) + 'px').style('left', (d3.event.layerX) + 'px')
        .style('display', 'block').style('opacity', 1).style('height', '40px')
        this.tooltip.html(`name: ${s.data.name}<br>value: ${s.data.value}<br>share: ${percent}`);
    }.bind(this))
    .on('mouseout', function () {
      this.tooltip.style('display', 'none').style('opacity', 0);
    }.bind(this)); 
  }
}