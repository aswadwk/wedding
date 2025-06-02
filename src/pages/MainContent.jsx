import Events from '@/pages/Events'
import Location from '@/pages/Location';
import Gifts from '@/pages/Gifts';
import Couple from './Couple';
import Wishes from './Wishes';

// Main Invitation Content
export default function MainContent() {
    return (
        <>
            <Couple />
            {/* <Hero /> */}
            <Events />
            <Location />
            <Gifts />
            {/* <Wish /> */}
            <Wishes />
        </>
    )
}