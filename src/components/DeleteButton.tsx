import { Button } from '@nextui-org/react';
import { Trash } from 'lucide-react';
import { KeyboardEventHandler, MouseEventHandler, memo } from 'react';

interface DeleteButtonProps {
    onClick: MouseEventHandler<HTMLButtonElement>;
    onKeyDown: KeyboardEventHandler<HTMLButtonElement>;
}

const DeleteButton = memo(function DeleteButton({ onClick, onKeyDown }: DeleteButtonProps) {
    return (
        <Button
            isIconOnly
            variant="light"
            className="hover:text-red-600"
            onClick={onClick}
            onKeyDown={(e) => {
                e.key === 'Enter' && onKeyDown(e);
            }}>
            <Trash />
        </Button>
    );
});

export default DeleteButton;
