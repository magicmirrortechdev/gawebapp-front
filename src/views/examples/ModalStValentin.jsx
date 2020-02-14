import React, {useState} from 'react';
import {Modal, ModalHeader, ModalBody} from 'reactstrap';
import image from './sanv.jpg'

const ModalStValentin = (props) => {
    const {
        className,
        lg
    } = props;

    const [modalStValentin, setModalStValentin] = useState(true);

    const toggleSnValentin = () => setModalStValentin(!modalStValentin);

    const closeModalSnValentinBtn = <button className="close" onClick={toggleSnValentin}>&times;</button>;

    return (

        <Modal style={{paddingTop: '110px', display: "flex", alignContent: "center", alignItems: "center"}}
               isOpen={modalStValentin} toggle={toggleSnValentin} className={className} size={lg}>
            <ModalHeader style={{paddingLeft: "100px", paddingTop: "40px", paddingBottom: "10px"}}
                         toggle={toggleSnValentin} close={closeModalSnValentinBtn}>
                <p style={{fontSize: "20px"}}>On behalf of Magic Mirror's team</p>
            </ModalHeader>
            <ModalBody>
                <img height="100%" width="100%" src={image} alt="San Valentin"/>
            </ModalBody>
        </Modal>

    );
}

export default ModalStValentin;