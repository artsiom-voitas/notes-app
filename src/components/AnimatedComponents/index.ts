import { motion } from 'framer-motion';
import { ArrowBigDown } from 'lucide-react';
import AnimatedCard from './AnimatedCard';
import AnimatedCardBody from './AnimatedCardBody';
import AnimatedArrowButton from './AnimatedArrowButton';
import { Button, Card } from '@nextui-org/react';

export const AnimatedButton = motion(Button);
export const AnimatedCardComponent = motion(Card);


export { AnimatedCard, AnimatedCardBody, AnimatedArrowButton };
