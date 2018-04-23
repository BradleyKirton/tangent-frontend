import { Component, OnInit } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { UserService } from '../user.service';
import { User, Profile } from '../models';
import { compile } from 'vega-lite';
import { parse, View } from 'vega';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  
  @ViewChild('ageDistribution') ageDistribution: ElementRef;
	@ViewChild('genderDistribution') genderDistribution: ElementRef;

  constructor(private userService: UserService) { }

  ngOnInit() {
  	this.renderAgeDistributionChart();
  	this.renderGenderDistributionChart();
  }

  renderAgeDistributionChart() {
  	this.userService.profiles.subscribe( (profiles: Profile[]) => {
  		if (profiles == null) {
  			return;
  		}

	  	let specification = {
				"$schema": "https://vega.github.io/schema/vega-lite/v2.json",
				"data": {"values": profiles},
				"mark": "bar",
				"encoding": {
					"x": {
						"bin": true,
						"field": "age",
						"type": "quantitative"
					},
					"y": {
						"aggregate": "count",
						"type": "quantitative"
					}
				}
	  	} // end of spec

      const vegaSpec = compile(specification as any);
      const runtime = parse(vegaSpec.spec);
      const view = new View(runtime);

      view.renderer('canvas')
        .initialize(this.ageDistribution.nativeElement)
        .hover()
        .run()
        .finalize();
  	});
  }


  renderGenderDistributionChart() {
  	this.userService.profiles.subscribe( (profiles: Profile[]) => {
  		if (profiles == null) {
  			return;
  		}

	  	let specification = {
				"$schema": "https://vega.github.io/schema/vega-lite/v2.json",
				"data": {"values": profiles},
				"mark": "bar",
				"encoding": {
					"y": {
						"field": "gender",
						"type": "nominal"
					},
					"x": {
						"aggregate": "count",
						"type": "quantitative"
					}
				}
	  	} // end of spec

      const vegaSpec = compile(specification as any);
      const runtime = parse(vegaSpec.spec);
      const view = new View(runtime);

      view.renderer('canvas')
        .initialize(this.genderDistribution.nativeElement)
        .hover()
        .run()
        .finalize();
  	});
  }
}
