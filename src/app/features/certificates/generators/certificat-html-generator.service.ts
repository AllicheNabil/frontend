import { Injectable } from '@angular/core';
import { Patient } from '@app/features/patients/domain/patient-entity';
import { User } from '@app/features/user/user.model';

@Injectable({
  providedIn: 'root'
})
export class CertificateHtmlGenerator {

  constructor() { }

  public generateWorkStoppageCertificate( patient: Patient, user: User, sickLeaveDays?: number, parentName?: string): string {
    const date = new Date().toLocaleDateString();
    const parentText = parentName ? `, accompagné(e) de son parent ${parentName}` : "";
    console.log("generate", patient, user, sickLeaveDays, parentName);
    return `
      <div style="font-family: Arial, sans-serif; padding: 15px; font-size: 10pt;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="font-size: 16pt;">Certificat Médical</h1>
        </div>

        <div style="margin-bottom: 15px;">
          <h2 style="font-size: 12pt;">Informations du Médecin</h2>
          <p style="margin: 2px 0;"><strong>Nom:</strong> ${user.name}</p>
          <p style="margin: 2px 0;"><strong>Spécialité:</strong> ${
            user.specialty || 'N/A'
          }</p>
          <p style="margin: 2px 0;"><strong>Adresse:</strong> ${
            user.address || 'N/A'
          }</p>
          <p style="margin: 2px 0;"><strong>Téléphone:</strong> ${
            user.phoneNumber || 'N/A'
          }</p>
          <p style="margin: 2px 0;"><strong>Numéro d'ordre:</strong> ${
            user.orderNumber || 'N/A'
          }</p>
        </div>

        <div style="margin-bottom: 15px;">
          <h2 style="font-size: 12pt;">Informations du Patient</h2>
          <p style="margin: 2px 0;"><strong>Nom:</strong> ${patient.name}</p>
          <p style="margin: 2px 0;"><strong>Date de naissance:</strong> ${
            patient.dateOfBirth
              ? new Date(patient.dateOfBirth).toLocaleDateString()
              : 'N/A'
          }</p>
          ${
            parentName
              ? `<p style="margin: 2px 0;">Accompagné de son parent: <strong>${parentName}</strong></p>`
              : ''
          }
        </div>

        <div style="text-align: right; margin-top: 20px;">
          <p>Le: ${date}</p>
        </div>
      </div>
    `;
  }

  public generateGoodHealthCertificate(patient: Patient, user: User): string {
    const date = new Date().toLocaleDateString();
    return `
      <div style="font-family: 'Times New Roman', serif; padding: 15px; border: 2px solid #000; max-width: 800px; margin: 5px auto; background-color: #f9f9f9;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="font-size: 16pt; color: #000; border-bottom: 2px solid #000; padding-bottom: 10px; display: inline-block;">CERTIFICAT DE BONNE SANTÉ</h1>
        </div>

        <div style="margin-bottom: 20px;">
          <h2 style="font-size: 14pt; color: #333;">Informations du Médecin</h2>
          <p style="margin: 5px 0;"><strong>Nom:</strong> ${user.name}</p>
          <p style="margin: 5px 0;"><strong>Spécialité:</strong> ${
            user.specialty || 'N/A'
          }</p>
          <p style="margin: 5px 0;"><strong>Adresse:</strong> ${
            user.address || 'N/A'
          }</p>
          <p style="margin: 5px 0;"><strong>Téléphone:</strong> ${
            user.phoneNumber || 'N/A'
          }</p>
          <p style="margin: 5px 0;"><strong>Numéro d'ordre:</strong> ${
            user.orderNumber || 'N/A'
          }</p>
        </div>

        <div style="margin-bottom: 20px;">
          <h2 style="font-size: 14pt; color: #333;">Informations du Patient</h2>
          <p style="margin: 5px 0;"><strong>Nom:</strong> ${patient.name}</p>
          <p style="margin: 5px 0;"><strong>Date de naissance:</strong> ${
            patient.dateOfBirth
              ? new Date(patient.dateOfBirth).toLocaleDateString()
              : 'N/A'
          }</p>
        </div>

        <div style="margin-bottom: 30px;">
          <h2 style="font-size: 14pt; color: #333;">Certificat</h2>
          <p style="font-size: 12pt; line-height: 1.8;">Je soussigné, Docteur ${
            user.name
          }, certifie que ${patient.name} est en bonne santé et apte à toutes activités.</p>
        </div>
        <div style="text-align: right; margin-top: 30px;">
          <p style="margin: 5px 0; font-size: 11pt;">Fait à [Lieu], le: ${date}</p>
        </div>
        <div style="text-align: right; margin-top: 50px;">
          <p style="margin: 5px 0; font-size: 11pt;">Signature du Médecin</p>
          <p style="margin: 5px 0; font-size: 11pt;">(${user.name})</p>
        </div>
      </div>
    `;
  }
}
