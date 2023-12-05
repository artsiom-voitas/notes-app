'use client';

import { useAppSelector } from '@/redux/hooks';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function FilterDropdown() {
    const tags = useAppSelector((state) => state.notesReducer.tags);
    const notes = useAppSelector((state) => state.notesReducer.notes);

    const searchParams = useSearchParams();
    const tagQuery = searchParams.get('tag') || 'Show All';
    const [currentFilter, setCurrentFilter] = useState<string>(tagQuery);

    useEffect(() => {}, [tagQuery]);
    if (notes.length === 0) {
        return <></>;
    } else
        return (
            <div className="mt-4 flex justify-end">
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
                                href={tag === 'show all' ? '/' : `/?tag=${tag}`}
                                className="capitalize"
                                textValue={tag}
                                color="default"
                                onClick={() => setCurrentFilter(tag)}>
                                {tag}
                            </DropdownItem>
                        ))}
                    </DropdownMenu>
                </Dropdown>
            </div>
        );
}
