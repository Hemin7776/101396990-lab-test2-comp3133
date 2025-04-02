import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpacexService } from '../../services/spacex.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-missionlist',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './missionlist.component.html',
  styleUrls: ['./missionlist.component.scss'],
})
export class MissionListComponent implements OnInit {
  launches: any[] = [];
  filteredLaunches: any[] = [];
  years: number[] = [];

  selectedYear: number | null = null;
  isSuccessfulLaunch: boolean | null = null;
  isSuccessfulLand: boolean | null = null;

  constructor(private spacexService: SpacexService) {}

  ngOnInit(): void {
    this.spacexService.getAllLaunches().subscribe((data: any[]) => {
      this.launches = data;
      this.filteredLaunches = data;

      const yearSet = new Set<number>();
      data.forEach((launch) => {
        const year = parseInt(launch.launch_year);
        if (!isNaN(year)) yearSet.add(year);
      });
      this.years = Array.from(yearSet).sort((a, b) => a - b);
    });
  }

  filterByYear(year: number): void {
    this.selectedYear = year;
    this.applyFilters();
  }

  filterBySuccessLaunch(success: boolean): void {
    this.isSuccessfulLaunch = success;
    this.applyFilters();
  }

  filterBySuccessLand(success: boolean): void {
    this.isSuccessfulLand = success;
    this.applyFilters();
  }

  resetFilters(): void {
    this.selectedYear = null;
    this.isSuccessfulLaunch = null;
    this.isSuccessfulLand = null;
    this.filteredLaunches = this.launches;
  }

  private applyFilters(): void {
    this.filteredLaunches = this.launches.filter((launch) => {
      const matchYear =
        this.selectedYear === null || +launch.launch_year === this.selectedYear;

      const matchLaunch =
        this.isSuccessfulLaunch === null ||
        launch.launch_success === this.isSuccessfulLaunch;

      const matchLand =
        this.isSuccessfulLand === null ||
        launch.rocket?.first_stage?.cores?.[0]?.land_success ===
          this.isSuccessfulLand;

      return matchYear && matchLaunch && matchLand;
    });
  }
}
