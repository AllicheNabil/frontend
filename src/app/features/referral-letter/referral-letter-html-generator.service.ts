import { Injectable, inject } from '@angular/core';
import { Patient } from '@app/features/patients/domain/patient-entity';
import { User } from '@app/features/user/user.model';
import { formatShortDate } from '@app/core/utils/age.utils';

@Injectable({
  providedIn: 'root'
})
export class ReferralLetterHtmlGenerator {

  constructor() { }

  generate(
    patient: Patient,
    user: User,
    demande: string,
    motifDemande: string,
    syntheseClinique: string,
    diagnosticSuspecte: string
  ): string {
    const date = new Date().toLocaleDateString();

    return `
      <div style="font-family: Arial, sans-serif; padding: 20px; line-height: 1.6;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="font-size: 24px; color: #333;">LETTRE D'ORIENTATION</h1>
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
          <p><strong>Date:</strong> ${date}</p>
          <p><strong>Demande:</strong> ${demande}</p>
          <p><strong>Motif de la demande:</strong> ${motifDemande}</p>
        </div>

        <div style="margin-bottom: 20px;">
          <h2 style="font-size: 18px; color: #333;">Synthèse Clinique:</h2>
          <p>${syntheseClinique}</p>
        </div>

        <div style="margin-bottom: 20px;">
          <h2 style="font-size: 18px; color: #333;">Diagnostic Suspecté:</h2>
          <ul>
            ${diagnosticSuspecte.split(';').map(item => `<li>${item.trim()}</li>`).join('')}
          </ul>
        </div>

        <div style="margin-top: 50px; text-align: right;">
          <p>Signature du Médecin</p>
        </div>
      </div>
    `;
  }
}