import { Outlet } from 'react-router-dom';
import Card from '../../ui/Card';

export default function RootLayoutPublic() {
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gray-100">
      <Card className="p-6">
        <Outlet />
      </Card>
    </div>
  );
}
