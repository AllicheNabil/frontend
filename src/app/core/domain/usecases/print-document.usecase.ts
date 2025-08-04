import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PrintDocumentUsecase {

  constructor() { }

  /**
   * Ouvre une nouvelle fenêtre, y injecte le contenu HTML,
   * et déclenche le dialogue d'impression du navigateur.
   * @param htmlContent Le contenu HTML à imprimer.
   * @param documentTitle Le titre de la page (affiché dans l'en-tête d'impression).
   */
  execute(htmlContent: string, documentTitle: string = 'Document'): void {
    const printWindow = window.open('', '_blank', 'height=600,width=800');

    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>${documentTitle}</title>
            <style>
              /* Vous pouvez mettre ici des styles CSS spécifiques à l'impression */
              body { font-family: sans-serif; }
              table { width: 100%; border-collapse: collapse; }
              th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
              h1 { color: #333; }
            </style>
          </head>
          <body>
            ${htmlContent}
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus(); // Nécessaire pour certains navigateurs
      printWindow.print();
      printWindow.close(); // On peut le fermer automatiquement après impression si besoin
    } else {
      console.error('Impossible d\'ouvrir la fenêtre d\'impression. Vérifiez les bloqueurs de pop-up.');
    }
  }
}
