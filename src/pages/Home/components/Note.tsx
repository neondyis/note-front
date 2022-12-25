import {Card, CardBody, CardFooter, Flex, Text} from "@chakra-ui/react";
import { DateTime } from "luxon";

export const Note = ({content,colour,fontColour,created}:NoteProp) => {
    fontColour = fontColour? fontColour : "#000000"
    const time = DateTime.fromISO(created).toLocaleString(DateTime.DATETIME_MED);

    return(
            <Card bg={colour} minH={'250px'} minW={'250px'}>
                <CardBody>
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