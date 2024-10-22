import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import trash from '../../../assets/trash-03-2.svg';

const DeleteModal= () => {
    const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();

    return (
      <>
        <Button isIconOnly color="secondary" variant="light" size="sm" onClick={onOpen}>
            <img src={trash} alt="delete form" />
        </Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
                <ModalHeader className="flex">Success</ModalHeader>
                <ModalBody>
                  <p> 
                    Your form has been successfully created! 
                  </p>
                </ModalBody>
                <ModalFooter>
                  <Button color="secondary" onPress={onClose}>
                    Yes
                  </Button>
                </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
}

export default DeleteModal;