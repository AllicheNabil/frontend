import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CertificateFacade } from '../facade/certificate.facade';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Patient } from '../../patients/domain/patient-entity';

@Component({
  selector: 'app-certificat-bonne-sante',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './certificat-bonne-sante.component.html',
  styleUrls: ['./certificat-bonne-sante.component.css']
})
export class CertificatBonneSanteComponent {
  @Input() patient!: Patient;
  private certificateFacade = inject(CertificateFacade);

  print(): void {
    this.certificateFacade.printCertificate('bonne santé', this.patient);
  }
}