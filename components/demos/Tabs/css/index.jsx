import * as Tabs from '@radix-ui/react-tabs';
import './styles.css';

const TabsDemo = () => (
  <Tabs.Root className="TabsRoot" defaultValue="tab1">
    <Tabs.List className="TabsList" aria-label="Manage your account">
      <Tabs.Trigger className="TabsTrigger" value="tab1">Account</Tabs.Trigger>
      <Tabs.Trigger className="TabsTrigger" value="tab2">Password</Tabs.Trigger>
    </Tabs.List>
    <Tabs.Content className="TabsContent" value="tab1">
      <p className="Text">Make changes to your account here.</p>
    </Tabs.Content>
    <Tabs.Content className="TabsContent" value="tab2">
      <p className="Text">Change your password here.</p>
    </Tabs.Content>
  </Tabs.Root>
);

export default TabsDemo;
