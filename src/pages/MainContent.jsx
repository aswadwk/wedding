import Hero from '@/pages/Hero'
import Events from '@/pages/Events'
import Location from '@/pages/Location';
import Wishes from '@/pages/Wishes';
import Gifts from '@/pages/Gifts';
import Couple from './Couple';

// Main Invitation Content
export default function MainContent() {
    return (
        <>
            <Couple />
            <Hero />
            <Events />
            <Location />
            <Gifts />
            <Wishes />
        </>
    )
}