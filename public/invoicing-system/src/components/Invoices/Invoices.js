import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';
import myfetch from '../../myfetch';
import Table from './Table';

class Invoices extends Component {
  constructor() {
    super();
    this.state = {invoices: [], customers: []};
  }

  componentDidMount() {
   this.getCustomers();
  }

  getInvoices() {
    myfetch('invoices')
    .then( data => { 
      let invoices = this.bindCustomersWithInvoices(data);
      console.log(invoices);
      this.setState({ invoices: invoices });
    })
    .catch(error => {
      console.log('Error fetching and parsing data', error);
    });
  }

  bindCustomersWithInvoices(invoices) {
    let customers = this.state.customers;
    for (let i = 0; i < invoices.length; i++) {
      for (let j = 0; j < customers.length; j++) {
        if (invoices[i].customer_id === customers[j].id) {
          invoices[i].customer = customers[j].name;
        }
      }
    }
    invoices = invoices.filter(e => e.customer); // bug on api when delete customer, 
                                                 // without filter - output invoices with no existing customers
    return invoices;
  }

  getCustomers() {
    myfetch('customers')
    .then( data => { 
      console.log(data);
      this.setState({ customers: data });
      this.getInvoices();
    })
    .catch(error => {
      console.log('Error fetching and parsing data', error);
    });
  }

  deleteInvoice(item) {
    myfetch(`invoices/${item.id}`, 'delete', {mode: 'no-cors'})
     .then((data) => {
       console.log(data);
       if (data) {
         this.setState({invoices: this.deletedItem(item) });
       } else {
         const getError = () => (
           <SweetAlert error title="Error" onConfirm={this.hideAlert}>
             You can't delete this invoice!
           </SweetAlert>
         );
         this.setState({
           alert: getError()
         });
       }
     });
   }
 
   deletedItem(item) {
     let invoices = this.state.invoices;
     let ids = invoices.map(i => +i.id);
     let index = ids.indexOf(item.id);
     invoices.splice(index, 1);
     return invoices;
   }

  render() {
    return (
       <div className="container">
         <Header title="Invoices" btn="Create invoice" link="/create_invoice" />
         <Table invoices={this.state.invoices} deleteInvoice={(e) => this.deleteInvoice(e)}/>
       </div>
    );
  }
}

const Header = props => (
  <header>
       <h1 className="text-left">Invoices</h1>
       <div>
        <Link className="btn" to="/customers">Customers</Link>
        <Link className="btn" to="/products">Products</Link>
        <Link className="btn" to="/create_invoice">Create invoice</Link>
       </div>
   </header>
);

export default Invoices;
