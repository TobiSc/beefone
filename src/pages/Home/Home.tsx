import { IonCard, IonCardContent, IonCardHeader, IonCardTitle} from '@ionic/react';
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
