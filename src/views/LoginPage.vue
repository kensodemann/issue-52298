<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Login</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Login</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-list>
        <ion-item>
          <ion-label>
            <ion-button expand="block" @click="handleLogin" data-testid="login">Fake Login</ion-button>
          </ion-label>
        </ion-item>
        <ion-item>
          <ion-label>
            <ion-button expand="block" @click="handleUnlock" data-testid="login">Unlock</ion-button>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonButton,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonTitle,
  IonToolbar,
} from '@ionic/vue';
import { useRouter } from 'vue-router';
import { useAuthentication } from '@/composables/authentication';
import { useSessionVault } from '@/composables/session-vault';

const { login } = useAuthentication();
const { unlockSession, sessionIsLocked } = useSessionVault();
const router = useRouter();

const handleUnlock = async (): Promise<void> => {
  if (await sessionIsLocked()) {
    try {
      await unlockSession();
      router.replace('/tabs/tab1');
    } catch (err: unknown) {
      null;
    }
  } else {
    alert('there is no session, login instead');
  }
};

const handleLogin = async () => {
  try {
    await login();
    router.replace('/tabs/tab1');
  } catch (error: unknown) {
    console.error('Failed to log in', error);
  }
};
</script>
