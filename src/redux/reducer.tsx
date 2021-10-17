import produce from "immer"
import * as consts  from "./actionsConts"
import {Action} from "./actions"
import { UartParity, ConnectionUartStatus,FlowControlType } from "./enums";

export interface AppState  {
    page:{
        test: string,
        terminalDisplay: string,
        terminalUartTX: string,
        uartStatus: ConnectionUartStatus,
        savedSettings: string
    }, 
    store:{
        uart:{
            baudRate: number,
            dataBits: number,
            stopBits: number,
            parity: UartParity,
            flowControl: FlowControlType

        }
    }
}

const initialState : AppState = {
    //properties of the page that will not be synced across all instances of the browser
    page:{
        "test": "test value",
        terminalDisplay : "",
        terminalUartTX : "",
        uartStatus : ConnectionUartStatus.notConnected,
        savedSettings: ""
    },
    store:{
        uart:{
            baudRate:9600,
            dataBits:8,
            stopBits:1,
            parity: UartParity.noParity,
            flowControl: FlowControlType.none
        }
    }
};

function rootReducer(state = initialState, action : Action){
    var updateLocalSyncObject = false;
    console.log(action)
    var newState = produce(state,draft =>{
        switch(action.type)
        {
            case consts.TEST_ACTION:
                draft.page.test = action.payload;
                break;
            case consts.CHANGE_BAUD_RATE:
                draft.store.uart.baudRate = action.payload;
                break;
            case consts.CHANGE_DATA_BITS:
                draft.store.uart.dataBits = action.payload;
                break;
            case consts.CHANGE_STOP_BITS:
                draft.store.uart.stopBits = action.payload;
                break;
            case consts.CHANGE_PARITY_BITS:
                draft.store.uart.parity = action.payload;
                break;

            case consts.CHANGE_UART_TX_MESSAGE:
                draft.page.terminalUartTX = action.payload;
                break;
            case consts.APPEND_CMD_TERMINAL:
                draft.page.terminalDisplay = action.payload;
                break;
            case consts.CHANGE_UART_CONNECTION_STATUS:
                draft.page.uartStatus = action.payload;
                break;

            case consts.CHANGE_SAVE_SETTINGS:
                draft.page.savedSettings = JSON.stringify(draft.store)
                break;
            case consts.LOAD_SAVE_SETTINGS:
                console.log("LOAD_SAVE_SETTINGS")
                try{
                    var storedValue = JSON.parse(action.payload);
                    console.log(storedValue)
                    draft.store = storedValue;
                }
                catch(error){
                    console.log(error)
                }
                break;
        }
       

    });

    console.log(newState)

    return newState;
}

export default rootReducer;