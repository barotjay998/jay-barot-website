import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataServiceService } from '../services/data-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  public projectData: any;
  public numRows: number = 0;
  public numProjects: number = 0;

  constructor(
    private dataService: DataServiceService,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.loadData();

    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        const target = document.getElementById(fragment);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });

  }

  loadData() {
    this.dataService.getProjectData().subscribe((data) => {
      this.projectData = data;

      // Process the data
      this.processData();
    });
    
  }

  processData() {
    // Get the number of objects in the projectData array
    this.numProjects = Object.keys(this.projectData).length;

    // Get the number of rows needed to display the projects
    this.numRows = this.divideAndCeil(this.numProjects);

    // Divide the projects into rows
    this.projectData = this.chunkArray(this.projectData, 3);
  }

  chunkArray(array: any[], size: number) {
    const chunkedArray = [];

    for (let i = 0; i < array.length; i += size) {
      const chunk = array.slice(i, i + size);
      chunkedArray.push(chunk);
    }
    
    return chunkedArray;
  }

  divideAndCeil(num: number) {
    // We are going to have three projects card per carousel slide
    return Math.ceil(num / 3);
  }

  getRange(num: number): number[] {
    return Array.from({length: num}, (_, index) => index);
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

}
