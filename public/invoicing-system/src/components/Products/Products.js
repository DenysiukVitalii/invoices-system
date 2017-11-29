import React, { Component } from 'react';
import myfetch from '../../myfetch';
import SweetAlert from 'react-bootstrap-sweetalert';
import Header from '../shared/Header';
import EditProduct from './EditProduct';
import FaPencil from 'react-icons/lib/fa/pencil';
import FaTrash from 'react-icons/lib/fa/trash';

class Products extends Component {
  constructor() {
    super();
    this.state = {products: [], editModal: false, currentItem: '', alert: null};
    this.closeEditModal = this.closeEditModal.bind(this);
    this.callAlert = this.callAlert.bind(this); 
    this.hideAlert = this.hideAlert.bind(this);
    this.dataAfterEdit = this.dataAfterEdit.bind(this);
  }

  componentDidMount() {
    this.getProducts();
  }

  getProducts() {
    myfetch('products')
    .then( data => { 
      console.log(data);
      this.setState({ products: data });
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
    let products = this.state.products;
    products = products.map(e => (e.id === data.id) ? data : e);
    this.setState({products: products});
  }


  deleteProduct(item) {
   myfetch(`products/${item.id}`, 'delete', {mode: 'no-cors'})
    .then((data) => {
      console.log(data);
      if (data) {
        this.setState({products: this.deletedItem(item) });
      } else {
        const getError = () => (
          <SweetAlert error title="Error" onConfirm={this.hideAlert}>
            You can't delete this product!
          </SweetAlert>
        );
        this.setState({
          alert: getError()
        });
      }
    });
  }

  deletedItem(item) {
    let products = this.state.products;
    let ids = products.map(i => +i.id);
    let index = ids.indexOf(item.id);
    products.splice(index, 1);
    return products;
  }

  render() {
    return (
      <div className="container">
        <Header title="Products" btn="Invoices" link="/"/>
         <main>
            <Table products={this.state.products} 
                    openEditModal={(e) => this.openEditModal(e)}
                    deleteProduct={(e) => this.deleteProduct(e)}/>
              {this.state.alert}
        </main>
        <EditProduct show={this.state.editModal} hide={this.closeEditModal} 
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
      {props.products.map(e => (
              <tr key={e.id} align="center">
                <td>{e.name}</td>
                <td>{e.price}</td>
                <td>{e.createdAt}</td>
                <td>{e.updatedAt}</td>
                <td width="10%">
                    <button className="btn btn-warning" onClick={() => props.openEditModal(e)}><FaPencil/></button>
                    <button className="btn btn-danger" onClick={() => props.deleteProduct(e)}><FaTrash/></button>
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
          <td>Price</td>
          <td>CreatedAt</td>
          <td>UpdatedAt</td>
          <td>Actions</td>
      </tr>
    </thead>
  )

export default Products;