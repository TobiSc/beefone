import { IonHeader, IonTitle, IonToolbar } from '@ionic/react';

const AppBar: React.FC = () => {
  return (
    <IonHeader>
        <IonToolbar>
          <IonTitle className="ion-text-center">Beefone</IonTitle>
        </IonToolbar>
      </IonHeader>
  );
};

export default AppBar;
