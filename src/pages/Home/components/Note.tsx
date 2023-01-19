import {DeleteIcon, EditIcon} from "@chakra-ui/icons";
import {
    Card,
    CardBody,
    CardFooter,
    Flex,
    IconButton,
    Spacer,
    Text,
    useDisclosure
} from "@chakra-ui/react";
import { DateTime } from "luxon";
import axios from "axios";
import {useAppDispatch} from "../../hooks";
import {DELETE_NOTE, EDIT_NOTE} from "../../../redux/noteReducer";
import {NoteModal} from "./NoteModal";
import {Layer, Line, Stage} from "react-konva";
import React, {useEffect, useState} from "react";

export const Note = ({id,content,colour,fontColour,created,type}:NoteProp) => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [lines, setLines] = useState([]);
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

    useEffect(() => {
        if (type === "Canvas"){
            setLines(JSON.parse(content))
        }
    },[])

    console.log(type,colour)


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
                        {type === "Normal" || type === null?
                            <Text color={fontColour} fontSize='md' overflowWrap={'anywhere'}>{content}</Text>
                            :
                            <Stage
                                width={200}
                                height={250}
                                style={{backgroundColor:colour}}
                            >
                                    <Layer>
                                        {/*// @ts-ignore*/}
                                        {lines.map((line, i) => (
                                            <Line
                                                key={i}
                                                // @ts-ignore
                                                points={line.points}
                                                // @ts-ignore
                                                stroke={line.strokeValue}
                                                strokeWidth={5}
                                                tension={0.5}
                                                lineCap="round"
                                                lineJoin="round"
                                            />
                                        ))}
                                    </Layer>
                            </Stage>
                            }
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
    type:string;
}