import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Patient } from '@app/features/patients/domain/patient-entity';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { PrintDocumentUsecase } from '@app/core/domain/usecases/print-document.usecase';
import { ReferralLetterHtmlGenerator } from '../../referral-letter-html-generator.service';
import { UserService } from '@app/features/user/user.service';
import { forkJoin, Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import * as catalogueExamens from '@assets/catalogue_examens_radiologiques.json';
import * as motifsDemande from '@assets/motifs_demande.json';
import * as symptomesMedicaux from '@assets/symptomes_medicaux.json';
import * as diagnosticsMedicaux from '@assets/diagnostics_medicaux.json';
import { User } from '@app/features/user/user.model';

@Component({
  selector: 'app-referral-letter',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatAutocompleteModule,
  ],
  templateUrl: './referral-letter.component.html',
  styleUrls: ['./referral-letter.component.css'],
})
export class ReferralLetterComponent implements OnInit {
  @Input() patient!: Patient;

  private printDocumentUsecase: PrintDocumentUsecase = inject(PrintDocumentUsecase);
  private referralLetterHtmlGenerator: ReferralLetterHtmlGenerator = inject(
    ReferralLetterHtmlGenerator
  );
  private userService: UserService = inject(UserService);

  referralForm = new FormGroup({
    demande: new FormControl('', Validators.required),
    motifDemande: new FormControl('', Validators.required),
    syntheseClinique: new FormControl('', Validators.required),
  });

  diagnosticInput = new FormControl('');
  diagnostics: string[] = [];

  allExams: string[] = [];
  filteredExams!: Observable<string[]>;

  allMotifs: string[] = [];
  filteredMotifs!: Observable<string[]>;

  allDiagnostics: string[] = [];
  filteredDiagnostics!: Observable<string[]>;

  ngOnInit(): void {
    const examsData = (catalogueExamens as any).default || catalogueExamens;
    this.allExams = Object.values(examsData).flat() as string[];

    const motifsData = (motifsDemande as any).default || motifsDemande;
    const symptomsData = (symptomesMedicaux as any).default || symptomesMedicaux;
    const diagnosticsData = (diagnosticsMedicaux as any).default || diagnosticsMedicaux;

    this.allMotifs = [
      ...(motifsData as string[]),
      ...(Object.values(symptomsData).flat() as string[]),
    ];

    this.allDiagnostics = Object.values(diagnosticsData).flat() as string[];

    this.filteredExams = this.referralForm.get('demande')!.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterExams(value || ''))
    );

    this.filteredMotifs = this.referralForm.get('motifDemande')!.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterMotifs(value || ''))
    );

    this.filteredDiagnostics = this.diagnosticInput.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterDiagnostics(value || ''))
    );
  }

  private _filterExams(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allExams.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  private _filterMotifs(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allMotifs.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  private _filterDiagnostics(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allDiagnostics.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
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
      }).subscribe(({ user }: { user: User }) => {
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