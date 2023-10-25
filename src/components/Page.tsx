import { IonContent, IonPage } from '@ionic/react';
import React from 'react';
import AppBar from './AppBar';
import Sidebar from './Sidebar';
import './Page.css';

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