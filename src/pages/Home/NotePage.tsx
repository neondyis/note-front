import {
    Box,
    Button,
    Center,Text,
    Flex,Spacer, StackDivider,
    useDisclosure, VStack
} from "@chakra-ui/react";
import {useEffect} from "react";
import {Note} from "./components/Note";
import axios from "axios";
import {useAppDispatch, useAppSelector} from "../hooks";
import {ADD_NOTE, UPDATE_NOTES} from "./redux/noteReducer";
import {NoteModal} from "./components/NoteModal";

export const NotePage = () => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const notes = useAppSelector(state => state.notes);
    const client = axios.create({
        baseURL: process.env.REACT_APP_BASE_URI,
        headers: {
            "Content-Type": "application/json",
        }
    });
    const dispatch = useAppDispatch();

    const getNotes = async () => {
        await client.get('').then((res) => {
            dispatch(UPDATE_NOTES(res.data));
        })
    }

    useEffect(() => {
        getNotes().then(() => {
            console.log("Notes Loaded");
        }).catch(() => {
            console.log("Error Loading Notes.")
        });
    },[])
    
    const createNote = (content:string,colour:string,fontColour:string) => {
        client.post('/insert',{
                content: content,
                colour: colour,
                fontColour: fontColour
        }
        ).then((res) => {
            const note = res.data;
            dispatch(ADD_NOTE(note))
            onClose();
        })
    };

    return (
        <Box>
            <Flex flexDirection={'row'} justifyContent={'flex-end'}>
                <Button color={"white"} variant='ghost' border='solid thin white' size={'lg'} onClick={onOpen}>
                    <Text>Add Note</Text>
                </Button>
                <NoteModal onClose={onClose} isOpen={isOpen} buttonText={'Create Note'} buttonFunction={createNote}
                           modalHeader={'Create a note Lyubov Moya ❤️'}  onOpen={onOpen}/>
            </Flex>
            <br/>
            <Center>
                <VStack  divider={<StackDivider borderColor='gray.200' />}>
                    {notes.length > 0 ?
                        notes?.map(({id,content,colour, fontColour,created}) => {
                            return (
                                <Box key={id}>
                                    <Spacer />
                                    <Note id={id} content={content} colour={colour} created={created} fontColour={fontColour}/>
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