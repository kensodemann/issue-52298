<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Tab 1</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tab 1</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-list>
        <ion-item>
          <ion-label>
            <ion-button expand="block" color="danger" @click="logoutClicked" data-testid="logout">Logout</ion-button>
          </ion-label>
        </ion-item>
        <ion-item>
          <ion-label>
            <ion-button expand="block" color="secondary" @click="useBiometricsClicked"
              data-testid="use-biometrics">Use
              Biometrics</ion-button>
          </ion-label>
        </ion-item>
        <ion-item>
          <div data-testid="session">
            <div>{{ session?.email }}</div>
            <div>{{ session?.firstName }} {{ session?.lastName }}</div>
            <div>{{ session?.accessToken }}</div>
            <div>{{ session?.refreshToken }}</div>
          </div>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { useAuthentication } from '@/composables/authentication';
import { useSessionVault } from '@/composables/session-vault';
import { Device } from '@ionic-enterprise/identity-vault';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/vue';
import { useRouter } from 'vue-router';

const { logout } = useAuthentication();
const { session, updateUnlockMode } = useSessionVault();
const router = useRouter();

const logoutClicked = async (): Promise<void> => {
  await logout();
  router.replace('/');
}

const useBiometricsClicked = async():Promise<void> => {
  try {
    await Device.showBiometricPrompt({iosBiometricsLocalizedReason:'Just to activate'});
    await updateUnlockMode('BiometricsWithPasscode');
  } catch(err:unknown){null;}
}
</script>
