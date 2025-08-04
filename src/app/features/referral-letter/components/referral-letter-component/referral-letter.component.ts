import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Patient } from '@app/features/patients/domain/patient-entity';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { PrintDocumentUsecase } from '@app/core/domain/usecases/print-document.usecase';
import { ReferralLetterHtmlGenerator } from '../../referral-letter-html-generator.service';
import { UserService } from '@app/features/user/user.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-referral-letter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule, MatIconModule],
  templateUrl: './referral-letter.component.html',
  styleUrls: ['./referral-letter.component.css']
})
export class ReferralLetterComponent implements OnInit {
  @Input() patient!: Patient;

  private printDocumentUsecase = inject(PrintDocumentUsecase);
  private referralLetterHtmlGenerator = inject(ReferralLetterHtmlGenerator);
  private userService = inject(UserService);

  referralForm = new FormGroup({
    demande: new FormControl('', Validators.required),
    motifDemande: new FormControl('', Validators.required),
    syntheseClinique: new FormControl('', Validators.required),
  });

  diagnosticInput = new FormControl('');
  diagnostics: string[] = [];

  ngOnInit(): void {
    // You can pre-fill form fields here if needed
  }

  addDiagnostic(): void {
    const diagnostic = this.diagnosticInput.value;
    if (diagnostic && diagnostic.trim() !== '') {
      this.diagnostics.push(diagnostic.trim());
      this.diagnosticInput.reset();
    }
  }

  removeDiagnostic(index: number): void {
    this.diagnostics.splice(index, 1);
  }

  onSubmit(): void {
    if (this.referralForm.valid) {
      // Save the letter (backend integration will be added later)
      console.log('Saving referral letter:', this.referralForm.value);
      this.onPrint(); // Print after saving
    }
  }

  onPrint(): void {
    if (this.referralForm.valid && this.patient) {
      const formValues = this.referralForm.value;
      forkJoin({
        user: this.userService.getProfile(),
      }).subscribe(({ user }) => {
        const htmlContent = this.referralLetterHtmlGenerator.generate(
          this.patient,
          user,
          formValues.demande!,
          formValues.motifDemande!,
          formValues.syntheseClinique!,
          this.diagnostics.join('; ') // Join diagnostics for printing
        );
        const title = `Lettre d'orientation pour ${this.patient.name}`;
        this.printDocumentUsecase.execute(htmlContent, title);
      });
    }
  }
}