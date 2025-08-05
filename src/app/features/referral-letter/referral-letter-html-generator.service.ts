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
        <div style="text-align: center; margin-bottom: 10px;">
          <h1 style="font-size: 18px; color: #333;">LETTRE D'ORIENTATION</h1>
        </div>

        <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
          <div style="flex: 1; padding-right: 10px;">
            <h2 style="font-size: 12pt;">Informations du Médecin</h2>
            <p style="margin: 2px 0; font-size: 10pt;"><strong>Nom:</strong> ${user.name}</p>
            <p style="margin: 2px 0; font-size: 10pt;"><strong>Spécialité:</strong> ${user.specialty || 'N/A'}</p>
            <p style="margin: 2px 0; font-size: 10pt;"><strong>Adresse:</strong> ${user.address || 'N/A'}</p>
            <p style="margin: 2px 0; font-size: 10pt;"><strong>Téléphone:</strong> ${user.phoneNumber || 'N/A'}</p>
            <p style="margin: 2px 0; font-size: 10pt;"><strong>Numéro d'ordre:</strong> ${user.orderNumber || 'N/A'}</p>
          </div>
            <div style="width: 2px; height: 100px; background-color: black; margin: 0 10px;"></div> <!-- Divider -->

          <div style="flex: 1; padding-left: 10px;">
            <h2 style="font-size: 12pt;">Informations du Patient</h2>
            <p style="margin: 2px 0; font-size: 10pt;"><strong>Nom:</strong> ${patient.name}</p>
            <p style="margin: 2px 0; font-size: 10pt;"><strong>Date de naissance:</strong> ${patient.dateOfBirth ?  formatShortDate(new Date(patient.dateOfBirth))  : 'N/A'}</p>
          </div>
        </div>

        <div style="margin-bottom: 00px;">
          <p style="font-size: 10pt;"><strong>Date:</strong> ${date}</p>
          <p style="font-size: 10pt;"><strong>Demande:</strong> ${demande}</p>
          <p style="font-size: 10pt;"><strong>Motif de la demande:</strong> ${motifDemande}</p>
        </div>

        <div style="margin-bottom: 00px;">
          <p style="font-size: 10pt;"><strong>Synthèse Clinique:</strong></p>
          <p style="font-size: 10pt;">${syntheseClinique}</p>
        </div>

        <div style="margin-bottom: 00px;">
          <p style="font-size: 10pt;"><strong>Diagnostic Suspecté:</strong></p>
          <ul style="font-size: 10pt;">
            ${diagnosticSuspecte.split(';').map(item => `<li>${item.trim()}</li>`).join('')}
          </ul>
        </div>

        <div style="margin-top:1 20px; text-align: right;">
          <p style="font-size: 10pt;">Signature du Médecin</p>
        </div>
      </div>
    `;
  }
}