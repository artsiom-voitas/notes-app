'use client';

import { useAppSelector } from '@/redux/hooks';
import Note from './Note';
import FilterDropdown from './FilterDropdown';

export default function Notes() {
    const notes = useAppSelector((state) => state.notesReducer.notes);
    if (notes.length < 1) {
        return <></>;
    } else {
        return (
            <div className="mt-4 flex flex-col items-center justify-center gap-3">
                <FilterDropdown />
                {notes.map((note) => (
                    <Note
                        key={note.id}
                        id={note.id}
                        title={note.title}
                        tags={note.tags}
                        description={note.description}
                    />
                ))}
            </div>
        );
    }
}
