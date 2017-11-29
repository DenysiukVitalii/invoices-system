import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import myfetch from '../../myfetch';
import Form from './Form';
import CreateCustomer from './CreateCustomer';
import CreateProduct from './CreateProduct';


class InvoiceForm extends Component {
  constructor() {
    super();
    this.state = {customers: [], selected_customer: '', products: [], selected_product: '',
                  account: [], discount: 0, total: 0, invoices: [], createCustomerModal: false,
                  createProductModal: false, alert: null};

    this.onChange = this.onChange.bind(this);
    this.addProduct = this.addProduct.bind(this);
    this.onChangeDiscount = this.onChangeDiscount.bind(this);
    this.openCreateCustomerModal = this.openCreateCustomerModal.bind(this);
    this.closeCreateCustomerModal = this.closeCreateCustomerModal.bind(this);
    this.openCreateProductModal = this.openCreateProductModal.bind(this);
    this.closeCreateProductModal = this.closeCreateProductModal.bind(this);
    this.hideAlert = this.hideAlert.bind(this);
    this.callAlert = this.callAlert.bind(this); 
    this.dataAfterCreateCustomer = this.dataAfterCreateCustomer.bind(this);
    this.dataAfterCreateProduct = this.dataAfterCreateProduct.bind(this);
  }

  componentDidMount() {
    this.getCustomers();
    this.getProducts();
    this.getInvoices();
  } 

  getCustomers() {
    myfetch('customers')
    .then( data => { 
      this.setState({ customers: data, selected_customer: data[0].id });
    })
    .catch(error => {
      console.log('Error fetching and parsing data', error);
    });
  }
  
  getProducts() {
    myfetch('products')
    .then( data => { 
      console.log(data);
      this.setState({ products: data, selected_product: data[0].id });
    })
    .catch(error => {
      console.log('Error fetching and parsing data', error);
    });
  }

  getInvoices() {
    myfetch('invoices')
    .then( data => { 
      console.log(data);
      this.setState({ invoices: data });
    })
    .catch(error => {
      console.log('Error fetching and parsing data', error);
    });
  }

 checkForExistInvoice() {
    let invoices_customers = this.state.invoices.map(e => e.customer_id);
    console.log(invoices_customers);
    let selected_customer = +this.state.selected_customer;
    console.log(selected_customer);
    return (!!~invoices_customers.indexOf(selected_customer)) ? true : false;
  }

  async onChange(e) {
    await this.setState({[e.target.name]: +e.target.value});
    console.log(this.checkForExistInvoice());
    (this.checkForExistInvoice()) ? this.editInvoice() : this.addInvoice();
  }

  async onChangeQuantity(product, event) {
    let account = this.state.account;
    account.map(e => { 
      if (product.id === e.id) e.quantity = +event.target.value;
      return e;
    })
    await this.setState({account: account});
    this.getTotal(this.state.discount);
    (this.checkForExistInvoice()) ? this.editInvoice() : this.addInvoice();
  }

  onChangeDiscount(e) {
    this.setState({[e.target.name]: +e.target.value});
    this.getTotal(+e.target.value);
  }

  addProduct() {
    let products = this.state.products;
    let selected_product = +this.state.selected_product;
    let account = this.state.account;
    let ids_products = account.map(e => e.id);
    if (!!~ids_products.indexOf(selected_product)) return;
    products.forEach(e => {
      if (selected_product === e.id) selected_product = e;
    });
    selected_product.quantity = 0;
    account.push(selected_product);
    this.setState({account: account});
  }

  async getTotal(discount = 0) {
    let account = this.state.account.map(e => ({quantity: e.quantity, price: e.price}));
    let total = 0;
    account.forEach(e => {total += e.quantity * e.price});
    total = (total - total * +discount / 100).toFixed(2);
    await this.setState({total: +total});
    (this.checkForExistInvoice()) ? this.editInvoice() : this.addInvoice();
  }

  addInvoice() {
    let item = {
      customer_id: this.state.selected_customer,
      discount: this.state.discount,
      total: this.state.total
    };
    
    myfetch('invoices', 'post', item)
    .then( data => { 
      console.log(data);
      let invoices = this.state.invoices;
      invoices.push(data);
      this.setState({invoices: invoices});
    })
    .catch(error => {
      console.log('Error fetching and parsing data', error);
    });
  }

  editInvoice() {
    let item = {
      customer_id: this.state.selected_customer,
      discount: this.state.discount,
      total: this.state.total
    };

    let id_invoice = this.state.invoices
                         .filter(e => e.customer_id === item.customer_id)[0].id;

    myfetch(`invoices/${id_invoice}`, 'put', item)
    .then( data => { 
      console.log(data);
    })
    .catch(error => {
      console.log('Error fetching and parsing data', error);
    });
  }

  dataAfterCreateCustomer() {
    this.getCustomers();
  }

  dataAfterCreateProduct() {
    this.getProducts();
  }

  // methods for modal
  closeCreateCustomerModal() {
    this.setState({ createCustomerModal: false });
  }

  async openCreateCustomerModal() {
    await this.setState({ createCustomerModal: true });
  }

  closeCreateProductModal() {
    this.setState({ createProductModal: false });
  }

  async openCreateProductModal() {
    await this.setState({ createProductModal: true });
  }

  // methods for alert
  hideAlert(state) {
    if (!state) {
      this.setState({
        alert: null
      });
    } else {
      this.setState({
        alert: null,
        editModal: false
      });
    }
  }

  callAlert(value) {
    this.setState({
      alert: value
    });
  }
  
  render() {
    return (
       <div className="container">
        <Header title="Invoice Form" btn="Invoices" link="/" 
                customerModal={this.openCreateCustomerModal}
                productModal={this.openCreateProductModal}/>
        <Form changeCustomer={this.onChange} 
              customers={this.state.customers}
              products={this.state.products}
              changeProducts={this.onChange}
              addProduct={this.addProduct}
              account={this.state.account}
              changeQuantity={(product) => this.onChangeQuantity.bind(this, product)}
              discount={this.state.discount}
              changeDiscount={this.onChangeDiscount}
              total={this.state.total} />
        <CreateCustomer show={this.state.createCustomerModal} hide={this.closeCreateCustomerModal}
                    alert={this.callAlert} hideAlert={this.hideAlert}
                    response={this.dataAfterCreateCustomer}/>
        <CreateProduct show={this.state.createProductModal} hide={this.closeCreateProductModal}
                    alert={this.callAlert} hideAlert={this.hideAlert}
                    response={this.dataAfterCreateProduct}/>
        {this.state.alert}
       </div>
    );
  }
}


const Header = props => (
  <header>
       <h1 className="text-left">{props.title}</h1>
       <div>
          <button className="btn" onClick={props.customerModal}>Create customer</button>
          <button className="btn" onClick={props.productModal}>Create Product</button>
          <Link className="btn" to={props.link}>{props.btn}</Link>
       </div>
   </header>
);


export default InvoiceForm;