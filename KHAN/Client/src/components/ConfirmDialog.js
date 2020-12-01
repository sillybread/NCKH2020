import React, { Component } from 'react';
import { Row, Col, Card, CardBody, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const  ConfirmDialog = (props) =>{
    return (
        <Modal
            isOpen={props.isOpen}
            toggle={props.toggle}
            size='md'
            className='modal-dialog-centered'>
            <ModalHeader toggle={props.toggle}>{props.title}</ModalHeader>
            <ModalBody>
                {props.content}
            </ModalBody>
            <ModalFooter>
                <Button color={props.color} onClick={props.confirm}>Đồng ý</Button>
                <Button color="secondary" className="ml-1" onClick={props.toggle}>Hủy</Button>
            </ModalFooter>
        </Modal>
    )
}
export default ConfirmDialog;