import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../admin.service';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {
  private adminService = inject(AdminService);

  historial: any[] = [];
  cargando = true;

  // Gràfic de Vendes per Dia i Producte (Bar Chart)
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {},
      y: { min: 0 }
    },
    plugins: {
      legend: { display: true },
    }
  };
  public barChartType: ChartType = 'bar';
  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      { data: [], label: 'Quantitat Venuda' }
    ]
  };

  // Gràfic de Vendes Oferta vs No Oferta (Line Chart)
  public lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      y: { min: 0 }
    },
    plugins: {
      legend: { display: true },
    }
  };
  public lineChartType: ChartType = 'line';
  public lineChartData: ChartData<'line'> = {
    labels: [],
    datasets: [
      { data: [], label: 'Amb Oferta', borderColor: 'green', backgroundColor: 'rgba(0,255,0,0.3)', fill: true },
      { data: [], label: 'Sense Oferta', borderColor: 'red', backgroundColor: 'rgba(255,0,0,0.3)', fill: true }
    ]
  };

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos() {
    this.cargando = true;

    // Carregar Historial
    this.adminService.getHistorialGlobal().subscribe({
      next: (data) => {
        this.historial = data;
      },
      error: (err) => console.error('Error carregant historial global:', err)
    });

    // Carregar Dades Gràfic Barres (Vendes per dia/producte)
    this.adminService.getVendesPerDia().subscribe({
      next: (data) => {
        // Suposem que data és { labels: string[], values: number[] }
        if (data && data.labels) {
          this.barChartData.labels = data.labels;
          this.barChartData.datasets[0].data = data.values;
        }
      },
      error: (err) => console.error('Error carregant dades per dia:', err)
    });

    // Carregar Dades Gràfic Lineal (Oferta vs No Oferta)
    this.adminService.getVendesOferta().subscribe({
      next: (data) => {
        // Suposem que data és { labels: string[], ambOferta: number[], senseOferta: number[] }
        if (data && data.labels) {
          this.lineChartData.labels = data.labels;
          this.lineChartData.datasets[0].data = data.ambOferta;
          this.lineChartData.datasets[1].data = data.senseOferta;
        }
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error carregant dades oferta:', err);
        this.cargando = false;
      }
    });
  }
}
