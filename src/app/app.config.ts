import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import Aura from '@primeng/themes/aura';
import { providePrimeNG } from 'primeng/config';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAnimations } from '@angular/platform-browser/animations';

const firebaseConfig = {
  apiKey: 'AIzaSyCeNuOY9QT2y-Azb8tvWosoqTZuvKekUzc',
  authDomain: 'catita-b505c.firebaseapp.com',
  projectId: 'catita-b505c',
  storageBucket: 'catita-b505c.firebasestorage.app',
  messagingSenderId: '1043502326986',
  appId: '1:1043502326986:web:689dc18989939252ca4033',
  measurementId: 'G-Z41VX4B0ZG',
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    providePrimeNG({
      theme: {
        preset: Aura,
      },
    }),
    provideFirebaseApp(() =>
      initializeApp({
        apiKey: 'AIzaSyCeNuOY9QT2y-Azb8tvWosoqTZuvKekUzc',
        authDomain: 'catita-b505c.firebaseapp.com',
        projectId: 'catita-b505c',
        storageBucket: 'catita-b505c.firebasestorage.app',
        messagingSenderId: '1043502326986',
        appId: '1:1043502326986:web:689dc18989939252ca4033',
        measurementId: 'G-Z41VX4B0ZG',
      })
    ),
    provideFirestore(() => getFirestore()),
    provideAnimations()
  ],
};
