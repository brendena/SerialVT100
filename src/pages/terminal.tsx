import { useState, useEffect, useRef } from "react";
import { isPlatform } from "@ionic/react";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from '../redux/reducer';
import {UartParity} from "../redux/enums"
import * as actions from "../redux/actions";

import React from 'react'; // we need this to make JSX compile

let term :any;

interface MyState {
    count: string
}




function calculate_size(win :any ) {
    var cols = Math.max(80, Math.min(150, (win.innerWidth - 280) / 7)) | 0;
    var rows = Math.max(24, Math.min(80, (win.innerHeight - 180) / 12)) | 0;
    return [cols, rows];
}



const Terminal: React.FC<MyState> = ({
    count
}) =>{
    const [status, setStatus] = useState("nothing yet");
    const divTerm = useRef(null);

    const terminalUpdate = useSelector<AppState, AppState["page"]["terminalDisplay"]>(
        (state) => state.page.terminalDisplay
        );
    const dispatch = useDispatch();

    
    useEffect(() => {    
        console.log("use effect");
        console.log(status)

        let self : any = window;
        var size = calculate_size(self);
        term = new self.Terminal({
            cols: size[0],
            rows: size[1],
            useStyle: true,
            screenKeys: true,
            cursorBlink: false,
            useEvents: true
        });

        
        term.open(divTerm.current);

        window.addEventListener('resize', function() {
            var size = calculate_size(self);
            term.resize(size[0], size[1]);
        });
        term.on('data', function(data:any) {
            console.log(data);
            dispatch(actions.ACTION_CHANGE_UART_TX_MESSAGE(data));
        });

        if(isPlatform('android') && isPlatform('mobileweb'))
        {
            term.write('\x1b[31mOn Android \x1b[m\r\n');
        }
        else
        {
            console.log("web browser");
            term.write('\x1b[31mOn web browser \x1b[m\r\n');
        }
    
    },[]);

    
    useEffect(() => { 
        console.log("terminal getting data")
        if(terminalUpdate != "")
        {
            dispatch(actions.ACTION_APPEND_CMD_TERMINAL(""));
            term.write(terminalUpdate);
        }
        
    },[terminalUpdate]);

    


    return (
        <div>
            <div id="termContainer">
                <div id="term" ref={divTerm}></div>
            </div>
        </div>
    );

}    
export default Terminal;



/*
export function terminal() {
    Serial.requestPermission().then(() => {
        Serial.open({
        baudRate: 9800,
        dataBits: 4,
        stopBits: 1,
        parity: 0,
        dtr: true,
        rts: true,
        sleepOnPause: false
        }).then(() => {
        console.log('Serial connection opened');
        });
    }).catch((error: any) => console.log(error));
}
*/