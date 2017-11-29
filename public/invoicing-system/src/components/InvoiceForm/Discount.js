import React from 'react';

const Discount = (props) => (
    <div className="form-group">
        <label htmlFor="selected_product">Discount</label>
        <input type="number" name="discount" className="form-control" 
                defaultValue={props.discount} placeholder="Discount" onChange={props.onChangeDiscount}/>
    </div>
  )

export default Discount;
