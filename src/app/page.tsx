import CreateNote from '@/components/CreateNote';
import FilterDropdown from '@/components/FilterDropdown';
import Header from '@/components/Header';
import Notes from '@/components/Notes';

export default function Home() {
    return (
        <main className="mx-2">
            <Header />
            <CreateNote />
            <FilterDropdown />
            <Notes />
        </main>
    );
}
