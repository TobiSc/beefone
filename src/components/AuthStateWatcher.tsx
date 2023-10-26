import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, useIonRouter} from '@ionic/react';
import { useAuth } from '../context/AuthProvider';
import { useEffect } from 'react';

const AuthStateWatcher: React.FC = () => {
  const { user } = useAuth();
  const router = useIonRouter()
  useEffect(()=>{
    if (!user) {
        router.push("/login");
    }
  }, [user])
  return (
    <></>
  );
};

export default AuthStateWatcher;
