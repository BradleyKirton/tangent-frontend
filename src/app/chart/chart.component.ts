import { Component, OnInit } from '@angular/core';
import { Input, ElementRef, ViewChild } from '@angular/core';
import { compile } from 'vega-lite';
import { parse, View } from 'vega';


@Component({
  selector: 'vega-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
	view: View;
	@Input() header: string;
	@ViewChild('container') container: ElementRef;

  constructor() { }

  ngOnInit() { }

  /**
  	Render the vega visualisation
  	
  	@param width	The canvas element width
  	@param height	The canvas element height
  */
  render(specification:any): void {    
    const container = this.container.nativeElement as HTMLDivElement;
    
    // Update the specification
    Object.assign(specification, {autosize: {type: "fit", contains: "padding", resize: true}});

    const vegaSpec = compile(specification);
    const runtime = parse(vegaSpec.spec);

    this.view = new View(runtime);
    this.view.renderer('canvas')
      .initialize(this.container.nativeElement)
      .hover()
      .run()
      .finalize();
  }
}
