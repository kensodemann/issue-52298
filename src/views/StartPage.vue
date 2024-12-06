<template>
  <ion-page>
    <ion-content> </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { useAuthentication } from '@/composables/authentication';
import { useSessionVault } from '@/composables/session-vault';
import { IonContent, IonPage, onIonViewDidEnter } from '@ionic/vue';
import { useRouter } from 'vue-router';

const { isAuthenticated } = useAuthentication();
const { sessionIsLocked } = useSessionVault();
const router = useRouter();

const performNavigation = async (): Promise<void> => {
  if (!(await sessionIsLocked()) && (await isAuthenticated())) {
      router.replace('/tabs/tab1');
    } else {
      router.replace('/login');
    }
};


onIonViewDidEnter(async () => {
  await performNavigation();
});
</script>
