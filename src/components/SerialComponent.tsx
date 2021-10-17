import { IonContent, IonHeader,IonLabel,IonSegment,IonSegmentButton, IonSelect, IonSelectOption, IonTitle, IonToolbar,  IonList, IonItem,IonMenu  } from '@ionic/react';
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from 'react';
import { Serial } from '@ionic-native/serial';
import { isPlatform } from "@ionic/react";
import { AppState } from '../redux/reducer';
import {UartParity, ConnectionUartStatus, FlowControlType} from "../redux/enums"
import * as actions from "../redux/actions";
import './SidePanel.css';


/**
Difference's in the api

parity is even or odd thing
https://wicg.github.io/serial/#dom-flowcontroltype


cordova serial 
https://github.com/xseignard/cordovarduino/blob/2bbdc45e339d676b7a3267f75ed9ac43d9fcfbef/src/ubuntu/serial.cpp
https://doc.qt.io/qt-5/qserialport.html

//flow control android is dtr and rts
               web its cts and rts
*/



let port :any;

const SerialComponent: React.FC = () => {
    const uartState = useSelector<AppState, AppState["page"]["uartStatus"]>(
        (state) => state.page.uartStatus
        );

    const terminalUartTx = useSelector<AppState, AppState["page"]["terminalUartTX"]>(
        (state) => state.page.terminalUartTX
        );

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

    const dispatch = useDispatch();

    async function webSerialWrite(data:any) {
        let encoder = new TextEncoder();
        const dataArrayBuffer = encoder.encode(data);
    
        if (port && port.writable) {
            const writer = port.writable.getWriter();
            writer.write(dataArrayBuffer);
            writer.releaseLock();
        }
    }
    function setupAndroidSerial()
    {
        var parityValue = 0;
        if(parity == UartParity.evenParity) parityValue = 1;
        if(parity == UartParity.oddParity)  parityValue = 2;
        let hardwareFlowControl :boolean = false;
        if(flowControl == FlowControlType.hardware) hardwareFlowControl = true;

        Serial.requestPermission().then(() => {
            Serial.open({
            baudRate: baudRate,
            dataBits: dataBits,
            stopBits: stopBits, //can't be 0
            parity: parityValue,
            dtr: hardwareFlowControl,
            rts: hardwareFlowControl,
            sleepOnPause: false
            }).then(() => {
            });
        }).catch((error: any) => {
            console.log(error);
            alert(error)
            dispatch(actions.ACTION_CHANGE_UART_CONNECTION_STATUS(ConnectionUartStatus.notConnected));
        });
        //*
        
        let serialCallback = Serial.registerReadCallback();
        serialCallback.subscribe((data:any)=>{
            console.log("getting the data\n");
            console.log(data);
            try{
                var enc = new TextDecoder("utf-8");
                dispatch(actions.ACTION_APPEND_CMD_TERMINAL(enc.decode(data)));
            }catch(error)
            {
                console.log(error)
            }
        });
    }
    async function webGetReader()
    {
        try{
            console.log("webGetReader")
            var parityValue = "none";
            if(parity == UartParity.evenParity) parityValue = "even";
            if(parity == UartParity.oddParity)  parityValue = "odd";

            let nav : any = navigator;  
            port = await nav.serial.requestPort({});
            await port.open(
                { baudRate: baudRate,
                  dataBits: dataBits,
                  stopBits: stopBits,
                  parity: parityValue,
                  flowControl: flowControl
                }
            );
            
            const appendStream = new WritableStream({
                write(chunk) {
                    console.log("received UART RX")
                    dispatch(actions.ACTION_APPEND_CMD_TERMINAL(chunk));
                }
            });
    
            port.readable
                .pipeThrough(new TextDecoderStream())
                .pipeTo(appendStream);
                
            dispatch(actions.ACTION_CHANGE_UART_CONNECTION_STATUS(ConnectionUartStatus.connected));
    
        }catch(error)
        {
            console.log(error);
            alert(error);
            dispatch(actions.ACTION_CHANGE_UART_CONNECTION_STATUS(ConnectionUartStatus.notConnected));
        }
      
    }
    async function disconnectWebReader()
    {
    }

    useEffect(() =>{
        if(uartState == ConnectionUartStatus.tryingToConnect)
        {
            console.log("uart changed");
            if(isPlatform('android') && isPlatform('mobileweb'))
            {
                setupAndroidSerial();
            }
            else{
                webGetReader();
            }
        }
        if(uartState == ConnectionUartStatus.tryingToDisconnect)
        {
            /*
            if(isPlatform('android'))
            {
                Serial.close();
            }
            else
            {
                disconnectWebReader();
               
            }
            */
        }
    },[uartState]);






    useEffect(() =>{
        if(terminalUartTx != "")
        {
            console.log("terminal in " + terminalUartTx);
            dispatch(actions.ACTION_CHANGE_UART_TX_MESSAGE(""));
            if(isPlatform('android'))
            {
                Serial.write(terminalUartTx).then((buffer)=>{
                    console.log("worked")
                }).catch(()=>{
                    console.log("problems")
                });
            }
            else{
                webSerialWrite(terminalUartTx);
            }
            //
        }
        
    },[terminalUartTx]);


  return (
      <>
      </>
  );
};

export default SerialComponent;
