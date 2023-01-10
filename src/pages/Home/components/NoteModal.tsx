import {
    Button,
    Divider,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay
} from "@chakra-ui/react";
import {HexColorPicker} from "react-colorful";
import {SetStateAction, useState} from "react";

export const NoteModal = ({isOpen,onClose,buttonText,buttonFunction,modalHeader,content,colour,fontColour}:NoteModalProps) => {
    const [contentValue, setContentValue] = useState(content ? content:"");
    const [colourValue, setColourValue] = useState(colour ? colour:"");
    const [fontColourValue, setFontColourValue] = useState(fontColour? fontColour:"");

    const handleContentChange = (event: { target: { value: SetStateAction<string> }}) => setContentValue(event.target.value)
    const handleColourChange = (event: { target: { value: SetStateAction<string> }}) => setColourValue(event.target.value)
    const handleFontColourChange = (event: { target: { value: SetStateAction<string> }}) => setFontColourValue(event.target.value)

    const resetModal = () => {
        setContentValue("");
        setColourValue("");
        setFontColourValue("");
        onClose();
    }

    return (
        <Modal isOpen={isOpen} onClose={resetModal}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{modalHeader}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Input isRequired={true} onChange={handleContentChange} value={contentValue} size={'lg'} placeholder='Write something' />
                    <Divider />
                    <Input isRequired={true} onChange={handleColourChange} value={colourValue} size={'lg'} placeholder='Choose a colour' />
                    <Divider />
                    <Input isRequired={true} onChange={handleFontColourChange} value={fontColourValue} size={'lg'} placeholder='Choose a font colour' />
                    <Divider />
                    <HexColorPicker color={colourValue} onChange={setColourValue} />
                    <Divider />
                    <HexColorPicker color={fontColourValue} onChange={setFontColourValue} />
                </ModalBody>
                <ModalFooter>
                    <Button variant='ghost' mr={3} onClick={onClose}>
                        Close
                    </Button>
                    <Button variant='ghost' onClick={() => {
                        buttonFunction(contentValue,colourValue,fontColourValue)
                        resetModal();
                    }}>{buttonText}</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

type NoteModalProps = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    buttonText: string;
    buttonFunction: any;
    modalHeader: string,
    content?: string;
    colour?: string;
    fontColour?: string;
}