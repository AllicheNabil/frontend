import { Injectable } from '@angular/core';
import { Medication } from '../domain/MedicationEntity';
import { Patient } from '@app/features/patients/domain/patient-entity';
import { User } from '@app/features/user/user.model';
import { formatShortDate } from '@app/core/utils/date.utils';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionHtmlGenerator {

  constructor() { }

  public generate(medications: Medication[], patient: Patient, user: User): string {
    let medicationsHtml = '';
    medications.forEach(medication => {
      medicationsHtml += `
        <tr>
          <td style="border: 1px solid #ddd; padding: 6px; text-align: left; font-size: 10pt;">${medication.medicationName}</td>
          <td style="border: 1px solid #ddd; padding: 6px; text-align: left; font-size: 10pt;">${medication.amount}</td>
          <td style="border: 1px solid #ddd; padding: 6px; text-align: left; font-size: 10pt;">${medication.dosageForm}</td>
          <td style="border: 1px solid #ddd; padding: 6px; text-align: left; font-size: 10pt;">${medication.timesPerDay}</td>
          <td style="border: 1px solid #ddd; padding: 6px; text-align: left; font-size: 10pt;">${medication.medicationDuration}</td>
        </tr>
      `;
    });

    return `
      <div style="font-family: Arial, sans-serif; padding: 15px; font-size: 10pt;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="font-size: 16pt;">Ordonnance Médicale</h1>
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
          <p style="margin: 2px 0;"><strong>Date de naissance:</strong> ${patient.dateOfBirth ?  formatShortDate(new Date(patient.dateOfBirth))  : 'N/A'}</p>
        </div>

        <div style="margin-bottom: 20px;">
          <h2 style="font-size: 12pt;">Médicaments</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background-color: #f2f2f2;">
                <th style="border: 1px solid #ddd; padding: 6px; text-align: left; font-size: 10pt;">Nom du Médicament</th>
                <th style="border: 1px solid #ddd; padding: 6px; text-align: left; font-size: 10pt;">Quantité</th>
                <th style="border: 1px solid #ddd; padding: 6px; text-align: left; font-size: 10pt;">Forme Posologique</th>
                <th style="border: 1px solid #ddd; padding: 6px; text-align: left; font-size: 10pt;">Fréquence</th>
                <th style="border: 1px solid #ddd; padding: 6px; text-align: left; font-size: 10pt;">Durée</th>
              </tr>
            </thead>
            <tbody>
              ${medicationsHtml}
            </tbody>
          </table>
        </div>

        <div style="text-align: right; margin-top: 30px;">
          <p style="margin: 2px 0;"><strong>Date de l'ordonnance:</strong> ${formatShortDate(new Date())} 
</p>
        </div>
      </div>
    `;
  }
}
