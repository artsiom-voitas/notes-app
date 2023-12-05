'use client';

import { useAppSelector } from '@/redux/hooks';
import { useSearchParams } from 'next/navigation';
import Note from './Note';

export default function Notes() {
    const notes = useAppSelector((state) => state.notesReducer.notes);
    const searchParams = useSearchParams();
    const tagQuery = searchParams.get('tag') || 'Show All';
    const notesFromTagQuerry =
        tagQuery !== 'Show All' ? notes.filter((note) => note.tags.includes(tagQuery)) : notes;

    if (notes.length < 1) {
        return <></>;
    } else {
        return (
            <div className="mt-4 flex flex-col items-center justify-center gap-3">
                {notesFromTagQuerry.map((note) => (
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
