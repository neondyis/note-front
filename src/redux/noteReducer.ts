import {createSlice} from "@reduxjs/toolkit";
import {NoteType} from "../pages/Home/model/NoteType";

export const noteSlice = createSlice({
    name:'notes',
    initialState : {
        notes: [],
    },
    reducers: {
        UPDATE_NOTES:(state, action) =>{
            return {
                ...state,
                notes: action.payload,
            }
        },
        EDIT_NOTE:(state, action) => {
            const noteIndex:number = state.notes.findIndex((note:NoteType) => note.id === action.payload.id);
            const editNotes:any = [...state.notes];
            editNotes[noteIndex] = action.payload;

            return {
                ...state,
                notes: editNotes,
            }
        },
        ADD_NOTE: (state, action) => {
            const addNotes:any = [...state.notes];
            addNotes.push(action.payload);
            return {
                ...state,
                notes: addNotes,
            }
        },
        DELETE_NOTE: (state, action) => {
            const deleteNotes:any =  state.notes.filter((note:NoteType) => note.id !== action.payload);
            return {
                ...state,
                notes: deleteNotes,
        }
    }
    },
})

// Action creators are generated for each case reducer function
export const { UPDATE_NOTES, EDIT_NOTE, ADD_NOTE, DELETE_NOTE } = noteSlice.actions

export default noteSlice.reducer