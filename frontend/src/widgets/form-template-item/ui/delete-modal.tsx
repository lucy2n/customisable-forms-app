import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import trash from '../../../assets/trash-03-2.svg';
import { FC } from "react";

interface DeleteModalProps {
    handleDeleteTemplate : (templateId: string) => void
    templateId: string
}

const DeleteModal:FC<DeleteModalProps> = ({handleDeleteTemplate, templateId}) => {
    const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();

    const handleYes = (templateId: string) => {
        handleDeleteTemplate(templateId)
        onClose()
    }

    return (
      <>
        <Button isIconOnly color="secondary" variant="light" size="sm" onClick={onOpen}>
            <img src={trash} alt="delete form" />
        </Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
                <ModalHeader className="flex">Delete template</ModalHeader>
                <ModalBody>
                  <p> 
                    Do you confirm that you want to delete the template?
                  </p>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    No
                  </Button>
                  <Button color="secondary" onPress={() => handleYes(templateId)}>
                    Yes
                  </Button>
                </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
}

export default DeleteModal;