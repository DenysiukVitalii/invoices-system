import React, { Component } from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import { Modal } from 'react-bootstrap';
import myfetch from '../../myfetch';
import InputText from '../shared/InputText';
import ModalFooter from '../shared/ModalFooter';

class CreateCustomer extends Component {
    constructor(props) {
        super(props);
        this.state = {name: '', address: '', phone: ''};
        this.onChange = this.onChange.bind(this);
        this.createCustomer = this.createCustomer.bind(this);
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    createCustomer() {
        let item = {
            name: this.state.name,
            address: this.state.address,
            phone: this.state.phone
        };

        myfetch('customers', 'post', item)
        .then( data => { 
            console.log(data);
            if (data.id) {
            this.props.alert(this.getAlert(true, 'You create new customer!'));
            this.props.response(data);  
            this.clearForm();
            } else {
            this.props.alert(this.getAlert(false, "Such customer already exist! Rename, please."));
            }
        });
    }

    getAlert(state, message) {
        return (state) ? (
            <SweetAlert success title="Success" onConfirm={this.props.hideAlert}>
            {message}
            </SweetAlert>
        ) : (
            <SweetAlert error title="Error" onConfirm={this.props.hideAlert}>
            {message}
            </SweetAlert>
        );
    }

    clearForm() {
        this.inputName.value = "";
        this.inputAddress.value = "";
        this.inputPhone.value = "";
        this.setState({
            name: '',
            address: '',
            phone: ''
        });
    }

    render() {
        return (
        <div>
            <Modal show={this.props.show} onHide={this.props.hide}>
                <Modal.Header closeButton><Modal.Title>Create customer</Modal.Title></Modal.Header>
                <Modal.Body>
                    <InputText name="name" label="Customer's name" placeholder="John Doe" 
                                value={this.state.name} change={this.onChange} 
                                refProp={el => this.inputName = el}/>
                    
                    <InputText name="address" label="Customer's address" placeholder="Wall Street, 4" 
                                value={this.state.address} change={this.onChange} 
                                refProp={el => this.inputAddress = el}/>

                    <InputText name="phone" label="Customer's phone" placeholder="596-832-85" 
                                value={this.state.phone} change={this.onChange} 
                                refProp={el => this.inputPhone = el}/>
                </Modal.Body>
                <ModalFooter action={this.createCustomer} hide={this.props.hide} submitText="Create"/>
            </Modal>
            {this.state.alert}
        </div>
        )
    }
}

export default CreateCustomer;
