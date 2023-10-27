import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonInput, useIonRouter } from '@ionic/react';
import Page from '../../components/Page';
import { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@firebase/auth';
import { auth } from '../../context/Firebase';

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useIonRouter();

  const submitLogin = async () => {
    if (email && password) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        router.push("/home")
      } catch (error) {
        console.log(error);
      }
    }
  }

  const submitRegister = async () => {
    if (email && password) {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        router.push("/home")
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <Page>
      <IonCard>
        <IonCardContent class="vertical-flex defaultPadding">
          <h2>Benutzerdaten</h2>
          <IonInput type="email" value={email} onIonChange={(e) => setEmail((e.target.value || "").toString())} fill="outline" labelPlacement="stacked" label="E-Mail" />
          <IonInput type="password" value={password} onIonChange={(e) => setPassword((e.target.value || "").toString())} fill="outline" labelPlacement="stacked" label="Passwort" />
          <IonButton onClick={submitLogin}>Anmelden</IonButton>
          <IonButton onClick={submitRegister}>Registrieren</IonButton>
        </IonCardContent>
      </IonCard>
    </Page>
  );
};

export default Login;
