import { Button, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/react";
import HelpForm from "../help-form/help-form";


const HelpModal = () => {
    const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();

    return (
      <>
        <Button className="font-mono" color="secondary" variant="light" size="md" onClick={onOpen}>
            Create support ticket
        </Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="min-h-[300px]">
          <ModalContent>
                <ModalHeader className="flex">Please describe your problem or suggestion</ModalHeader>
                <ModalBody>
                 <HelpForm onClose={onClose}/>
                </ModalBody>
          </ModalContent>
        </Modal>
      </>
    );
}

export default HelpModal;