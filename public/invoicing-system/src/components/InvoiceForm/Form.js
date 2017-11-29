import React from 'react';
import ProductsForm from './ProductsForm';
import Discount from './Discount';
import Select from '../shared/Select';

const Form = (props) => (
    <div className="invoice-form">
      <Select title="Customer" name="selected_customer" change={props.changeCustomer}
              data={props.customers.map(customer => 
                    <option key={customer.id} value={customer.id}>{customer.name}</option>)} />
      <ProductsForm changeProducts={props.changeProducts} 
                products={props.products}
                addProduct={props.addProduct}
                account={props.account}
                changeQuantity={(product) => props.changeQuantity(product)}/>
      <Discount discount={props.discount} onChangeDiscount={props.changeDiscount}/>
      <div className="form-group">
        <h1>Total: ${props.total}</h1>
      </div>
    </div>
);

export default Form;