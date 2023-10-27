import { IonBackButton, IonButtons, IonHeader, IonTitle, IonToolbar, useIonRouter } from '@ionic/react';
import { useMemo } from 'react';
import { useAuth } from '../context/AuthProvider';

const AppBar: React.FC = () => {
  const router = useIonRouter();
  const { user } = useAuth();

  const backTarget = useMemo(() => {
    if (!user) return "";
    if (router.routeInfo.lastPathname && router.routeInfo.pathname !== "/home") {
      return router.routeInfo.lastPathname;
    }
    switch (router.routeInfo.pathname) {
      case "/register-scale":
      case "/locations":
      case "/scales": return "/home";
      default: return "";
    }
  }, [router.routeInfo.pathname]);

  const title = useMemo(() => {
    switch (router.routeInfo.pathname) {
      case "/register-scale": return "Waage registrieren";
      case "/locations": return "Standorte";
      case "/scales": return "Alle Waagen";
      case "/login": return "Beefone Login";
      default: return "Beefone";
    }
  }, [router.routeInfo.pathname])

  return (
    <IonHeader>
      <IonToolbar>
        {
          backTarget && (<IonButtons slot="start">
            <IonBackButton defaultHref={backTarget}></IonBackButton>
          </IonButtons>)
        }
        <IonTitle className="ion-text-center">{title}</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
};

export default AppBar;
