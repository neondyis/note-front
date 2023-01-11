import { Stage, Layer, Line } from 'react-konva';
import React, {SetStateAction, useRef, useState} from "react";
import Konva from "konva";
import {Button, Center} from "@chakra-ui/react";
import {HexColorPicker} from "react-colorful";

export const CanvasNote = ({onBackgroundChange,onStrokeChange,content,background}:CanvasNoteProps) => {
    const [tool, setTool] = useState('pen');
    const [lines, setLines] = useState(content ? JSON.parse(content):[]);
    const stageRef = useRef(null);

    // TODO ADD UNDO AND REDO FUNCTIONALITY
    const [history, setHistory] = useState([]);
    const [historyStep, setHistoryStep] = useState(0);
    const [strokeValue, setStrokeValue] = useState("#df4b26");
    const [backgroundValue, setBackgroundValue] = useState(background ? background :"#ffffff");
    const isDrawing = useRef(false);

    const handleMouseDown = (e:Konva.KonvaEventObject<MouseEvent>) => {
        isDrawing.current = true;
        // @ts-ignore
        const pos = e.target.getStage().getPointerPosition();
        // @ts-ignore
        setLines([...lines, { tool ,strokeValue ,points: [pos.x, pos.y] }]);
    };

    const handleMouseMove = (e:Konva.KonvaEventObject<MouseEvent>) => {
        // no drawing - skipping
        if (!isDrawing.current) {
            return;
        }
        const stage = e.target.getStage();
        const point = stage!.getPointerPosition();
        let lastLine = lines[lines.length - 1];
        // add point
        // @ts-ignore
        lastLine.points = lastLine.points.concat([point.x, point.y]);

        // replace last
        lines.splice(lines.length - 1, 1, lastLine);
        setLines(lines.concat());
    };

    const handleMouseUp = () => {
        onStrokeChange(JSON.stringify(lines));
        isDrawing.current = false;
    };

    const handleBackgroundChange = (color:string) => {
        onBackgroundChange(color);
        setBackgroundValue(color);
    }

    // @ts-ignore
    return(
        <div>
            <HexColorPicker color={strokeValue} onChange={setStrokeValue} />
            <HexColorPicker color={backgroundValue} onChange={handleBackgroundChange} />
            <Center>
                <Stage
                    width={200}
                    height={250}
                    style={{backgroundColor:backgroundValue, border:"thin black solid"}}
                    onMouseDown={handleMouseDown}
                    onMousemove={handleMouseMove}
                    onMouseup={handleMouseUp}
                    onTouchstart={handleMouseDown}
                    onTouchmove={handleMouseMove}
                    onTouchend={handleMouseUp}
                    ref={stageRef}
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
                                globalCompositeOperation={
                                    // @ts-ignore
                                    line.tool === 'eraser' ? 'destination-out' : 'source-over'
                                }
                            />
                        ))}
                    </Layer>
                </Stage>
            </Center>
            <select
                value={tool}
                onChange={(e) => {
                    setTool(e.target.value);
                }}
            >
                <option value="pen">Pen</option>
                <option value="eraser">Eraser</option>
            </select>
        </div>
    )
}

type CanvasNoteProps = {
    onStrokeChange: React.Dispatch<SetStateAction<string>>;
    onBackgroundChange: React.Dispatch<SetStateAction<string>>;
    content: string;
    background:string;
}