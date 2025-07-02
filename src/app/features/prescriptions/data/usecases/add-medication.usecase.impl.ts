import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AddMedicationUseCase } from '@app/features/prescriptions/domain/usecases/AddMedicationUseCase';
import { MedicationEntity } from '@app/features/prescriptions/domain/MedicationEntity';
import { MedicationRepository } from '@app/features/prescriptions/domain/MedicationRepository';

@Injectable({ providedIn: 'root' })
export class AddMedicationUseCaseImpl extends AddMedicationUseCase {
  private repository = inject(MedicationRepository);

  execute(medication: MedicationEntity): Observable<MedicationEntity> {
    return this.repository.addMedication(medication);
  }
}
