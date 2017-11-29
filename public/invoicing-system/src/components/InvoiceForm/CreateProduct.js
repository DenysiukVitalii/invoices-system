import React, { Component } from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import { Modal } from 'react-bootstrap';
import myfetch from '../../myfetch';
import InputText from '../shared/InputText';
import ModalFooter from '../shared/ModalFooter';

class CreateProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {name: '', price: 0};
        this.onChange = this.onChange.bind(this);
        this.createProduct = this.createProduct.bind(this);
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    createProduct() {
        let item = {
            name: this.state.name,
            price: +this.state.price
        };

        myfetch('products', 'post', item)
        .then( data => { 
            console.log(data);
            if (data.id) {
            this.props.alert(this.getAlert(true, 'You create new product!'));
            this.props.response(data);  
            this.clearForm();
            } else {
            this.props.alert(this.getAlert(false, "Such product already exist! Rename, please."));
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
        this.inputPrice.value = "";
        this.setState({
            name: '',
            price: ''
        });
    }

    render() {
        return (
        <div>
            <Modal show={this.props.show} onHide={this.props.hide}>
                <Modal.Header closeButton><Modal.Title>Create product</Modal.Title></Modal.Header>
                <Modal.Body>
                    <InputText name="name" label="Product's name" placeholder="Calculator" 
                                value={this.state.name} change={this.onChange} 
                                refProp={el => this.inputName = el}/>
                    
                    <InputText name="price" label="Product's price" placeholder="999.99" 
                                value={this.state.price} change={this.onChange} 
                                refProp={el => this.inputPrice = el}/>
                </Modal.Body>
                <ModalFooter action={this.createProduct} hide={this.props.hide} submitText="Create"/>
            </Modal>
            {this.state.alert}
        </div>
        )
    }
}

export default CreateProduct;
