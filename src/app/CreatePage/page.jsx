import { FileProvider } from '../FileContext/page';
import Create from '../Create/page';

export default function MainApp() {
  return (
    <FileProvider>
      <Create />
    </FileProvider>
  );
}
