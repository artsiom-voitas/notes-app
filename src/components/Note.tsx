import { useAppDispatch } from '@/redux/hooks';
import { NoteState, removeNote, updateNote, updateTags } from '@/redux/notes/notesSlice';
import { findTags } from '@/services';
import { Button, Card, CardBody, CardHeader, Divider, Textarea } from '@nextui-org/react';
import { ArrowBigDown, ArrowBigUp, Trash } from 'lucide-react';
import { useState } from 'react';

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

    function toggleNote(): void {
        setIsOpen(!isOpen);
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
            <CardHeader className="flex justify-between gap-3">
                <Textarea
                    minRows={1}
                    variant="underlined"
                    value={newTitle}
                    onFocusChange={saveNote}
                    onValueChange={setNewTitle}
                />
                <Button
                    isIconOnly
                    variant="light"
                    onClick={toggleNote}>
                    {isOpen ? <ArrowBigUp /> : <ArrowBigDown />}
                </Button>
            </CardHeader>
            {isOpen ? (
                <>
                    <Divider />
                    <CardBody className="flex flex-row justify-between gap-3">
                        <Textarea
                            minRows={2}
                            variant="bordered"
                            placeholder="Additional information.."
                            value={newDescription}
                            onFocusChange={saveNote}
                            onValueChange={setNewDescription}
                        />
                        <Button
                            isIconOnly
                            variant="light"
                            onClick={deleteNote}>
                            <Trash />
                        </Button>
                    </CardBody>
                </>
            ) : (
                <></>
            )}
        </Card>
    );
}
