/**
 * Central studio data. Single source of truth for every page, JSON-LD
 * block, and llms.txt.
 */
export const studio = {
  name: 'Yellow Leaves Studio',
  url: 'https://yellowleavesstudio.com',
  tagline: 'We make small things that last.',
  description:
    'Yellow Leaves Studio is a small independent studio making games and apps with care. Maker of Leave Smart, the location-based reminders app for iPhone, with an unannounced game in the works.',
  foundingYear: '2025',
  founder: 'Kowsik Paduchuri',
  email: 'yellowleavesstudio@gmail.com',
  socials: [
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/company/yellow-leaves-studio',
    },
  ],
};

export const leaveSmart = {
  name: 'Leave Smart',
  subtitle: 'Smart location-based reminders',
  appStoreUrl: 'https://apps.apple.com/us/app/leave-smart/id6751127452',
  category: 'Productivity',
  price: 'Free',
  requires: 'iPhone, iOS 15.1 or later',
  oneLiner: 'The right reminder, at the right place.',
  description:
    'Create a reminder once, pick a place, and Leave Smart notifies you the moment you arrive or leave — even when the app is closed. Battery friendly, and your location never leaves your phone.',
  features: [
    {
      title: 'Arrive & leave triggers',
      body: 'Reminders fire the moment you enter or exit a place — grab the milk when you reach the store, lock up when you leave home.',
    },
    {
      title: 'Battery friendly',
      body: 'Motion awareness keeps background location use light, so your battery barely notices it working.',
    },
    {
      title: 'Private by design',
      body: 'Your locations are stored on your phone and nowhere else. No accounts, no tracking, no data collected.',
    },
    {
      title: 'On your schedule',
      body: 'Add time windows and repeats — daily, weekdays, or custom — so reminders only fire when they should.',
    },
  ],
};

export const game = {
  // Unannounced — mood only. No name, no genre, no details on the site.
  status: 'In development',
  teaserLine: 'Our first game is napping.',
  teaserSub:
    'It’s taking root behind the scenes — follow along and we’ll share it the moment it wakes up.',
};
