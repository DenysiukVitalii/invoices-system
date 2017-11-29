import React, { Component } from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import { Modal } from 'react-bootstrap';
import myfetch from '../../myfetch';
import ModalFooter from '../shared/ModalFooter';

class EditProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {id: '', name: '', price: ''};
        this.onChange = this.onChange.bind(this);
        this.editProduct = this.editProduct.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            id: nextProps.item.id,
            name: nextProps.item.name,
            price: nextProps.item.price,
        });
    }

    onChange(e) {
      this.setState({[e.target.name]: e.target.value});
    }
    
    editProduct() {
      let item = {
        name: this.state.name,
        price: +this.state.price
      };
     
      myfetch(`products/${this.state.id}`, 'put', item)
      .then( data => { 
        if (data.id) {
          this.props.alert(this.getAlert(true, 'You edited product!'));
          this.props.response(data);
        } else {
          console.log(data);
          this.props.alert(this.getAlert(false, 'You can\'t edited product!'));
        }
      });
    }

    getAlert(state, message) {
      return (state) ? (
          <SweetAlert success title="Success" onConfirm={() => this.props.hideAlert(true)}>
            {message}
          </SweetAlert>
        ) : (
          <SweetAlert error title="Error" onConfirm={() => this.props.hideAlert(false)}>
            {message}
          </SweetAlert>
        );
    }
  
    render() {
      return (
        <div>
            <Modal show={this.props.show} onHide={this.props.hide}>
                <Modal.Header closeButton><Modal.Title>Edit product</Modal.Title></Modal.Header>
                <Modal.Body>
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" className="form-control" 
                           defaultValue={this.state.name} onChange={this.onChange}/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input type="text" name="price" className="form-control" 
                           defaultValue={this.state.price} onChange={this.onChange}/>
                  </div>
                </Modal.Body>
                <ModalFooter action={this.editProduct} hide={this.props.hide} submitText="Edit"/>
            </Modal>
            {this.state.alert}
        </div>
      )
    }
  }
  
export default EditProduct;