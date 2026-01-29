import { Meta, StoryObj } from "@storybook/nextjs-vite";
import Button from "./Button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Button>;
export const Primary: Story = {
  args: {
    label: "Click Me",
    bgFull: false,
    isFullWidth: false,
  },
};
export const Secondary: Story = {
  args: {
    label: "Click Me",
    bgFull: true,
    isFullWidth: false,
  },
};
export const FullWidth: Story = {
  args: {
    label: "Click Me",
    bgFull: false,
    isFullWidth: true,
  },
};
export const FullWidthFullBg: Story = {
  args: {
    label: "Click Me",
    bgFull: true,
    isFullWidth: true,
  },
};
