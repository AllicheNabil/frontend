import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'patients/:id',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      const patients = await fetch('http://localhost:3000/api/patients').then(res => res.json());
      return patients.map((patient: any) => ({ id: patient.id }));
    }
  },
  {
    path: 'print-prescription/:id',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async (): Promise<Record<string, string>[]> => {
      // TODO: Replace this with actual prescription IDs
      // This is a placeholder to allow the build to succeed.
      return [{ id: 'placeholder-id' }];
    }
  }
];