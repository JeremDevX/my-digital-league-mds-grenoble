import type { Meta, StoryObj } from '@storybook/nextjs';
import Toggle from './Toggle';

const meta: Meta<typeof Toggle> = {
  title: 'Components/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    onChange: { action: 'changed' },
  },
};

export default meta;
type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
  args: { label: 'Notifications', checked: false },
};

export const Checked: Story = {
  args: { label: 'Notifications', checked: true },
};

export const Disabled: Story = {
  args: { label: 'Option grisée', checked: false, disabled: true },
};

export const WithHelperText: Story = {
  args: {
    label: 'Mode discret',
    checked: true,
    helperText: 'Désactive tous les sons et vibrations.',
  },
};