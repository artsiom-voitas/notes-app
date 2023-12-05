import { useAppDispatch } from '@/redux/hooks';
import { NoteState, removeNote, updateNote, updateTags } from '@/redux/notes/notesSlice';
import { findTags } from '@/services';
import { Button, Card, CardBody, CardHeader, Divider, Textarea } from '@nextui-org/react';
import { motion } from 'framer-motion';
import { ArrowBigDown, ArrowBigUp, Trash } from 'lucide-react';
import { useState } from 'react';
import { HighlightWithinTextarea } from 'react-highlight-within-textarea';

export default function Note({ id, title, tags, description }: NoteState) {
    const [newTitle, setNewTitle] = useState<string>(title);
    const [newDescription, setNewDescription] = useState<string>(description);
    const [isOpen, setIsOpen] = useState<boolean>(false);
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
        <Card className="w-full max-w-[700px]">
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
                    <div className="w-full max-w-[380px] max-[470px]:max-w-[290px] sm:max-w-[550px]">
                        <HighlightWithinTextarea
                            value={newTitle}
                            highlight={[
                                {
                                    highlight: /([#])\w+/g,
                                    className: 'bg-blue-400'
                                }
                            ]}
                            onChange={(event) => {
                                setNewTitle(event);
                                saveNote();
                            }}
                        />
                    </div>
                    <Button
                        isIconOnly
                        variant="light"
                        onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <ArrowBigUp /> : <ArrowBigDown />}
                    </Button>
                </div>
            </CardHeader>
            {isOpen ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}>
                    <Divider />
                    <CardBody className="flex flex-row justify-between gap-3">
                        <Textarea
                            minRows={2}
                            variant="bordered"
                            placeholder="Additional information..."
                            value={newDescription}
                            onFocusChange={saveNote}
                            onValueChange={setNewDescription}
                        />
                        <Button
                            isIconOnly
                            variant="light"
                            className="hover:text-red-600"
                            onClick={deleteNote}>
                            <Trash />
                        </Button>
                    </CardBody>
                </motion.div>
            ) : (
                <></>
            )}
        </Card>
    );
}
