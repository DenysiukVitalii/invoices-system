import React from 'react';
import SelectProducts from './SelectProducts';
import TableProducts from './TableProducts';

const ProductsForm = (props) => (
  <div className="products">
    <SelectProducts change={props.changeProducts} 
                    products={props.products}
                    addProduct={props.addProduct}/>
    {props.account.length ? 
        <TableProducts account={props.account} 
                    change={(product) => props.changeQuantity(product)}/> : 
        <p className="text-center">No products</p>}
  </div>
);

export default ProductsForm;
