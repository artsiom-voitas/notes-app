import { memo } from 'react';
import { AnimatedCardComponent } from '.';

const AnimatedCard = memo(function AnimatedCard({ children }: { children: React.ReactNode }) {
    return (
        <AnimatedCardComponent
            className="w-full max-w-[700px]"
            initial={{ opacity: 0, y: '-20%' }}
            animate={{
                opacity: 1,
                y: 0
            }}
            transition={{ duration: 0.6 }}>
            {children}
        </AnimatedCardComponent>
    );
});

export default AnimatedCard;
