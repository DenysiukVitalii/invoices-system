import React, { Component } from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import { Modal } from 'react-bootstrap';
import myfetch from '../../myfetch';
import ModalFooter from '../shared/ModalFooter';

class EditCustomer extends Component {
    constructor(props) {
        super(props);
        this.state = {id: '', name: '', address: '', phone: ''};
        this.onChange = this.onChange.bind(this);
        this.editCustomer = this.editCustomer.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            id: nextProps.item.id,
            name: nextProps.item.name,
            address: nextProps.item.address,
            phone: nextProps.item.phone
        });
    }

    onChange(e) {
      this.setState({[e.target.name]: e.target.value});
    }
    
    editCustomer() {
      let item = {
        name: this.state.name,
        address: this.state.address,
        phone: this.state.phone
      };
     
      myfetch(`customers/${this.state.id}`, 'put', item)
      .then( data => { 
        if (data.id) {
          this.props.alert(this.getAlert(true, 'You edited customer!'));
          this.props.response(data);
        } else {
          console.log(data);
          this.props.alert(this.getAlert(false, 'You can\'t edited customer!'));
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
                <Modal.Header closeButton><Modal.Title>Edit customer</Modal.Title></Modal.Header>
                <Modal.Body>
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" className="form-control" 
                           defaultValue={this.state.name} onChange={this.onChange}/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input type="text" name="address" className="form-control" 
                           defaultValue={this.state.address} onChange={this.onChange}/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input type="text" name="phone" className="form-control" 
                           defaultValue={this.state.phone} onChange={this.onChange}/>
                  </div>
                </Modal.Body>
                <ModalFooter action={this.editCustomer} hide={this.props.hide} submitText="Edit"/>
            </Modal>
            {this.state.alert}
        </div>
      )
    }
  }
  
export default EditCustomer;