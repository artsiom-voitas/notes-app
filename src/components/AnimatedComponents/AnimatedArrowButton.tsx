import { ArrowBigDown } from 'lucide-react';
import { MouseEventHandler, memo, KeyboardEventHandler } from 'react';
import { AnimatedButton } from '.';

interface AnimatedArrowButtonProps {
    onClick: MouseEventHandler<HTMLButtonElement>;
    onKeyDown: KeyboardEventHandler<HTMLButtonElement>;
    isOpen: boolean;
}

const AnimatedArrowButton = memo(function AnimatedArrowButton({
    onClick,
    onKeyDown,
    isOpen
}: AnimatedArrowButtonProps) {
    return (
        <AnimatedButton
            isIconOnly
            variant="light"
            animate={{ rotate: isOpen ? -180 : 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClick}
            onKeyDown={(e) => {
                e.key === 'Enter' && onKeyDown(e);
            }}>
            <ArrowBigDown />
        </AnimatedButton>
    );
});

export default AnimatedArrowButton;
