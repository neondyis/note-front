import {
    Box,
    Button,
    Center, Divider,Text,
    Flex, Input, Modal, ModalBody, ModalCloseButton,
    ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spacer, StackDivider,
    useDisclosure, VStack
} from "@chakra-ui/react";
import {SetStateAction, useEffect, useState} from "react";
import {Note} from "./components/Note";
import axios from "axios";
import { HexColorPicker } from "react-colorful";

export const NotePage = () => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [noteValue, setNoteValue] = useState("");
    const [colourValue, setColourValue] = useState("");
    const [fontColourValue, setFontColourValue] = useState("");
    const [notes, setNotes] = useState([]);
    const client = axios.create({
        baseURL: "process.env.REACT_APP_BASE_URI",
        headers: {
            "Content-Type": "application/json",
        }
    });

    const getNotes = async () => {
        await client.get('').then((res) => {
            setNotes(res.data);
        })
    }

    useEffect(() => {
        getNotes();
    },[])

    const handleNoteChange = (event: { target: { value: SetStateAction<string> }}) => setNoteValue(event.target.value)
    const handleColourChange = (event: { target: { value: SetStateAction<string> }}) => setColourValue(event.target.value)
    const handleFontColourChange = (event: { target: { value: SetStateAction<string> }}) => setFontColourValue(event.target.value)

    const createNote = () => {
        client.post('/insert',{
                content: noteValue,
                colour: colourValue,
                fontColour: fontColourValue
        }
        ).then((res) => {
            const note = res.data;
            // @ts-ignore
            setNotes([...notes,note])
            setNoteValue("")
            onClose();
        })
    };

    const resetModal = () => {
        setColourValue("");
        setFontColourValue("");
        onClose();
    }

    return (
        <Box>
            <Flex flexDirection={'row'} justifyContent={'flex-end'}>
                <Button color={"white"} variant='ghost' border='solid thin white' size={'lg'} onClick={onOpen}>
                    <Text>Add Note</Text>
                </Button>
                <Modal isOpen={isOpen} onClose={resetModal}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Create a note Lyubov Moya ❤️</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Input isRequired={true} onChange={handleNoteChange} value={noteValue} size={'lg'} placeholder='Enter a note' />
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
                            <Button variant='ghost' onClick={createNote}>Create</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Flex>
            <br/>
            <Center>
                <VStack  divider={<StackDivider borderColor='gray.200' />}>
                    {notes.length > 0 ?
                        notes?.map(({id,content,colour, fontColour,created}) => {
                            return (
                                <Box key={id}>
                                    <Spacer />
                                    <Note content={content} colour={colour} created={created} fontColour={fontColour}/>
                                </Box>
                            )
                        })
                        :
                        <div> Loading</div>
                    }
                </VStack>
            </Center>

        </Box>
    )
}