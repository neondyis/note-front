import {
    Button,
    Divider,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay, Tab, TabList, TabPanel, TabPanels, Tabs
} from "@chakra-ui/react";
import {HexColorPicker} from "react-colorful";
import {SetStateAction, useState} from "react";
import {CanvasNote} from "./CanvasNote";
import {ADD_NOTE} from "../redux/noteReducer";
import axios from "axios";
import {useAppDispatch} from "../../hooks";

export const NoteModal = ({isOpen,onClose,buttonText,buttonFunction,modalHeader,content,colour,fontColour}:NoteModalProps) => {
    const [contentValue, setContentValue] = useState(content ? content:"");
    const [colourValue, setColourValue] = useState(colour ? colour:"");
    const [fontColourValue, setFontColourValue] = useState(fontColour? fontColour:"");
    const [noteType, setNoteType] = useState("Normal")

    const handleContentChange = (event: { target: { value: SetStateAction<string> }}) => setContentValue(event.target.value)
    const handleColourChange = (event: { target: { value: SetStateAction<string> }}) => setColourValue(event.target.value)
    const handleFontColourChange = (event: { target: { value: SetStateAction<string> }}) => setFontColourValue(event.target.value)

    const resetModal = () => {
        onClose();
    }

    const client = axios.create({
        baseURL: process.env.REACT_APP_BASE_URI,
        headers: {
            "Content-Type": "application/json",
        }
    });

    const dispatch = useAppDispatch();


    const createNote = (content:string,colour:string,fontColour:string) => {
        client.post('/insert',{
                content: content,
                colour: colour,
                fontColour: fontColour,
                type: noteType
            }
        ).then((res) => {
            const note = res.data;
            dispatch(ADD_NOTE(note))
            onClose();
        })
    };

    const handleTabChange = (index:number) => {
        index === 0 ? setNoteType("Normal"): setNoteType("Canvas");
    }

    return (
        <Modal isOpen={isOpen} onClose={resetModal}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{modalHeader}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Tabs isFitted variant='enclosed' onChange={handleTabChange}>
                        <TabList>
                            <Tab>
                               Normal Note
                            </Tab>
                            <Tab>
                                Canvas Note
                            </Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <Input isRequired={true} onChange={handleContentChange} value={contentValue} size={'lg'} placeholder='Write something' />
                                <Divider />
                                <Input isRequired={true} onChange={handleColourChange} value={colourValue} size={'lg'} placeholder='Choose a colour' />
                                <Divider />
                                <Input isRequired={true} onChange={handleFontColourChange} value={fontColourValue} size={'lg'} placeholder='Choose a font colour' />
                                <Divider />
                                <HexColorPicker color={colourValue} onChange={setColourValue} />
                                <Divider />
                                <HexColorPicker color={fontColourValue} onChange={setFontColourValue} />
                            </TabPanel>
                            <TabPanel>
                                <CanvasNote onStrokeChange={setContentValue} onBackgroundChange={setColourValue} content={contentValue} background={colourValue}/>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>

                </ModalBody>
                <ModalFooter>
                    <Button variant='ghost' mr={3} onClick={onClose}>
                        Close
                    </Button>
                    <Button variant='ghost' onClick={() => {
                        if(buttonFunction !== undefined){
                            buttonFunction(contentValue,colourValue,fontColourValue)
                        }else{
                            createNote(contentValue,colourValue,fontColourValue)
                        }
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
    buttonFunction?: any;
    modalHeader: string,
    content?: string;
    colour?: string;
    fontColour?: string;
}