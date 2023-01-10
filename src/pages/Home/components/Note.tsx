import {DeleteIcon, EditIcon} from "@chakra-ui/icons";
import {
    Button,
    Card,
    CardBody,
    CardFooter, Divider,
    Flex,
    IconButton, Input,
    Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader,
    ModalOverlay,
    Spacer,
    Text,
    useDisclosure
} from "@chakra-ui/react";
import { DateTime } from "luxon";
import axios from "axios";
import {useAppDispatch} from "../../hooks";
import {DELETE_NOTE, EDIT_NOTE} from "../redux/noteReducer";
import {NoteModal} from "./NoteModal";

export const Note = ({id,content,colour,fontColour,created}:NoteProp) => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    fontColour = fontColour? fontColour : "#000000"
    const time = DateTime.fromISO(created).toLocaleString(DateTime.DATETIME_MED);
    const dispatch = useAppDispatch();
    const client = axios.create({
        baseURL: process.env.REACT_APP_BASE_URI,
        headers: {
            "Content-Type": "application/json",
        }
    });

    const deleteNote = async (id: string) => {
        console.log(id)
        await client.delete(`/delete/${id}`).then((res) => {
            dispatch(DELETE_NOTE(id));
        })
    };

    const editNote = async (content: string, colour: string, fontColour: string) => {
        await client.put('/edit',{id,content,colour,fontColour}).then((res) => {
            dispatch(EDIT_NOTE({id,content,colour,fontColour}))
        })
    };

    return(
            <Card bg={colour} minH={'250px'} minW={'250px'} maxW={'250px'}>
               <NoteModal onClose={onClose} isOpen={isOpen} buttonText={'Modify Note'} buttonFunction={editNote}
                          modalHeader={'Modifying Note'} onOpen={onOpen} content={content} colour={colour} fontColour={fontColour}/>
                <CardBody>
                    <Flex justifyContent={"flex-end"}>
                        <IconButton variant='outline' colorScheme={'whiteAlpha'} size={"xs"} aria-label='Edit Note' icon={<EditIcon />}  onClick={onOpen}/>
                        <Spacer/>
                        <IconButton variant='outline' colorScheme={'whiteAlpha'} size={"xs"} aria-label='Delete Note' icon={<DeleteIcon />} onClick={() => deleteNote(id)} />
                    </Flex>
                    <Flex alignItems={'center'} >
                        <Text color={fontColour} fontSize='md' overflowWrap={'anywhere'}>{content}</Text>
                    </Flex>
                </CardBody>
                <CardFooter>
                    <Text color={fontColour} fontSize='sm'>{time}</Text>
                </CardFooter>
            </Card>
    )
}

type NoteProp = {
    id:string;
    content : string;
    colour: string;
    fontColour: string;
    created: string;
}