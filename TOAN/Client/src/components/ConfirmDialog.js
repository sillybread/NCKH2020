import React, { Component } from 'react';
import { Row, Col, Card, CardBody, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Loader from 'components/Loader';


const  ConfirmDialog = (props) =>{
    const [loading,setLoading] = React.useState(false);
    return (
        <Modal
            isOpen={props.isOpen}
            toggle={props.toggle}
            size='md'
            className='modal-dialog-centered'>
             {loading && <Loader />}
            <ModalHeader toggle={props.toggle}>{props.title}</ModalHeader>
            <ModalBody>
                {props.content}
            </ModalBody>
            <ModalFooter className='text-right'>
                <Button color={props.color} onClick={props.confirm}>Đồng ý</Button>
                <Button color="secondary" className="ml-1" onClick={props.toggle}>Hủy</Button>
            </ModalFooter>
        </Modal>
    )
}
export default ConfirmDialog;