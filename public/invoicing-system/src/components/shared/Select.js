import React from 'react';

const Select = (props) => (
    <div className="form-group">
        <label htmlFor={props.name}>{props.title}</label>
          <select name={props.name} className="form-control" 
                  onChange={props.change}>
              {props.data}
          </select>
    </div>
);

export default Select;