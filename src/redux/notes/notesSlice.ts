import { removeDuplicatesFromArray } from '@/services';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface NoteState {
    id: number;
    title: string;
    tags: string[];
    description: string;
}

interface NotesState {
    notes: NoteState[];
    tags: string[];
}

const initialState: NotesState = {
    notes: [],
    tags: []
};

export const notesSlice = createSlice({
    name: 'note',
    initialState,
    reducers: {
        addNote: (state, action) => {
            const newNote: NoteState = {
                id: action.payload.id,
                title: action.payload.title,
                tags: action.payload.tags,
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
                tags: action.payload.tags,
                description: action.payload.description
            };
            const currentNoteIndex = state.notes.findIndex((note) => note.id === action.payload.id);
            state.notes[currentNoteIndex] = updatedNote;
        },
        updateTags: (state, action) => {
            let currentTags: string[] = [];
            state.notes.map((note) => note.tags.map((tag) => currentTags.push(tag)));
            state.tags = removeDuplicatesFromArray(currentTags);
        }
    }
});

export const { addNote, removeNote, updateNote, updateTags } = notesSlice.actions;

export const selectNotes = (state: RootState) => state.notesReducer;

export default notesSlice.reducer;
