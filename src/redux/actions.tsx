import * as consts from "./actionsConts";
import { UartParity } from "./enums";

export type Action = { type: string ; payload: any };


export const test_TEST_ACTION = (test:string): Action=>({
    type: consts.TEST_ACTION,
    payload: test
});

export const ACTION_CHANGE_BAUD_RATE = (test:number): Action=>({
    type: consts.CHANGE_BAUD_RATE,
    payload: test
});

export const ACTION_CHANGE_DATA_BITS = (test:number): Action=>({
    type: consts.CHANGE_DATA_BITS,
    payload: test
});

export const ACTION_CHANGE_STOP_BITS = (test:number): Action=>({
    type: consts.CHANGE_STOP_BITS,
    payload: test
});

export const ACTION_CHANGE_PARITY_BITS = (test:string): Action=>({
    type: consts.CHANGE_PARITY_BITS,
    payload: test
});

export const ACTION_CHANGE_FLOW_CONTROL = (test:string): Action=>({
    type: consts.CHANGE_FLOW_CONTROL,
    payload: test
});









export const ACTION_CHANGE_UART_TX_MESSAGE = (test:string): Action=>({
    type: consts.CHANGE_UART_TX_MESSAGE,
    payload: test
});

export const ACTION_APPEND_CMD_TERMINAL = (test:string): Action=>({
    type: consts.APPEND_CMD_TERMINAL,
    payload: test
});

export const ACTION_CHANGE_UART_CONNECTION_STATUS = (test:string): Action=>({
    type: consts.CHANGE_UART_CONNECTION_STATUS,
    payload: test
});

export const ACTION_SAVE_SETTINGS = (test:number): Action=>({
    type: consts.CHANGE_SAVE_SETTINGS,
    payload: test
});

export const ACTION_LOAD_SAVE_SETTINGS = (test:string): Action=>({
    type: consts.LOAD_SAVE_SETTINGS,
    payload: test
});