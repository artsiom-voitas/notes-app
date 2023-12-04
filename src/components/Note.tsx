import { useAppDispatch } from '@/redux/hooks';
import { NoteState, removeNote } from '@/redux/notes/notesSlice';
import { Button, Card, CardBody, CardHeader, Divider } from '@nextui-org/react';
import { Trash } from 'lucide-react';

export default function Note({ id, title, tag, description }: NoteState) {
    const dispatch = useAppDispatch();

    function deleteNote() {
        dispatch(
            removeNote({
                id: id
            })
        );
    }
    return (
        <Card className="w-full max-w-[450px]">
            <CardHeader className="flex justify-between">
                <h2 className="text-md">{title}</h2>
                <Button
                    isIconOnly
                    variant="light"
                    onClick={deleteNote}>
                    <Trash />
                </Button>
            </CardHeader>
            {description.length > 0 ? (
                <>
                    <Divider />
                    <CardBody>
                        <p>{description}</p>
                    </CardBody>
                </>
            ) : (
                <></>
            )}
        </Card>
    );
}
