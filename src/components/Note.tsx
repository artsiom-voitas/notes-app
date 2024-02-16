import { useAppDispatch } from '@/redux/hooks';
import { NoteState, removeNote, updateNote, updateTags } from '@/redux/notes/notesSlice';
import { findTags } from '@/services';
import { CardHeader, Divider, Textarea } from '@nextui-org/react';
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { HighlightWithinTextarea } from 'react-highlight-within-textarea';
import { AnimatedArrowButton, AnimatedCard, AnimatedCardBody } from './AnimatedComponents';
import DeleteButton from './DeleteButton';

export default function Note({ id, title, tags, description }: NoteState) {
    const [newTitle, setNewTitle] = useState<string>(title);
    const [newDescription, setNewDescription] = useState<string>(description);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isEditingTitle, setIsEditingTitle] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    function deleteNote(): void {
        dispatch(
            removeNote({
                id: id
            })
        );
        dispatch(
            updateTags({
                tags: findTags(title)
            })
        );
    }

    function saveNote(): void {
        if (newTitle.length === 0) {
            setNewTitle(title);
        }
        dispatch(
            updateNote({
                title: newTitle,
                id: id,
                tags: findTags(newTitle),
                description: newDescription
            })
        );
        dispatch(
            updateTags({
                tags: findTags(title)
            })
        );
    }

    return (
        <AnimatedCard>
            <CardHeader className="flex flex-col items-start gap-1">
                <div className="flex gap-3">
                    {tags.length > 0 &&
                        tags.map((tag, key) => (
                            <div
                                key={key}
                                className="rounded-md bg-black px-2 py-1 text-xs capitalize text-white dark:bg-white dark:text-black">
                                {tag}
                            </div>
                        ))}
                </div>
                <div className="flex w-full justify-between gap-3">
                    <div
                        className="w-full max-w-[380px] max-[470px]:max-w-[290px] sm:max-w-[550px]"
                        onClick={() => {
                            setIsEditingTitle(true);
                        }}>
                        {isEditingTitle ? (
                            <HighlightWithinTextarea
                                value={newTitle}
                                highlight={[
                                    {
                                        highlight: /([#])\w+/g,
                                        className: 'bg-blue-400'
                                    }
                                ]}
                                onBlur={() => {
                                    setIsEditingTitle(false);
                                    saveNote();
                                }}
                                onChange={(event) => {
                                    setNewTitle(event);
                                }}
                            />
                        ) : (
                            <div>{title}</div>
                        )}
                    </div>
                    <AnimatedArrowButton
                        onClick={() => setIsOpen(!isOpen)}
                        onKeyDown={() => setIsOpen(!isOpen)}
                        isOpen={isOpen}
                    />
                </div>
            </CardHeader>
            <AnimatePresence>
                {isOpen && (
                    <>
                        <Divider />
                        <AnimatedCardBody>
                            <Textarea
                                minRows={1}
                                variant="underlined"
                                placeholder="Description..."
                                value={newDescription}
                                onFocusChange={saveNote}
                                onValueChange={setNewDescription}
                            />
                            <DeleteButton
                                onClick={deleteNote}
                                onKeyDown={deleteNote}
                            />
                        </AnimatedCardBody>
                    </>
                )}
            </AnimatePresence>
        </AnimatedCard>
    );
}
