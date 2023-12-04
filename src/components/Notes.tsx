'use client';

import { useAppSelector } from '@/redux/hooks';
import Note from './Note';

export default function Notes() {
    const notes = useAppSelector((state) => state.notesReducer.notes);
    if (notes.length < 1) {
        return <></>;
    } else {
        return (
            <div className="mt-4 flex flex-col items-center justify-center gap-3">
                {notes.map((note) => (
                    <Note
                        key={note.id}
                        id={note.id}
                        title={note.title}
                        tag={note.tag}
                        description={note.description}
                    />
                ))}
            </div>
        );
    }
}
