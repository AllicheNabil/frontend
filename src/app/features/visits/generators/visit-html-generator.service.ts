import { Injectable } from '@angular/core';
import { PatientVisitEntity } from '../domain/patient-visit-entity';

@Injectable({
  providedIn: 'root',
})
export class VisitHtmlGenerator {
  constructor() {}

  public generate(visit: PatientVisitEntity, patientName: string): string {
    // Toute la logique de création de HTML est isolée ici.
    return `
      <h1>Rapport de Visite</h1>
      <p><strong>Nom du Patient:</strong> ${patientName}</p>
      <p><strong>Patient ID:</strong> ${visit.patientId}</p>              
  │

      <p><strong>Date:</strong> ${new Date(
        visit.visitDate!
      ).toLocaleString()}</p>
      <hr>
      <h2>Motif de la visite</h2>
      <p>${visit.reason}</p>
      <h2>Notes du médecin</h2>
      <p>${visit.physicalExamination}</p>
    `;
  }
}
