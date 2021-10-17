import { Redirect, Route } from 'react-router-dom';
import { Storage, Drivers } from "@ionic/storage";
import {useEffect} from "react";
import {
  IonApp,
  IonSplitPane, 
  IonPage
} from '@ionic/react';

import Tab1 from './pages/Tab1';
import SidePanel from './components/SidePanel'
import SerialComponent from './components/SerialComponent';


import { Provider } from "react-redux"
//import store  from "./redux/store"
import store from "./redux/store"

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



const App: React.FC = () => {

  return (
  <Provider store={store}>
    <IonApp>
      <IonSplitPane contentId="main">
        
        <SidePanel/>
        <IonPage id="main">
          <Tab1 />
        </IonPage>
      </IonSplitPane>
      <SerialComponent/>
    </IonApp>
  </Provider>
  );
};

export default App;

/*

    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/tab1">
            <Tab1 />
          </Route>
          <Route exact path="/tab2">
            <Tab2 />
          </Route>
          <Route exact path="/">
            <Redirect to="/tab1" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="tab1" href="/tab1">
            <IonIcon icon={triangle} />
            <IonLabel>Terminal</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab2" href="/tab2">
            <IonIcon icon={ellipse} />
            <IonLabel>Settings</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
*/