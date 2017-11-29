import React from 'react';

const SelectProducts = (props) => (
   <div className="form-group">
        <label htmlFor="selected_product">Product</label>
        <div className="add-product">
          <select name="selected_product" className="form-control" 
                  onChange={props.change}>
              {props.products.map(product => <option key={product.id} value={product.id}>{product.name}</option>)}
          </select>
          <button onClick={props.addProduct}>Add</button>
        </div>
    </div>
);


export default SelectProducts;
