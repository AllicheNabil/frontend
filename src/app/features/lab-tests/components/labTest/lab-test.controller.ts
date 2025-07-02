import { Injectable, inject, signal } from '@angular/core';
import { GetLabTestsUseCase } from '@app/features/lab-tests/domain/labTestUsecases/get-lab-tests.usecase';
import { AddLabTestUseCase } from '@app/features/lab-tests/domain/labTestUsecases/add-lab-test.usecase';
import { LabTestEntity } from '@app/features/lab-tests/domain/lab-test.entity';

@Injectable({ providedIn: 'root' })
export class LabTestController {
  private getLabTestsUseCase = inject(GetLabTestsUseCase);
  private addLabTestUseCase = inject(AddLabTestUseCase);

  labTests = signal<LabTestEntity[]>([]);
  showAddLabTestForm = signal<boolean>(false);
  selectedLabTest = signal<LabTestEntity | null>(null);

  loadLabTests(patientId: number): void {
    if (patientId) {
      this.getLabTestsUseCase.execute(patientId).subscribe({
        next: (data: LabTestEntity[]) => {
          this.labTests.set(data);
        },
        error: (error: Error) => {
          console.error('Error fetching lab tests:', error);
        },
      });
    }
  }

  toggleAddLabTestForm(show: boolean): void {
    this.showAddLabTestForm.set(show);
    if (show) {
      this.selectedLabTest.set(null); // Clear selected lab test when showing add form
    }
  }

  selectLabTest(labTest: LabTestEntity): void {
    this.selectedLabTest.set(labTest);
    this.showAddLabTestForm.set(false); // Hide add form when selecting a lab test
  }

  clearSelectedLabTest(): void {
    this.selectedLabTest.set(null);
  }

  onLabTestAdded(patientId: number): void {
    this.toggleAddLabTestForm(false);
    this.loadLabTests(patientId); // Refresh the list of lab tests
  }

  addLabTest(labTest: LabTestEntity): void {
    this.addLabTestUseCase.execute(labTest).subscribe({
      next: (newLabTest) => {
        console.log('Lab test added via controller:', newLabTest);
        // Optionally update the lab tests signal here if needed, or rely on loadLabTests
      },
      error: (error) => {
        console.error('Error adding lab test via controller:', error);
      },
    });
  }
}
