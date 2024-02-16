'use client';

import { useAppSelector } from '@/redux/hooks';
import { NoteState } from '@/redux/notes/notesSlice';
import { useSearchParams } from 'next/navigation';
import Note from './Note';
import { removeDuplicatesFromArray } from '@/services';

export default function Notes() {
    const notes = useAppSelector((state) => state.notesReducer.notes);
    const searchParams = useSearchParams();
    const tagsQuery: string[] = searchParams.get('tags')?.split('?') || ['Show All'];

    const filteredNotes: NoteState[] = tagsQuery.includes('Show All')
        ? notes
        : filterNotes(tagsQuery);

    function filterNotes(tags: string[]): NoteState[] {
        const filteredNotes: any[] = [];
        tags.forEach((tag) =>
            filteredNotes.push(...notes.filter((note) => note.tags.includes(tag)))
        );
        return removeDuplicatesFromArray<NoteState>(filteredNotes);
    }

    if (filteredNotes.length < 1) {
        return <></>;
    } else {
        return (
            <div className="mb-6 mt-4 flex flex-col items-center justify-center gap-3">
                {filteredNotes.map((note) => (
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
