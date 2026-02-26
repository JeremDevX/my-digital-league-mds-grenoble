import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Card from "./Card";
import { MessageSquareIcon } from "../Icons/Icons";

const meta = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ fontFamily: "Inter, sans-serif" }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "register", "featured"],
    },
    status: {
      control: "select",
      options: ["upcoming", "ongoing"],
    },
    icon: {
      options: ["none", "message"],
      mapping: {
        none: undefined,
        message: <MessageSquareIcon />,
      },
      control: {
        type: "radio",
      },
    },
    onClick: { action: "clicked" },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

const baseArgs = {
  id: "event-1",
  name: "Rocket League – Aerial Cup",
  description:
    "48 heures pour creer un jeu video en equipe. Creativite, collaboration et passion au rendez-vous.",
  date: new Date("2026-03-15T14:00:00"),
  inscriptionDeadline: new Date("2026-03-10T23:59:59"),
  rules: "Be respectful and creative",
  gameId: "game-1",
  createdAt: new Date("2026-02-26T09:00:00"),
  updatedAt: new Date("2026-02-26T09:00:00"),
};

export const Default: Story = {
  args: {
    ...baseArgs,
    variant: "default",
    status: "upcoming",
    icon: <MessageSquareIcon />,
  },
};

export const Register: Story = {
  args: {
    ...baseArgs,
    variant: "register",
    status: "ongoing",
    icon: <MessageSquareIcon />,
    heure: "14h00",
    lieu: "MyDigitalSchool",
  },
};

export const Featured: Story = {
  args: {
    ...baseArgs,
    variant: "featured",
    status: "upcoming",
    icon: <MessageSquareIcon />,
    duration: "2 jours",
    animatedBy: "Stella @ MyDigitalSchool",
  },
};
