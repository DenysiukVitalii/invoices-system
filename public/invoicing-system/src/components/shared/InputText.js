import React from 'react';

const InputText = (props) => (
    <div className="form-group">
        <label htmlFor={props.name}>{props.label}</label>
            <input type="text" name={props.name} className="form-control" 
                    defaultValue={props.value} onChange={props.change} 
                    ref={props.refProp} placeholder={props.placeholder} pattern={props.pattern}/>
    </div>
);

export default InputText;