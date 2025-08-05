import { Injectable, inject } from '@angular/core';
import { CertificateHtmlGenerator } from '../generators/certificat-html-generator.service';
import { forkJoin } from 'rxjs';
import { Patient } from '../../patients/domain/patient-entity';
import { UserService } from '../../user/user.service';
import { PrintDocumentUsecase } from '@app/core/domain/usecases/print-document.usecase';

@Injectable({
  providedIn: 'root'
})
export class CertificateFacade {

  private printDocumentUsecase = inject(PrintDocumentUsecase);
  private certificateHtmlGenerator = inject(CertificateHtmlGenerator);
  private userService = inject(UserService);

  printCertificate(certificateType: 'aptitude au travail' | 'bonne santé', patient: Patient, sickLeaveDays?: number, parentName?: string): void {
   
    if (patient) {
      forkJoin({
        user: this.userService.getProfile(),
      }).subscribe(({ user }) => {
        let certificateHtml: string;
        let title: string;

        switch (certificateType) {
          case 'aptitude au travail':
            certificateHtml = this.certificateHtmlGenerator.generateWorkStoppageCertificate(patient, user, sickLeaveDays, parentName);
            title = `Certificat d’arrêt de travail pour ${patient.name}`;
            break;
          case 'bonne santé':
            certificateHtml = this.certificateHtmlGenerator.generateGoodHealthCertificate(patient, user);
            title = `Certificat de bonne santé pour ${patient.name}`;
            break;
          default:
            console.error('Unknown certificate type', certificateType);
            return;
        }
        this.printDocumentUsecase.execute(certificateHtml, title);
      });
    }
  }
}
