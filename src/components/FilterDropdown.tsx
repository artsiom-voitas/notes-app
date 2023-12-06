'use client';

import { useAppSelector } from '@/redux/hooks';
import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownSection,
    DropdownTrigger
} from '@nextui-org/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

export default function FilterDropdown() {
    const tags = useAppSelector((state) => state.notesReducer.tags);
    const notes = useAppSelector((state) => state.notesReducer.notes);

    const searchParams = useSearchParams();
    const router = useRouter();
    const tagsQuery = searchParams.get('tags') || 'Show All';

    const currentFilters: string[] = tagsQuery.split('?');

    const [selectedKeys, setSelectedKeys] = useState<any>(new Set(currentFilters));

    const selectedValues = useMemo(() => Array.from(selectedKeys), [selectedKeys]);

    useEffect(() => {
        if (selectedValues.length > 1 && selectedValues.includes('Show All')) {
            setSelectedKeys(selectedValues.filter((value) => value !== 'Show All'));
        }
    }, [selectedValues, tagsQuery]);

    if (notes.length === 0 || tags.length === 0) {
        return <></>;
    } else
        return (
            <div className="mt-4 flex justify-end">
                <Dropdown>
                    <DropdownTrigger>
                        <Button
                            variant="bordered"
                            className="capitalize">
                            Filter By
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                        aria-label="Dropdown menu with tags"
                        variant="flat"
                        closeOnSelect={false}
                        disallowEmptySelection
                        selectionMode="multiple"
                        selectedKeys={selectedKeys}
                        onSelectionChange={setSelectedKeys}>
                        <DropdownSection showDivider>
                            <DropdownItem
                                key={'Show All'}
                                textValue="Show All"
                                color="default"
                                onClick={() => {
                                    setSelectedKeys(['Show All']);
                                    router.push(`/`);
                                }}>
                                Show All
                            </DropdownItem>
                        </DropdownSection>
                        <DropdownSection>
                            {tags.map((tag) => (
                                <DropdownItem
                                    key={tag}
                                    className="capitalize"
                                    textValue={tag}
                                    onClick={() =>
                                        router.push(`/?tags=${selectedValues.join('?')}`)
                                    }
                                    color="default">
                                    {tag}
                                </DropdownItem>
                            ))}
                        </DropdownSection>
                    </DropdownMenu>
                </Dropdown>
            </div>
        );
}
