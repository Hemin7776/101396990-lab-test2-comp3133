import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SpacexService } from '../../services/spacex.service';

@Component({
  selector: 'app-missiondetails',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './missiondetails.component.html',
  styleUrls: ['./missiondetails.component.scss'],
})
export class MissiondetailsComponent implements OnInit {
  mission: any;

  constructor(
    private route: ActivatedRoute,
    private spacexService: SpacexService
  ) {}

  ngOnInit(): void {
    const flightNumber = this.route.snapshot.paramMap.get('flight_number');

    this.spacexService.getAllLaunches().subscribe((data) => {
      this.mission = data.find(
        (launch: any) => launch.flight_number == flightNumber
      );
    });
  }
}
