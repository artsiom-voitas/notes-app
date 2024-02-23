import { CardBody } from '@nextui-org/react';
import { motion } from 'framer-motion';

export default function AnimatedCardBody({ children }: { children: React.ReactNode }) {
    return (
        <motion.div
            initial={{ opacity: 0, minHeight: 0, height: 0, y: '-20%' }}
            animate={{
                opacity: 1,
                height: 'auto',
                y: 0
            }}
            exit={{ y: '-20%', opacity: 0, height: 0 }}
            transition={{ duration: 0.15 }}>
            <CardBody className="flex flex-row justify-between gap-3">{children}</CardBody>
        </motion.div>
    );
}
