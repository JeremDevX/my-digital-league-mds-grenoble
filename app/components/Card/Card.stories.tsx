import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Card from "./Card";

const meta = {
  title: "Components/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Card Title",
    description: "This is a default card component",
  },
};

export const WithImage: Story = {
  args: {
    title: "Card with Image",
    description: "This card includes an image",
    image: "https://via.placeholder.com/300x200",
  },
};

export const Interactive: Story = {
  args: {
    title: "Interactive Card",
    description: "Click me!",
    onClick: () => alert("Card clicked"),
  },
};
