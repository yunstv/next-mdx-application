import * as Label from '@radix-ui/react-label';
import './styles.css';

const LabelDemo = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
    <Label.Root className="LabelRoot" htmlFor="firstName">First name</Label.Root>
    <input className="Input" type="text" id="firstName" defaultValue="Pedro Duarte" />
  </div>
);

export default LabelDemo;
