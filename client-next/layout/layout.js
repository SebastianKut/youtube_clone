import Header from '../components/Header';
import MiniSidebar from '../components/MiniSidebar';
import Sidebar from '../components/Sidebar';
import SubmitModal from '../components/SubmitModal';
import { useGlobalContext } from '../context/Context';

function Layout({ children }) {
  const { showUploadForm, showSidebar } = useGlobalContext();
  return (
    <div className="relative">
      <Header />

      {showUploadForm && <SubmitModal />}
      <main className="flex justify-center pt-3">
        {showSidebar ? <Sidebar /> : <MiniSidebar />}

        {children}
      </main>
    </div>
  );
}

export default Layout;
