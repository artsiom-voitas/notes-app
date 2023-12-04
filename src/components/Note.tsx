import { useAppDispatch } from '@/redux/hooks';
import { NoteState, removeNote, updateNote } from '@/redux/notes/notesSlice';
import { Button, Card, CardBody, CardHeader, Divider, Textarea } from '@nextui-org/react';
import { ArrowBigDown, ArrowBigUp, Trash } from 'lucide-react';
import { useState } from 'react';

export default function Note({ id, title, tag, description }: NoteState) {
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
    }

    function toggleNote(): void {
        setIsOpen(!isOpen);
    }

    function saveNote(): void {
        dispatch(
            updateNote({
                title: newTitle,
                id: id,
                tag: tag,
                description: newDescription
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
