import { Meta, StoryObj } from "@storybook/nextjs-vite";
import Radio from "./Radio";

const meta: Meta<typeof Radio> = {
    title: "Components/Radio",
    component: Radio,
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const Default: Story = {
    args: {
        label: "Option 1",
        name: "group",
        value: "option1",
        checked: false,
    },
};

export const Checked: Story = {
    args: {
        label: "Option 1",
        name: "group",
        value: "option1",
        checked: true,
    },
};

export const Disabled: Story = {
    args: {
        label: "Option désactivée",
        name: "group",
        value: "option2",
        checked: false,
        disabled: true,
    },
};
