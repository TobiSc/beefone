import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import React from 'react';
import AppBar from './AppBar';
import Sidebar from './Sidebar';

type PageProps = {}
type ChildrenProp = {
  children: React.ReactElement | React.ReactElement[]
}

const Page: React.FC<ChildrenProp> = ({children}) => {
  return (
    <IonPage>
        <AppBar />
        <Sidebar />
      <IonContent>
        <div className='content'>
        {children}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Page;