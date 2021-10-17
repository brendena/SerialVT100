import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,  IonList, IonItem, IonRouterOutlet,IonMenuToggle, IonButton, IonMenuButton  } from '@ionic/react';
import { useSelector, useDispatch } from "react-redux";
import {useEffect} from "react";
import { AppState } from '../redux/reducer';
import { Storage, Drivers } from "@ionic/storage";
import * as actions from "../redux/actions";
import './Tab1.css';
import  Terminal  from './terminal';


let storage : Storage
const Tab1: React.FC = () => {
  const dispatch = useDispatch();


  const savedSettings = useSelector<AppState, AppState["page"]["savedSettings"]>(
    (state) => state.page.savedSettings
    );

  useEffect(() => {

		const setupStore = async () => {

      storage = new Storage({
          name: "mydb",
          driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage]
      });
      storage.create();

      storage.get("savedDB").then((value)=>{
        console.log("Database " + value);
        if(value != null && value != "")
        {
          dispatch(actions.ACTION_LOAD_SAVE_SETTINGS(value));
        }
      })
		}

		setupStore();
	}, []);

  useEffect(() => {
    console.log(savedSettings)
    if(storage != null && savedSettings != '')
    {
      console.log('saved data')
      storage.set("savedDB",savedSettings);
    }
  },[savedSettings]);
  

  return (
    <IonPage>
      <IonContent fullscreen>


        <IonHeader>
          <IonToolbar >
            <IonMenuToggle menu="mainMenu"> 
              <IonButton>
                menu 
              </IonButton>
            </IonMenuToggle>
            
            
          </IonToolbar>

        </IonHeader>
        <IonContent>
          <Terminal count="1" />

        </IonContent>
      </IonContent>
    </IonPage>
  );
};
// collapse="condense"

export default Tab1;
