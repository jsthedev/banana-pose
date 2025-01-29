import Router from '@/router/index.jsx';
import Maintenance from '@/pages/maintenance';
import { MAINTENANCE } from '@/constants/platform';

function App() {
  return (
    <div className="app">{MAINTENANCE ? <Maintenance /> : <Router />}</div>
  );
}

export default App;
