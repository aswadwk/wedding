import { ThemeProvider } from '../contexts/ThemeContext';
import Layout from '../components/Layout';
import MainContent from '../react-pages/MainContent';

function InvitationPageWrapper() {
    return (
        <ThemeProvider>
            <Layout>
                <MainContent />
            </Layout>
        </ThemeProvider>
    );
}

export default InvitationPageWrapper;
