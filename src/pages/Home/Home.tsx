import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../../components/ExploreContainer';
import './Home.css';
import Page from '../../components/Page';

const Home: React.FC = () => {
  return (
    <Page>
        <IonCard>
          <IonCardHeader><IonCardTitle>Messdaten</IonCardTitle></IonCardHeader>
          <IonCardContent>Keine auffälligen Messdaten vorhanden.</IonCardContent>
        </IonCard>
        <IonCard>
          <IonCardHeader><IonCardTitle>Waagen</IonCardTitle></IonCardHeader>
          <IonCardContent>34 Stück registriert</IonCardContent>
        </IonCard>
    </Page>
  );
};

export default Home;
