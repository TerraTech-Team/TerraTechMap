import Toolbar from '../Toolbar/Toolbar'
import Map from '../Map/Map'
import { WidgetsStatusProvider } from '../../CustomHooks/WidgetsStatusContext.jsx';
import { MapRefProvider } from '../../CustomHooks/MapRefContext.jsx';

export default function App() {
  return (
    <main>
      <WidgetsStatusProvider >
        <MapRefProvider>

          <Toolbar />
          <Map />
          
        </MapRefProvider>
      </WidgetsStatusProvider>
    </main>
  )
}