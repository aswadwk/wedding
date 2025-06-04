import Events from './Events';
import Location from './Location';
import Gifts from './Gifts';
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