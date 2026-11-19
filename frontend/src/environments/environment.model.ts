export interface AppEnvironment {
  production: boolean;
  mode: 'mock' | 'local' | 'production';
  apiBaseUrl: string;
}
