import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  ArrowCircleRightIcon,
  CalendarIcon,
  CalendarTodayIcon,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CircleQuestionIcon,
  ClockIcon,
  GamepadIcon,
  CupIcon,
  DiceIcon,
  DiscordIcon,
  DiscoveryIcon,
  EnvelopIcon,
  ExternalLinkIcon,
  GroupIcon,
  InstagramIcon,
  JoystickIcon,
  LightbulbIcon,
  LocationIcon,
  MegaphoneIcon,
  MessageSquareIcon,
  PlusIcon,
  PodiumIcon,
  RocketIcon,
  TeamIcon,
  BoltIcon,
  AlienIcon,
  BullseyArrowIcon,
  FilterIcon,
  LinkIcon,
} from "./Icons";

const meta = {
  title: "Components/Icons",
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
    },
  },
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const ArrowCircleRight: Story = {
  render: () => <ArrowCircleRightIcon />,
};

export const MessageSquare: Story = {
  render: () => <MessageSquareIcon />,
};

export const Plus: Story = {
  render: () => <PlusIcon />,
};

export const Group: Story = {
  render: () => <GroupIcon />,
};

export const Lightbulb: Story = {
  render: () => <LightbulbIcon />,
};

export const Discord: Story = {
  render: () => <DiscordIcon />,
};

export const Instagram: Story = {
  render: () => <InstagramIcon />,
};

export const Envelop: Story = {
  render: () => <EnvelopIcon />,
};

export const ChevronRight: Story = {
  render: () => <ChevronRightIcon />,
};

export const ChevronLeft: Story = {
  render: () => <ChevronLeftIcon />,
};

export const Cup: Story = {
  render: () => <CupIcon />,
}

export const Podium: Story = {
  render: () => <PodiumIcon />,
}

export const Rocket: Story = {
  render: () => <RocketIcon />
}

export const Controller: Story = {
  render: () => <GamepadIcon />
}

export const Calendar: Story = {
  render: () => <CalendarIcon />
}

export const Location: Story = {
  render: () => <LocationIcon />
}

export const Team: Story = {
  render: () => <TeamIcon />
}

export const Discovery: Story = {
  render: () => <DiscoveryIcon />
}

export const CircleQuestion: Story = {
  render: () => <CircleQuestionIcon />
}

export const Check: Story = {
  render: () => <CheckIcon />
}

export const ExternalLink: Story = {
  render: () => <ExternalLinkIcon />
}

export const Clock: Story = {
  render: () => <ClockIcon />
}

export const CalendarToday: Story = {
  render: () => <CalendarTodayIcon />
}

export const Megaphone: Story = {
  render: () => <MegaphoneIcon />
}

export const Dice: Story = {
  render: () => <DiceIcon />
}

export const Joystick: Story = {
  render: () => <JoystickIcon />
}

export const Bolt: Story = {
  render: () => <BoltIcon />
}

export const Alien: Story = {
  render: () => < AlienIcon />
}

export const BullseyArrow: Story = {
  render: () => < BullseyArrowIcon />
}

export const Filter: Story = {
  render: () => < FilterIcon />
}

export const Link: Story = {
  render: () => < LinkIcon />
}