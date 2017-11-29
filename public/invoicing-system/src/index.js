import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Invoices from './components/Invoices/Invoices.js';
import InvoiceForm from './components/InvoiceForm/InvoiceForm.js';
import Customers from './components/Customers/Customers.js';
import Products from './components/Products/Products.js';


ReactDOM.render(( 
   <BrowserRouter className="container">
     <Switch>
       <Route exact path="/" component={Invoices}/>
       <Route path="/create_invoice" component={InvoiceForm}/>
       <Route path="/customers" component={Customers}/>
       <Route path="/products" component={Products}/>
     </Switch>
    </BrowserRouter>
), document.getElementById('root'));
registerServiceWorker();