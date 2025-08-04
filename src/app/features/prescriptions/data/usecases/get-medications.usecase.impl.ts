import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { GetMedicationsUseCase } from '@app/features/prescriptions/domain/usecases/GetMedicationsUseCase';
import { Medication } from '@app/features/prescriptions/domain/MedicationEntity';
import { MedicationRepository } from '@app/features/prescriptions/domain/MedicationRepository';

@Injectable({ providedIn: 'root' })
export class GetMedicationsUseCaseImpl extends GetMedicationsUseCase {
  private repository = inject(MedicationRepository);

  execute(patientId: number): Observable<Medication[]> {
    return this.repository.getMedications(patientId);
  }
}
