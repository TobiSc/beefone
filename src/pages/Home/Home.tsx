import { IonCard, IonCardContent, IonCardHeader, IonCardTitle } from '@ionic/react';
import Page from '../../components/Page';

const Home: React.FC = () => {
  return (
    <Page>
      <IonCard>
        <IonCardHeader><IonCardTitle>Bericht</IonCardTitle></IonCardHeader>
        <IonCardContent>
          <p>Folgende Werte sind Beispiele und zeigen Fantasiedaten an</p>
          <p>34 registrierte Waagen</p>
          <p>2 auffällige Messergebnisse</p>
          <p>1 Waage mit geringer Restakkukapazität</p>
          <p>362 kg Massezunahme in den letzten 7 Tagen</p>
        </IonCardContent>
      </IonCard>
      <IonCard routerLink='/register-scale' button={true}>
        <IonCardHeader><IonCardTitle>Registrieren</IonCardTitle></IonCardHeader>
        <IonCardContent>Neue Waage registrieren</IonCardContent>
      </IonCard>
      <IonCard routerLink='/locations' button={true}>
        <IonCardHeader><IonCardTitle>Standorte</IonCardTitle></IonCardHeader>
        <IonCardContent>Alle Standorte anzeigen</IonCardContent>
      </IonCard>
      <IonCard routerLink='/scales' button={true}>
        <IonCardHeader><IonCardTitle>Waagen</IonCardTitle></IonCardHeader>
        <IonCardContent>Alle Waagen anzeigen</IonCardContent>
      </IonCard>
    </Page>
  );
};

export default Home;
