import { Injectable } from '@angular/core';
import { formatShortDate } from '@app/core/utils/date.utils';
import { Patient } from '@app/features/patients/domain/patient-entity';
import { User } from '@app/features/user/user.model';

@Injectable({
  providedIn: 'root'
})
export class LabTestHtmlGenerator {

  constructor() { }

  public generate(labTests: string[], patient: Patient, user: User): string {
    const date = new Date().toLocaleDateString();
    
let testsHtml = '';
labTests.forEach((testName, index) => {
  testsHtml += `<ul>${index + 1}. ${testName}</ul>`;
});
    return `
      <div style="font-family: Arial, sans-serif; padding: 15px; font-size: 10pt;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="font-size: 16pt;">Bilan de Laboratoire</h1>
        </div>

        <div style="margin-bottom: 15px;">
          <h2 style="font-size: 12pt;">Informations du Médecin</h2>
          <p style="margin: 2px 0;"><strong>Nom:</strong> ${user.name}</p>
          <p style="margin: 2px 0;"><strong>Spécialité:</strong> ${user.specialty || 'N/A'}</p>
          <p style="margin: 2px 0;"><strong>Adresse:</strong> ${user.address || 'N/A'}</p>
          <p style="margin: 2px 0;"><strong>Téléphone:</strong> ${user.phoneNumber || 'N/A'}</p>
          <p style="margin: 2px 0;"><strong>Numéro d'ordre:</strong> ${user.orderNumber || 'N/A'}</p>
        </div>

        <div style="margin-bottom: 15px;">
          <h2 style="font-size: 12pt;">Informations du Patient</h2>
          <p style="margin: 2px 0;"><strong>Nom:</strong> ${patient.name}</p>
          <p style="margin: 2px 0;"><strong>Date de naissance:</strong> ${patient.dateOfBirth ? formatShortDate(new Date(patient.dateOfBirth)) : 'N/A'}</p>
        </div>

        <div style="margin-bottom: 20px;">
          <h2 style="font-size: 12pt;">Bilans Demandés</h2>
          <ul>
            ${testsHtml}
          </ul>
        </div>

        <div style="text-align: right; margin-top: 30px;">
          <p style="margin: 2px 0;"><strong>Date:</strong> ${formatShortDate(new Date())}</p>
        </div>
      </div>
    `;
  }
}
