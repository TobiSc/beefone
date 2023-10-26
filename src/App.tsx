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
import React, { createContext, useState } from 'react';
import seedrandom from 'seedrandom';
import Locations from './pages/Locations/Locations';
import RegisterScale from './pages/RegisterScale/RegisterScale';
import AuthProvider from './context/AuthProvider';

setupIonicReact();

const ScaleContext = createContext<Scale[]>([]);

const dummyData = generateDummyData();

const App: React.FC = () => {
  const [scales, setScales] = useState<Scale[]>(dummyData);
  
  return (<IonApp>
    <AuthProvider>
    <ScaleContext.Provider value={scales}>
    <IonReactRouter>
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
      </IonRouterOutlet>
    </IonReactRouter>
    </ScaleContext.Provider>
    </AuthProvider>
  </IonApp>
)};

export default App;

export function useScales(): Scale[] {
  return React.useContext(ScaleContext);
}

function generateDummyData() : Scale[] {
  let scales: Scale[] = [];
  let generator = seedrandom("seed");
  for (let i = 0; i < 34; i++) {
      let id = generator.int32().toString()
      let scale: Scale = {
          id,
          name: `Waage ${i + 1}`,
          location: ["Bermatingen", "Buggensegel", "Markdorf", "Meersburg"][i%4],
          data: []
      }
      for (let j = 0; j < 168; j++) {
          let scaleData: ScaleData = {
              weight: generator() * 150,
              humidity: generator() * 100,
              timestamp: Date.now() - (1000 * 60 * 60 * j)
          }
          scale.data.push(scaleData);
      }
      scales.push(scale)
  }
  return scales;
}