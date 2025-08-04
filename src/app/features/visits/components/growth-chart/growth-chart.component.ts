import { Component, Input, OnInit, OnChanges, SimpleChanges, inject, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ChartConfiguration, ChartType, Chart, registerables, ChartDataset } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { VisitFacade } from '@app/features/visits/facade/visit.facade';
import { Observable } from 'rxjs';
import { PatientVisitEntity } from '@app/features/visits/domain/patient-visit-entity';
import { calculateAgeInMonths } from '@app/core/utils/age.utils';
import { Patient } from '@app/features/patients/domain/patient-entity';

Chart.register(...registerables);

@Component({
  selector: 'app-growth-chart',
  standalone: true,
  imports: [CommonModule, BaseChartDirective, MatButtonModule, MatIconModule],
  templateUrl: './growth-chart.component.html',
  styleUrls: ['./growth-chart.component.css'],
})
export class GrowthChartComponent implements OnInit, AfterViewInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  @Input() gender!: 'male' | 'female';
  @Input() patientAgeInMonths: number | null = null;
  @Input() patientWeight!: number | null;
  @Input() patientHeight: number | null = null;
  @Input() patientHeadCircumference: number | null = null;
  @Input() patientBmi: number | null = null;
  private _patientVisits: PatientVisitEntity[] = [];
  @Input()
  set patientVisits(visits: PatientVisitEntity[]) {
    this._patientVisits = visits;
    if (this.chart) {
      this.refreshChart();
    }
  }
  get patientVisits(): PatientVisitEntity[] {
    return this._patientVisits;
  }

  @Input() patient: Patient | null = null;

  private visitFacade = inject(VisitFacade);

  public selectedChartType: 'weight' | 'height' | 'headCircumference' | 'bmi' =
    'weight';

  private percentileDatasets: ChartDataset<'line'>[] = [];
  private currentPatientChartData: { x: number | null; y: number | null } = {
    x: null,
    y: null,
  };

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    datasets: [],
    labels: [],
  };

  public lineChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, position: 'top' },
      tooltip: { mode: 'nearest', intersect: false },
    },
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
        title: {
          display: true,
          text: 'Âge (mois)',
        },
        ticks: {
          stepSize: 1,
        },
      },
      y: {
        title: {
          display: true,
          text: 'Valeur',
        },
        beginAtZero: false,
      },
    },
  };

  public lineChartType: 'line' = 'line';

  ngOnInit(): void {
    this.loadGrowthData();
  }

  private getNewChartOptions(): ChartConfiguration<'line'>['options'] {
    const newOptions = { ...this.lineChartOptions };
    if (newOptions.scales?.['x'] && newOptions.scales?.['x'].title) {
      if (this.patientAgeInMonths !== null && this.patientAgeInMonths < 24) {
        (newOptions.scales['x'].title as any).text = 'Âge (mois)';
        newOptions.scales['x'].ticks = { stepSize: 1 };
        newOptions.scales['x'].min = 0;
        newOptions.scales['x'].max = 24;
      } else {
        (newOptions.scales['x'].title as any).text = 'Âge (années)';
        newOptions.scales['x'].ticks = {
          stepSize: 12,
          callback: function(value) {
            return Number(value) / 12;
          }
        };
        newOptions.scales['x'].min = 0;
        newOptions.scales['x'].max = undefined;
      }
    }
    return newOptions;
  }

  onChartTypeChange(type: 'weight' | 'height' | 'headCircumference' | 'bmi') {
    this.selectedChartType = type;
    this.loadGrowthData();
  }

  loadGrowthData(): void {
    let dataObservable: Observable<any[]>;
    let yAxisLabel: string;

    switch (this.selectedChartType) {
      case 'weight':
        dataObservable = this.visitFacade.getWeightGrowthData(this.gender);
        yAxisLabel = 'Poids (kg)';
        break;
      case 'height':
        dataObservable = this.visitFacade.getHeightGrowthData(this.gender);
        yAxisLabel = 'Taille (cm)';
        break;
      case 'headCircumference':
        dataObservable = this.visitFacade.getHeadCircumferenceGrowthData(
          this.gender
        );
        yAxisLabel = 'Périmètre crânien (cm)';
        break;
      case 'bmi':
        dataObservable = this.visitFacade.getBmiGrowthData(this.gender);
        yAxisLabel = 'IMC';
        break;
    }

    // Chargement des données
    dataObservable.subscribe({
      next: (data) => {
        // Mise à jour du titre de l'axe Y
        if (
          this.lineChartOptions?.scales?.['y'] &&
          typeof this.lineChartOptions.scales['y'] === 'object'
        ) {
          this.lineChartOptions.scales['y']['title'] = {
            display: true,
            text: yAxisLabel,
          };
        }

        this.lineChartData.labels = data.map((d: any) => d.agemos);
        this.percentileDatasets = this.createDatasets(
          data,
          this.getLabelPrefix(this.selectedChartType)
        );
        this.updatePatientDataPoint(); // Call after setting percentile datasets
        this.refreshChart();
      },
      error: (err) =>
        console.error(
          `Erreur lors du chargement des données de ${this.selectedChartType}`,
          err
        ),
    });
  }

  updatePatientDataPoint(): void {
    console.log(
      'Current patient data (inside updatePatientDataPoint):',
      'Age:',
      this.patientAgeInMonths,
      'Weight:',
      this.patientWeight,
      'Height:',
      this.patientHeight,
      'HeadCircumference:',
      this.patientHeadCircumference,
      'BMI:',
      this.patientBmi
    );

    let patientValue: number | null = null;
    switch (this.selectedChartType) {
      case 'weight':
        patientValue = this.patientWeight;
        break;
      case 'height':
        patientValue = this.patientHeight;
        break;
      case 'headCircumference':
        patientValue = this.patientHeadCircumference;
        break;
      case 'bmi':
        patientValue = this.patientBmi;
        break;
    }

    if (patientValue !== null && this.patientAgeInMonths !== null) {
      this.currentPatientChartData = {
        x: this.patientAgeInMonths,
        y: patientValue,
      };
    } else {
      this.currentPatientChartData = { x: null, y: null }; // Clear if no valid data
    }
    this.refreshChart();
  }

  private refreshChart(): void {
    if (!this.chart) {
      return;
    }

    this.lineChartData.datasets = this.getCombinedDatasets();
    this.lineChartOptions = this.getNewChartOptions();
    this.chart.update();
  }

  private getCombinedDatasets(): ChartDataset<'line'>[] {
    const combinedDatasets: ChartDataset<'line'>[] = [
      ...this.percentileDatasets,
    ];
    this.addHistoricalVisitsToChart(combinedDatasets);
    return combinedDatasets;
  }

  private addHistoricalVisitsToChart(
    combinedDatasets: ChartDataset<'line'>[]
  ): void {
    const historicalData: { x: number; y: number }[] = [];

    this.patientVisits.forEach((visit) => {
      let visitValue: number | null = null;
      let ageInMonths: number | null = null;

      if (this.patient && this.patient.dateOfBirth && visit.visitDate) {
        ageInMonths = calculateAgeInMonths(
          new Date(this.patient.dateOfBirth),
          new Date(visit.visitDate)
        );
      }

      switch (this.selectedChartType) {
        case 'weight':
          visitValue = visit.weight ? parseFloat(visit.weight) : null;
          break;
        case 'height':
          visitValue = visit.height ? parseFloat(visit.height) : null;
          break;
        case 'headCircumference':
          case 'headCircumference':
          visitValue = visit.headCircumference ? parseFloat(visit.headCircumference) : null;
          break;
        case 'bmi':
          visitValue = visit.bmi ? parseFloat(visit.bmi) : null;
          break;
      }

      if (visitValue !== null && ageInMonths !== null) {
        historicalData.push({ x: ageInMonths, y: visitValue });
      }
    });

    // Add the current visit's data to the historical data
    if (
      this.currentPatientChartData.x !== null &&
      this.currentPatientChartData.y !== null
    ) {
      historicalData.push({
        x: this.currentPatientChartData.x,
        y: this.currentPatientChartData.y,
      });
    }

    if (historicalData.length > 0) {
      const historicalDataset: ChartDataset<'line'> = {
        data: historicalData.sort((a, b) => a.x - b.x), // Sort by age
        label: 'Visites Historiques',
        borderColor: '#0000FF', // Blue for historical line
        backgroundColor: '#0000FF',
        pointRadius: 3,
        pointBackgroundColor: '#0000FF',
        fill: false,
        showLine: true, // This will draw the line
        order: 998,
      };
      combinedDatasets.push(historicalDataset);
    }
  }

  private getLabelPrefix(
    type: 'weight' | 'height' | 'headCircumference' | 'bmi'
  ): string {
    switch (type) {
      case 'weight':
        return 'Poids';
      case 'height':
        return 'Taille';
      case 'headCircumference':
        return 'PC';
      case 'bmi':
        return 'IMC';
    }
  }

  private createDatasets(
    data: any[],
    labelPrefix: string
  ): ChartDataset<'line'>[] {
    const percentiles = ['p3', 'p10', 'p25', 'p50', 'p75', 'p90', 'p97'];
    return percentiles.map((p) => ({
      data: data.map((d: any) => ({ x: d.agemos, y: d[p] })),
      label: `${labelPrefix} ${p.toUpperCase()}`,
      fill: false,
      borderColor: this.getBorderColor(p),
      borderWidth: 1,
      pointRadius: 0,
      tension: 0.1,
      order: 1, // Draw percentile lines first
    }));
  }

  ngAfterViewInit(): void {
    this.refreshChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['patientAgeInMonths'] || changes['patientWeight'] || changes['patientHeight'] || changes['patientHeadCircumference'] || changes['patientBmi']) {
      this.refreshChart();
    }
  }

  private getBorderColor(percentile: string): string {
    switch (percentile) {
      case 'p50':
        return '#0f4d09ff'; // Bleu pour médiane
      case 'p3':
      case 'p97':
        return '#e70f0bff'; // Rouge pour extrêmes
      default:
        return '#9E9E9E'; // Gris pour les autres
    }
  }
}
