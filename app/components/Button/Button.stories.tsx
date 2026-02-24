import { Meta, StoryObj } from "@storybook/nextjs-vite";
import Button from "./Button";
import { PlusIcon } from "../Icons/Icons";

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
    type: "primary",
    fullWidth: false,
  },
};

export const Secondary: Story = {
  args: {
    label: "Click Me",
    type: "secondary",
    fullWidth: false,
  },
};

export const Tertiary: Story = {
  args: {
    label: "Click Me",
    type: "tertiary",
    fullWidth: false,
  },
};

export const FullWidth: Story = {
  args: {
    label: "Click Me",
    type: "primary",
    fullWidth: true,
  },
};

export const WithLeftIcon: Story = {
  args: {
    label: "Click Me",
    type: "primary",
    icon: <PlusIcon />,
    iconPosition: "left",
  },
};

export const WithRightIcon: Story = {
  args: {
    label: "Click Me",
    type: "primary",
    icon: <PlusIcon />,
    iconPosition: "right",
  },
};

export const WithBothIcons: Story = {
  args: {
    label: "Click Me",
    type: "primary",
    icon: <PlusIcon />,
    iconPosition: "both",
  },
};
