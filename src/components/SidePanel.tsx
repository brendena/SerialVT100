import { IonContent, IonHeader,IonLabel,IonSegment,IonSegmentButton, IonSelect, IonSelectOption, IonTitle, IonToolbar,  IonList, IonItem,IonMenu, IonButton  } from '@ionic/react';
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from 'react';
import { AppState } from '../redux/reducer';
import {UartParity, ConnectionUartStatus, FlowControlType} from "../redux/enums"
import * as actions from "../redux/actions";
import { isPlatform } from "@ionic/react";
import './SidePanel.css';


/**
Difference's in the api

parity is even or odd thing
https://wicg.github.io/serial/#dom-flowcontroltype

cordova serial 
https://github.com/xseignard/cordovarduino/blob/2bbdc45e339d676b7a3267f75ed9ac43d9fcfbef/src/ubuntu/serial.cpp
https://doc.qt.io/qt-5/qserialport.html

 */

const SidePanel: React.FC = () => {

    const baudRate = useSelector<AppState, AppState["store"]["uart"]["baudRate"]>(
        (state) => state.store.uart.baudRate
        );
    const dataBits = useSelector<AppState, AppState["store"]["uart"]["dataBits"]>(
        (state) => state.store.uart.dataBits
        );
    const stopBits = useSelector<AppState, AppState["store"]["uart"]["stopBits"]>(
        (state) => state.store.uart.stopBits
        );
    const parity = useSelector<AppState, AppState["store"]["uart"]["parity"]>(
        (state) => state.store.uart.parity
        );
    const flowControl = useSelector<AppState, AppState["store"]["uart"]["flowControl"]>(
        (state) => state.store.uart.flowControl
        );

    const uartConnectionStatus = useSelector<AppState, AppState["page"]["uartStatus"]>(
        (state) => state.page.uartStatus
        );

    const [baudRateLocal, setbaudRate] = useState(baudRate.toString());
    const [dataBitsLocal, setDataBits] = useState(dataBits.toString());
    const [stopBitLocal,  setStopBit]  = useState(stopBits.toString());

    const runningCordova = isPlatform("hybrid");
    //console.log("running cordova " + runningCordova);
    useEffect(()=>{
        setbaudRate(baudRate.toString());
        setDataBits(dataBits.toString());
        setStopBit(stopBits.toString());
    },[baudRate,dataBits,stopBits]);

    //const [stopBitsLocal, setStopBitsLocal] = useState(0);

    var possibleDataBitSizes = [7,8];
    if(runningCordova)
        possibleDataBitSizes = [5,6,7,8];

    const dispatch = useDispatch();

    const changeBaudRate = (baud:any) =>{
        
        if(baud != baudRateLocal){
            setbaudRate(baud.toString());
            dispatch(actions.ACTION_CHANGE_BAUD_RATE(parseInt(baud)));
        }
        
        
        //

    }
    const changeDataBits = (dataBitsParam:any) =>{
        console.log("changeDataBits " + dataBitsParam  )
        if(dataBitsParam != dataBitsLocal)
        {
            setDataBits(dataBitsParam);
            dispatch(actions.ACTION_CHANGE_DATA_BITS(parseInt(dataBitsParam)));
        }
        
    }
    const changeStopBits = (stopBitsParam:any) =>{
        console.log("stopBitsParam " + stopBitsParam  )
        if(stopBitsParam != stopBitLocal)
        {
            setStopBit(stopBitsParam);
            dispatch(actions.ACTION_CHANGE_STOP_BITS(parseInt(stopBitsParam)));
        }
        
    }

    const changeParity = (parity:any) =>{
        dispatch(actions.ACTION_CHANGE_PARITY_BITS((parity)));
    }

    const changeFlowControl = (parity:any) =>{
        dispatch(actions.ACTION_CHANGE_FLOW_CONTROL((parity)));
    }

    const connectUart = ()=>{
        dispatch(actions.ACTION_CHANGE_UART_CONNECTION_STATUS((ConnectionUartStatus.tryingToConnect)));
    }
    const disconnectUart = ()=>{
        dispatch(actions.ACTION_CHANGE_UART_CONNECTION_STATUS((ConnectionUartStatus.tryingToDisconnect)));
    }
    const saveUartSettings = ()=>{
        dispatch(actions.ACTION_SAVE_SETTINGS((1)));
    }
    

  return (
    <IonMenu contentId="main" menuId="mainMenu">
        <IonHeader>
            <IonToolbar>
                <IonTitle>
                    settings
                </IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent>
            <div>
                <IonItem>uart settings</IonItem>
                <IonItem>
                    <IonLabel>baud rate</IonLabel>
                    <IonSelect value={baudRateLocal} onIonChange={e => changeBaudRate(e.detail.value)}>
                        <IonSelectOption value="1200">1200</IonSelectOption>
                        <IonSelectOption value="2400">2400</IonSelectOption>
                        <IonSelectOption value="4800">4800</IonSelectOption>
                        <IonSelectOption value="9600">9600</IonSelectOption>
                        <IonSelectOption value="19200">19200</IonSelectOption>
                        <IonSelectOption value="38400">38400</IonSelectOption>
                        <IonSelectOption value="57600">57600</IonSelectOption>
                        <IonSelectOption value="115200">115200</IonSelectOption>
                    </IonSelect>
                </IonItem>
                <IonItem>
                    data bits
                    <IonSegment value={dataBitsLocal} onIonChange={e => changeDataBits(e.detail.value)} >
                        {possibleDataBitSizes.map(dataBitSize=>(
                        <IonSegmentButton key={dataBitSize.toString()} value={dataBitSize.toString()}>
                            <IonLabel>{dataBitSize}</IonLabel>
                        </IonSegmentButton>
                        ))}
                        
                    </IonSegment>
                </IonItem>
                <IonItem>
                    stop bits
                    <IonSegment value={stopBitLocal} onIonChange={e => changeStopBits(e.detail.value)} >
                        <IonSegmentButton value={"1"}>
                            <IonLabel>1</IonLabel>
                        </IonSegmentButton>
                        <IonSegmentButton value={"2"}>
                            <IonLabel>2</IonLabel>
                        </IonSegmentButton>
                    </IonSegment>
                </IonItem>
                <IonItem>

                    parity
                    <IonSegment value={parity} onIonChange={e => changeParity(e.detail.value)} >
                        <IonSegmentButton value={UartParity.noParity}>
                            <IonLabel>none</IonLabel>
                        </IonSegmentButton>
                        <IonSegmentButton value={UartParity.oddParity}>
                            <IonLabel>odd</IonLabel>
                        </IonSegmentButton>
                        <IonSegmentButton value={UartParity.evenParity}>
                            <IonLabel>even</IonLabel>
                        </IonSegmentButton>
                    </IonSegment>
                </IonItem>
                <IonItem>
                    
                    flow control
                    <IonSegment value={flowControl} onIonChange={e => changeFlowControl(e.detail.value)} >
                        <IonSegmentButton value={FlowControlType.none}>
                            <IonLabel>None</IonLabel>
                        </IonSegmentButton>
                        <IonSegmentButton value={FlowControlType.hardware}>
                            <IonLabel>Hardware</IonLabel>
                        </IonSegmentButton>
                    </IonSegment>
                </IonItem>
                <IonItem>
                    {uartConnectionStatus == ConnectionUartStatus.connected ? (
                        <IonItem>connected</IonItem>
                    ):
                        
                        <IonButton onClick={() => {connectUart()}}>
                            connect
                        </IonButton>
                    }
                    
                    <IonButton onClick={() => {saveUartSettings()}}>
                        save settings
                    </IonButton>
                </IonItem>
            </div>
        </IonContent>
    </IonMenu>
  );
};

export default SidePanel;
