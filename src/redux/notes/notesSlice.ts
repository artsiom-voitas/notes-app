import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface NoteState {
    id: number;
    title: string;
    tag: string;
    description: string;
}

interface NotesState {
    notes: NoteState[];
}

const initialState: NotesState = {
    notes: []
};

export const notesSlice = createSlice({
    name: 'note',
    initialState,
    reducers: {
        addNote: (state, action) => {
            const newNote = {
                id: action.payload.id,
                title: action.payload.title,
                tag: action.payload.tag,
                description: action.payload.description
            };
            state.notes.unshift(newNote);
        },
        removeNote: (state, action) => {
            state.notes = state.notes.filter((note) => note.id !== action.payload.id);
        },
        updateNote: (state, action) => {
            const updatedNote = {
                id: action.payload.id,
                title: action.payload.title,
                tag: action.payload.tag,
                description: action.payload.description
            };
            const currentNoteIndex = state.notes.findIndex((note) => note.id === action.payload.id);
            state.notes[currentNoteIndex] = updatedNote;
        }
    }
});

export const { addNote, removeNote, updateNote } = notesSlice.actions;

export const selectNotes = (state: RootState) => state.notesReducer;

export default notesSlice.reducer;
