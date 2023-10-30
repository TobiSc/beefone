import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonPage, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home/Home';
import "./App.css";

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Sidebar from './components/Sidebar';
import AppBar from './components/AppBar';
import Scales from './pages/Scales/Scales';
import React, { createContext, useEffect, useState } from 'react';
import seedrandom from 'seedrandom';
import Locations from './pages/Locations/Locations';
import RegisterScale from './pages/RegisterScale/RegisterScale';
import { Scale, ScaleData } from './types/global';
import Login from './pages/Login/Login';
import AuthStateWatcher from './components/AuthStateWatcher';
import { doc, setDoc } from '@firebase/firestore';
import { firestore } from './context/Firebase';
import { QueryDocumentSnapshot, collection, getDocs, query } from "@firebase/firestore";
import ScaleDetail from './pages/ScaleDetail/ScaleDetail';

setupIonicReact();

const ScaleContext = createContext<QueryDocumentSnapshot<Scale, Scale>[]>([]);

const App: React.FC = () => {
  const [scales, setScales] = useState<QueryDocumentSnapshot<Scale, Scale>[]>([])
  useEffect(() => {
    let scalesQuery = query(
      collection(firestore, "scales").withConverter({ toFirestore: (data: Scale) => data, fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as Scale })
    );
    getDocs(scalesQuery).then(querySnapshot => {
      setScales(querySnapshot.docs)
    })
  }, [])

  return (<IonApp>
    <ScaleContext.Provider value={scales}>
      <IonReactRouter>
        <AuthStateWatcher />
        <Sidebar />
        <AppBar />
        <IonRouterOutlet>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route exact path="/scales">
            <Scales />
          </Route>
          <Route exact path="/locations">
            <Locations />
          </Route>
          <Route exact path="/register-scale">
            <RegisterScale />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route path="/scale-detail/:id">
            <ScaleDetail />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </ScaleContext.Provider>
  </IonApp>
  )
};

export default App;

export function useScales(): QueryDocumentSnapshot<Scale, Scale>[] {
  return React.useContext(ScaleContext);
}