import React, { useContext } from 'react';
import ReactSlider from 'react-slider'
import '../scss/slider.scss'
import BcakButton from './BcakButton';
import SettingsContext from './SettingsContext';

function Settings() {
    const settingsInfo = useContext(SettingsContext);
    

    return (
        <div style={{textAlign: 'left'}}>
            <label>work minutes: {settingsInfo.workMinutes}:00</label>
            <ReactSlider 
                className={'slider'}
                thumbClassName={'thumb'}
                trackClassName={'track'}
                value={settingsInfo.workMinutes}
                onChange={newVal => settingsInfo.setWorkMinutes(newVal)}
                min={1}
                max={120}/>
            <label>break minutes: {settingsInfo.breakMinutes}:00</label>
            <ReactSlider 
                className={'slider green'}
                thumbClassName={'thumbgreen'}
                trackClassName={'track'}
                value={settingsInfo.breakMinutes}
                onChange={newVal => settingsInfo.setBreakMinutes(newVal)}
                min={1}
                max={120} />
                <div style={{textAlign: "center", marginTop:"20px"}}>
                <BcakButton onClick={() => settingsInfo.setShowSettings(false)}/>
                </div>
        </div>
    );
}

export default Settings;