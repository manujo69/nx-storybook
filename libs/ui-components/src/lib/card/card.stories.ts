// libs/ui-components/src/lib/card/card.stories.ts
import type { Meta, StoryObj } from '@storybook/angular';
import { Card } from './card';

const meta: Meta<Card> = {
  title: 'Card',
  component: Card,
};
export default meta;

type Story = StoryObj<Card>;

export const Primary: Story = {
  args: { title: 'Card Title' },
};
