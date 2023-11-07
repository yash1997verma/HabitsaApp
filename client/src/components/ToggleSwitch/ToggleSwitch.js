//this is a reusable component for toggle between two states
//it accepts two values
import React, { useState } from 'react';
import ReactSwitch from 'react-switch';
import { useDispatch } from 'react-redux';
import { habitsActions } from '../../redux/habitsSlice';
function ToggleSwitch({appView}) {
  const dispatch  = useDispatch();
  const handleChange = (val) => {
    dispatch(habitsActions.setAppView());
  }

  return (
    <div className="app mx-2" style={{textAlign: "center"}}>
      <ReactSwitch
        height={30}
        width={70}
        checked={appView}
        onChange={handleChange}
        onColor='#e1e1e2'
        offColor='#1564bf'
        uncheckedIcon = {false}
        checkedIcon={false}
      />
    </div>
  );
}

export default ToggleSwitch;