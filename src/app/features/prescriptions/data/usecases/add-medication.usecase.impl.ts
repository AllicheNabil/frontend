import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AddMedicationUseCase } from '@app/features/prescriptions/domain/usecases/AddMedicationUseCase';
import { Medication } from '@app/features/prescriptions/domain/MedicationEntity';
import { MedicationRepository } from '@app/features/prescriptions/domain/MedicationRepository';

@Injectable({ providedIn: 'root' })
export class AddMedicationUseCaseImpl extends AddMedicationUseCase {
  private repository = inject(MedicationRepository);

  execute(medication: Medication): Observable<Medication> {
    return this.repository.addMedication(medication);
  }
}
