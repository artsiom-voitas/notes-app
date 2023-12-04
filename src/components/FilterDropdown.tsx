import { useAppSelector } from '@/redux/hooks';
import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Link
} from '@nextui-org/react';
import { useState } from 'react';

export default function FilterDropdown() {
    const tags = useAppSelector((state) => state.notesReducer.tags);
    const [currentFilter, setCurrentFilter] = useState<string>('Show All');

    return (
        <Dropdown>
            <DropdownTrigger>
                <Button
                    variant="bordered"
                    className="capitalize">
                    {currentFilter}
                </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Dynamic Tag list">
                {tags.map((tag, key) => (
                    <DropdownItem
                        key={key}
                        textValue={tag}
                        color="default"
                        onClick={() => setCurrentFilter(tag)}>
                        <Link
                            className="capitalize"
                            href={tag === 'show all' ? '/' : `${tag}`}>
                            {tag}
                        </Link>
                    </DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
    );
}
