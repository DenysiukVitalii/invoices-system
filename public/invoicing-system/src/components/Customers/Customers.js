import React, { Component } from 'react';
import myfetch from '../../myfetch';
import Header from '../shared/Header';
import SweetAlert from 'react-bootstrap-sweetalert';
import EditCustomer from './EditCustomer';
import FaPencil from 'react-icons/lib/fa/pencil';
import FaTrash from 'react-icons/lib/fa/trash';

class Customers extends Component {
  constructor() {
    super();
    this.state = {customers: [], editModal: false, currentItem: '', alert: null};
    this.closeEditModal = this.closeEditModal.bind(this);
    this.callAlert = this.callAlert.bind(this); 
    this.hideAlert = this.hideAlert.bind(this);
    this.dataAfterEdit = this.dataAfterEdit.bind(this);
  }

  componentDidMount() {
    this.getCustomers();
  }

  getCustomers() {
    myfetch('customers')
    .then( data => { 
      console.log(data);
      this.setState({ customers: data });
    })
    .catch(error => {
      console.log('Error fetching and parsing data', error);
    });
  }

  closeEditModal() {
    this.setState({ editModal: false, currentItem: '' });
  }

  async openEditModal(item) {
    await this.setState({ editModal: true, currentItem: item });
    console.log(this.state.currentItem);
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
  
  dataAfterEdit(data) {
    let customers = this.state.customers;
    customers = customers.map(e => (e.id === data.id) ? data : e);
    this.setState({customers: customers});
  }

  deleteCustomer(item) {
    myfetch(`customers/${item.id}`, 'delete', {mode: 'no-cors'})
     .then((data) => {
       console.log(data);
       if (data) {
         this.setState({customers: this.deletedItem(item) });
       } else {
         const getError = () => (
           <SweetAlert error title="Error" onConfirm={this.hideAlert}>
             You can't delete this customer!
           </SweetAlert>
         );
         this.setState({
           alert: getError()
         });
       }
     });
   }
 
   deletedItem(item) {
     let customers = this.state.customers;
     let ids = customers.map(i => +i.id);
     let index = ids.indexOf(item.id);
     customers.splice(index, 1);
     return customers;
   }

  render() {
    return (
      <div className="container">
        <Header title="Customers" btn="Invoices" link="/"/>
         <main>
            <Table customers={this.state.customers} 
                    openEditModal={(e) => this.openEditModal(e)}
                    deleteCustomer={(e) => this.deleteCustomer(e)}/>
              {this.state.alert}
        </main>
        <EditCustomer show={this.state.editModal} hide={this.closeEditModal} 
                   alert={this.callAlert} hideAlert={(e) => this.hideAlert(e)}
                   item={this.state.currentItem} response={this.dataAfterEdit}/>
      </div>
    );
  }
}

const Table = props => (
  <table className="table table-hover">
      <Thead />
      <tbody>
      {props.customers.map(e => (
              <tr key={e.id} align="center">
                <td>{e.name}</td>
                <td>{e.address}</td>
                <td>{e.phone}</td>
                <td>{e.createdAt}</td>
                <td>{e.updatedAt}</td>
                <td width="10%">
                    <button className="btn btn-warning" onClick={() => props.openEditModal(e)}><FaPencil/></button>
                    <button className="btn btn-danger" onClick={() => props.deleteCustomer(e)}><FaTrash/></button>
                </td>
              </tr>
            ))}
      </tbody>
  </table>
);

const Thead = () => (
    <thead align="center" className="blue-background bold">
      <tr>
          <td>Name</td>
          <td>Address</td>
          <td>Phone</td>
          <td>CreatedAt</td>
          <td>UpdatedAt</td>
          <td>Actions</td>
      </tr>
    </thead>
  )

export default Customers;