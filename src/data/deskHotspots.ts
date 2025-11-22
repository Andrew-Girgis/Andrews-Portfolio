/**
 * Desk Setup Hotspot Configuration
 * Maps SVG element IDs to product information for interactive desk setup visualization
 */

export interface HotspotProduct {
  /** Display name of the product */
  name: string;
  /** Detailed description shown in tooltip */
  description: string;
  /** Optional product link for more information */
  link?: string;
}

export interface HotspotConfig {
  /** SVG element ID to target */
  id: string;
  /** Product information */
  product: HotspotProduct;
}

/**
 * Complete configuration map for all desk setup hotspots
 * Each entry corresponds to an SVG element ID in the desk setup illustration
 */
export const HOTSPOT_CONFIG: Record<string, HotspotProduct> = {
  'Monitor-1-Outline': {
    name: "Dell P2422HE 24' inch Monitor",
    description: "My secondary display I use to increase productivity and multitask efficiently.",
    link: ''
  },
  'Monitor-2-Outline': {
    name: "Dell S2421HGF 24'Gaming Monitor",
    description: "My main display for coding, research, and gaming.",
    link: ''
  },
  'Monitor-3-Outline': {
    name: "Dell P2422HE 24' inch Monitor",
    description: "My Tertiary display which I use for reading feeds, Slack/Discord messages and articles.",
    link: ''
  },
  'Keyboard-Outline': {
    name: 'UGREEN 4K KVM Switch',
    description: 'Seamlessly switch keyboard, mouse, and monitors between my MacBook Air and custom PC.',
    link: ''
  },
  'Keyboard-Outline1': {
    name: 'Lofree Flow84 Mechanical Keyboard',
    description: "Low-profile mechanical keyboard with Phantom switches. Love it for the tactile feel, subtle sounds, and compact travel-friendly design.",
    link: ''
  },
  'Custom-PC-Outline': {
    name: 'Custom PC',
    description: 'A custom PC I built myself. It features a 3070ti GPU, Intel i9-10900K CPU, and 32GB RAM for larger data science, and machine learning tasks and some occasional gaming. Currently running Pop OS on it.',
    link: ''
  },
  'Coffee-Outline': {
    name: 'Coffee Mug',
    description: 'Essential fuel for productive coding sessions ☕',
    link: ''
  },
  'Mouse-Outline': {
    name: 'Lofree Wavy Chips Wireless Mouse',
    description: 'I really enjoy this mouse from its design to the thumb wheel and button for multi gesture use',
    link: ''
  },
  'Mic-Outline': {
    name: 'Fifine AM8 Microphone on boom arm ',
    description: 'I use this for improvement in audio quality in meetings, and videos.',
    link: ''
  },
  'Camera-Outline': {
    name: 'Logitech StreamCam',
    description: 'Mounted on left monitor for meetings.',
    link: ''
  },
  'Macbook-Outline': {
    name: 'M4 MacBook Air "',
    description: '32GB RAM, 1TB SSD, my portable powerhouse for Data Analysis on the go',
    link: ''
  },
  'Headphones-Outline': {
    name: 'Nothing headphones (1)',
    description: 'Professional studio headphones - Exceptional clarity and comfort for long sessions',
    link: ''
  }
};

/**
 * Get all hotspot IDs as an array
 */
export const HOTSPOT_IDS = Object.keys(HOTSPOT_CONFIG);

/**
 * Get product information for a given element ID
 */
export function getProductInfo(elementId: string): HotspotProduct | undefined {
  return HOTSPOT_CONFIG[elementId];
}
