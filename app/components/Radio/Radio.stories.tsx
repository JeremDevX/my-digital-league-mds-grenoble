import { Meta, StoryObj } from "@storybook/nextjs-vite";
import Radio from "./Radio";
import { useState } from "react";

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

export const WithHelperText: Story = {
    args: {
        label: "Option avec aide",
        name: "group",
        value: "option3",
        checked: false,
        helperText: "Aide",
    },
};

export const Group = {
    render: () => {
        const [selected, setSelected] = useState("oui");

        return (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <Radio
                    name="repas"
                    value="oui"
                    label="Repas inclus"
                    helperText="Pizza + boisson"
                    checked={selected === "oui"}
                    onChange={(e) => setSelected(e.target.value)}
                />
                <Radio
                    name="repas"
                    value="non"
                    label="Sans repas"
                    helperText="Ramène ton repas"
                    checked={selected === "non"}
                    onChange={(e) => setSelected(e.target.value)}
                />
            </div>
        );
    },
};
