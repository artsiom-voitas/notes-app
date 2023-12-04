'use client';

import { useAppDispatch } from '@/redux/hooks';
import { addNote } from '@/redux/notes/notesSlice';
import { Button, Input } from '@nextui-org/react';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function CreateNote() {
    const [title, setTitle] = useState<string>('');

    const dispatch = useAppDispatch();
    const unique_id = uuidv4();

    function createNote() {
        if (title.length >= 1) {
            dispatch(
                addNote({
                    title: title,
                    id: unique_id,
                    tag: '',
                    description: ''
                })
            );
        }
        setTitle('');
    }
    return (
        <Input
            type="text"
            color="primary"
            label="Create note"
            className="mt-4 flex min-w-[340px]"
            value={title}
            onValueChange={setTitle}
            endContent={
                <Button
                    isIconOnly
                    onClick={createNote}
                    variant="light">
                    <Plus className="pointer-events-none mb-0.5 flex-shrink-0 text-black/50 text-slate-400 dark:text-white/90" />
                </Button>
            }
        />
    );
}
