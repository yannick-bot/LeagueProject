import { AppEnvironment } from './environment.model';

export const environment: AppEnvironment = {
  production: false,
  mode: 'mock',
  // Remplacer par l'URL exacte du Local Mock affichee dans Apidog
  apiBaseUrl: 'http://127.0.0.1:4523/m1/0000000-0-default',
};
