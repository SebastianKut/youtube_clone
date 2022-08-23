import Header from '../components/Header';
import SubmitModal from '../components/SubmitModal';
import { useGlobalContext } from '../context/Context';

function Layout({ children }) {
  const { showUploadForm } = useGlobalContext();
  return (
    <div className="relative">
      <Header />
      {showUploadForm && <SubmitModal />}
      <main className="flex justify-center p-6">{children}</main>
    </div>
  );
}

export default Layout;
