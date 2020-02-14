import React, { useState } from 'react';
import {  Modal, ModalHeader, ModalBody } from 'reactstrap';
import image from './sanv.jpg'

const ModalStValentin = (props) => {
  const {
    className,
    lg
  } = props;

  const [modalStValentin, setModal] = useState(true);

  const toggle = () => setModal(!modalStValentin);

  const closeBtn = <button className="close" onClick={toggle}>&times;</button>;

  return (
 
    <Modal style={{paddingTop: '110px', display: "flex", alignContent:"center", alignItems:"center"}} 
      isOpen={modalStValentin} toggle={toggle} className={className} size={lg}>
      <ModalHeader style={{paddingLeft:"100px", paddingTop:"40px", paddingBottom:"10px"}} toggle={toggle} close={closeBtn}>
      <p style={{fontSize:"20px"}}>On behalf of Magic Mirror's team</p>
      </ModalHeader>
      <ModalBody>
        <img height="100%" width="100%" src={image} alt="San Valentin"/>
      </ModalBody>
    </Modal>

);
}

export default ModalStValentin;