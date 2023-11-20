import Text from '../ui/Text';
import { RiBookMarkLine } from 'react-icons/ri';

export default function MainHeader() {
  return (
    <header>
      <div className="flex gap-1 items-center">
        <RiBookMarkLine className="text-xl lg:text-2xl text-gray-900" />
        <Text variation="3xl">Livraria</Text>
      </div>
    </header>
  );
}
