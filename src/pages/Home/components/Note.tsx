import {DeleteIcon, EditIcon} from "@chakra-ui/icons";
import {Card, CardBody, CardFooter, Flex, IconButton, Spacer, Text} from "@chakra-ui/react";
import { DateTime } from "luxon";

export const Note = ({content,colour,fontColour,created}:NoteProp) => {
    fontColour = fontColour? fontColour : "#000000"
    const time = DateTime.fromISO(created).toLocaleString(DateTime.DATETIME_MED);

    const deleteNote = () => {

    };

    const editNote = () => {

    };

    return(
            <Card bg={colour} minH={'250px'} minW={'250px'}>
                <CardBody>
                    <Flex justifyContent={"flex-end"}>
                        <IconButton variant='outline' colorScheme={'whiteAlpha'} size={"xs"} aria-label='Edit Note' icon={<EditIcon />}  onClick={editNote}/>
                        <Spacer/>
                        <IconButton variant='outline' colorScheme={'whiteAlpha'} size={"xs"} aria-label='Delete Note' icon={<DeleteIcon />} onClick={deleteNote} />
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
    content : string;
    colour: string;
    fontColour: string;
    created: string;
}