import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonInput, useIonRouter} from '@ionic/react';
import Page from '../../components/Page';
import { useAuth } from '../../context/AuthProvider';
import { useState } from 'react';

const Login: React.FC = () => {
  const { login, createAccount } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useIonRouter();

  const submitLogin = async () => {
    if (email && password) {
      let success = await login(email, password);
      if (success) router.push("/home");
    }
  }

  const submitRegister = async () => {
    if (email && password) {
      let success = await createAccount(email, password);
      if (success) router.push("/home");
    }
  }

  return (
    <Page>
      <IonCard>
        <IonCardContent class="vertical-flex defaultPadding">
          <h2>Benutzerdaten</h2>
          <IonInput type="email" value={email} onIonChange={(e)=>setEmail((e.target.value || "").toString())} fill="outline" labelPlacement="stacked" label="E-Mail" />
          <IonInput type="password" value={password} onIonChange={(e)=>setPassword((e.target.value || "").toString())} fill="outline" labelPlacement="stacked" label="Passwort" />
          <IonButton onClick={submitLogin}>Anmelden</IonButton>
          <IonButton onClick={submitRegister}>Registrieren</IonButton>
        </IonCardContent>
      </IonCard>
    </Page>
  );
};

export default Login;
