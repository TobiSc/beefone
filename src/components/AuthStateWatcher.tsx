import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, useIonRouter } from '@ionic/react';
import { useEffect } from 'react';
import { onAuthStateChanged } from '@firebase/auth';
import { auth } from '../context/Firebase';

const AuthStateWatcher: React.FC = () => {
  const router = useIonRouter()
  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (!user) router.push("/login");
    });
  }, [])
  return (
    <></>
  );
};

export default AuthStateWatcher;
