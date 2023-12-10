import { ArrowBigDown } from 'lucide-react';
import { MouseEventHandler, memo } from 'react';
import { AnimatedButton } from '.';

interface AnimatedArrowButtonProps {
    onClick: MouseEventHandler<HTMLButtonElement>;
    isOpen: boolean;
}

const AnimatedArrowButton = memo(function AnimatedArrowButton({
    onClick,
    isOpen
}: AnimatedArrowButtonProps) {
    return (
        <AnimatedButton
            isIconOnly
            variant="light"
            animate={{ rotate: isOpen ? -180 : 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClick}>
            <ArrowBigDown />
        </AnimatedButton>
    );
});

export default AnimatedArrowButton;
