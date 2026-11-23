// The palettes of this theme. Each has a light and a dark half:
// `anchors` + `roles` feed makeColors (the app's own colors),
// `scene` paints the backdrop in that mode: a flat still ground (apple-green) or the
// animated night lake (firefly-lake), or the windswept grass field (silver-grass). Only the half named by `mode` is used.
// One Dark Pro, Dracula and Material take their colours from the VS Code themes of those names,
// on the same still ground as apple-green, each paired with its own code highlighting.
//
// Rules (from look.md):
// - surface-0 is the darkest surface in BOTH modes; surface-1..3 step lighter, a few % apart.
// - Light mode: surface-2 and surface-3 must match if both given (or omit surface-3).
// - Dark mode: keep surface-3 close to surface-0 or Desktop refuses the whole theme.
// - text-primary >= 7:1 on every surface; text-muted >= 4.5:1 on surface-0 and surface-2.
// - danger stays red, success green, warning amber — tuned toward the theme's hue.

export type PaletteId = 'apple-green' | 'firefly-lake' | 'silver-grass' | 'one-dark-pro' | 'dracula' | 'material'

export const PALETTE_IDS: readonly PaletteId[] = [
  'apple-green',
  'firefly-lake',
  'silver-grass',
  'one-dark-pro',
  'dracula',
  'material',
]

export const DEFAULT_PALETTE: PaletteId = 'apple-green'

type Anchors = {
  'surface-0': string
  'surface-1': string
  'surface-2': string
  'surface-3'?: string
  'text-primary': string
  'text-secondary': string
  'text-muted': string
}

type Roles = { accent: string; danger: string; success: string; warning: string; pro: string }

/** The colors of one mode of the backdrop; each art reads the keys it needs. */
export type SceneColors = Record<string, string>

type Half = { anchors: Anchors; roles: Roles; scene: SceneColors }

export type Palette = {
  id: PaletteId
  label: string
  /** Screen-reader description of the backdrop. */
  alt: string
  /**
   * The one mode this palette is made for. Only that half is sent (`only` in makeColors) and
   * the window is pinned to it; the other half is unused. A look for both modes is two palettes.
   */
  mode: 'light' | 'dark'
  /** Which drawing the backdrop is: a flat still ground, or the animated lake. */
  art: 'bands' | 'lake' | 'field'
  /** Code highlighting theme by name (Desktop's bundled names, e.g. 'everforest-light'); absent, the app's own. */
  codeTheme?: string
  /** The frost the app lays over the backdrop under its panels. */
  glass: { blur: number; tint: string; opacity: number }
  dark: Half
  light: Half
}

const UNUSED: Half = {
  anchors: {
    'surface-0': '#101814', 'surface-1': '#151e19', 'surface-2': '#1a241e', 'surface-3': '#1b2620',
    'text-primary': '#eef3ec', 'text-secondary': '#c8d4c8', 'text-muted': '#a0b0a2',
  },
  roles: { accent: '#7fc8a9', danger: '#ff6f61', success: '#9ad36a', warning: '#f0c46a', pro: '#b3a6f2' },
  scene: {},
}

// The light half of a dark-only palette: never drawn, but makeColors still checks it.
const UNUSED_LIGHT: Half = { ...UNUSED, anchors: {
  'surface-0': '#eceef0', 'surface-1': '#f2f3f5', 'surface-2': '#f8f9fa',
  'text-primary': '#1c2024', 'text-secondary': '#3a4048', 'text-muted': '#565e68',
} }

export const PALETTES: Record<PaletteId, Palette> = {
  // Apple green: a soft apple-green main window; the app draws its own lighter sidebars
  // (sidebar and right panel). No motion.
  'apple-green': {
    id: 'apple-green',
    label: 'Apple green',
    alt: 'A soft, flat apple-green ground',
    mode: 'light',
    art: 'bands',
    // Warm green-cream code blocks with soft green/teal tokens, to match the page.
    codeTheme: 'everforest-light',
    glass: { blur: 0, tint: '#eef3ec', opacity: 0 },
    light: {
      anchors: {
        'surface-0': '#dde3d7',
        'surface-1': '#e5e9e0',
        'surface-2': '#f1f4ed',
        'surface-3': '#f1f4ed',
        'text-primary': '#0d1512',
        'text-secondary': '#2e5a4c',
        'text-muted': '#4b6a5e',
      },
      // Lively seeds so icons, links and code read colorful against the soft page.
      roles: { accent: '#1f8a72', danger: '#c0473a', success: '#4f9a12', warning: '#b07400', pro: '#6a55c8' },
      // Main window apple green, sidebars a lighter, quieter off-white sage.
      scene: { sideTop: '#eef0ea', sideLow: '#ebeee7', edge: '#c9d9bd', middle: '#e4e8e0' },
    },
    dark: UNUSED,
  },
  // Firefly Lake: deep teal night by a still lake, moon low on the right, fireflies drifting
  // at the edges. Heavier frost keeps the reading area quiet.
  'firefly-lake': {
    id: 'firefly-lake',
    label: 'Firefly Lake',
    alt: 'A moonlit teal lake at night: fireflies glowing at the edges, quiet fireworks over tall spruces on the right',
    mode: 'dark',
    art: 'lake',
    glass: { blur: 5, tint: '#06201d', opacity: 0.2 },
    light: { ...UNUSED, anchors: {
      'surface-0': '#e9f0ec', 'surface-1': '#f1f6f2', 'surface-2': '#f9fbf8',
      'text-primary': '#10302c', 'text-secondary': '#2c4a45', 'text-muted': '#46615c',
    } },
    dark: {
      anchors: {
        'surface-0': '#071e1c',
        'surface-1': '#0a2624',
        'surface-2': '#0c2e2b',
        'surface-3': '#0d302d',
        'text-primary': '#e5ecea',
        'text-secondary': '#b4c4c0',
        'text-muted': '#9babA6'.toLowerCase(),
      },
      roles: { accent: '#3cc7b5', danger: '#ff6b6b', success: '#a6d33a', warning: '#f2c66d', pro: '#a8a4f0' },
      scene: {
        skyTop: '#04110f', skyMid: '#0a2a27', skyLow: '#145049',
        moon: '#f1efd8', glow: '#9fe0cf',
        farHills: '#0b2522', nearHills: '#071a18',
        lakeTop: '#0f3d38', lakeLow: '#051513', shimmer: '#cdeee4',
        trees: '#041210', treeBack: '#24524a', treeFront: '#0f3029', treeLit: '#7fb7a0', bark: '#0a1c18',firefly: '#e4f79a', fireflyGlow: '#c8f06a', burst: '#ffb27a',
      },
    },
  },
  // Silver grass: a field of tall silver grass at dusk, a misty lake, a band of golden
  // autumn trees on the far shore. Breeze waves roll through the grass from left to right.
  'silver-grass': {
    id: 'silver-grass',
    label: 'Silver grass',
    alt: 'A field of tall silver grass at dusk, waving in the breeze, with mist and golden autumn trees across a lake',
    mode: 'dark',
    art: 'field',
    glass: { blur: 4, tint: '#0c1512', opacity: 0.25 },
    light: { ...UNUSED, anchors: {
      'surface-0': '#eceee6', 'surface-1': '#f2f3ed', 'surface-2': '#f8f9f5',
      'text-primary': '#1c241f', 'text-secondary': '#3a453e', 'text-muted': '#56615a',
    } },
    dark: {
      anchors: {
        'surface-0': '#0e1613',
        'surface-1': '#121c18',
        'surface-2': '#16211c',
        'surface-3': '#17231e',
        'text-primary': '#eeebdf',
        'text-secondary': '#c9c6b6',
        'text-muted': '#a6a393',
      },
      roles: { accent: '#e0a83e', danger: '#e2654f', success: '#a3c46a', warning: '#f2c35e', pro: '#b8a6e6' },
      scene: {
        skyTop: '#121b1a', skyMid: '#2c3a36', skyLow: '#8a9a8c', sun: '#f4ecd2',
        mist: '#c9d2c4', hills: '#3c4a42', trees: '#5e5536', treesLit: '#7d6f45', treesDark: '#3e3a28',
        lake: '#5f6f66', stem: '#17221c', stemLit: '#33463a', plume: '#e6e6d4', leaf: '#e3a33a',
        steel: '#aeb8b4', brass: '#8f7134', grip: '#1a1716', gripWrap: '#4a423b', cord: '#8e3a2c', mask: '#2c2724',
      },
    },
  },
  // One Dark Pro: Atom's One Dark as VS Code ships it. Cool slate greys, blue keywords.
  'one-dark-pro': {
    id: 'one-dark-pro',
    label: 'One Dark Pro',
    alt: 'A flat slate-grey ground',
    mode: 'dark',
    art: 'bands',
    codeTheme: 'one-dark-pro',
    glass: { blur: 0, tint: '#282c34', opacity: 0 },
    light: UNUSED_LIGHT,
    dark: {
      anchors: {
        'surface-0': '#21252b',
        'surface-1': '#282c34',
        'surface-2': '#2c313a',
        'surface-3': '#2c313a',
        'text-primary': '#e6e9ef',
        'text-secondary': '#c2c8d3',
        'text-muted': '#9da5b4',
      },
      roles: { accent: '#61afef', danger: '#e06c75', success: '#98c379', warning: '#e5c07b', pro: '#c678dd' },
      scene: { middle: '#282c34' },
    },
  },
  // Dracula: deep blue-violet night with pink, purple and green accents.
  dracula: {
    id: 'dracula',
    label: 'Dracula',
    alt: 'A flat deep violet-grey ground',
    mode: 'dark',
    art: 'bands',
    codeTheme: 'dracula',
    glass: { blur: 0, tint: '#282a36', opacity: 0 },
    light: UNUSED_LIGHT,
    dark: {
      anchors: {
        'surface-0': '#21222c',
        'surface-1': '#282a36',
        'surface-2': '#2c2e3c',
        'surface-3': '#2c2e3c',
        'text-primary': '#f8f8f2',
        'text-secondary': '#d6d7e4',
        'text-muted': '#aeb2cc',
      },
      roles: { accent: '#bd93f9', danger: '#ff5555', success: '#50fa7b', warning: '#ffb86c', pro: '#ff79c6' },
      scene: { middle: '#282a36' },
    },
  },
  // Material: the Material Theme's blue-grey with its teal accent and pastel code.
  material: {
    id: 'material',
    label: 'Material',
    alt: 'A flat blue-grey ground',
    mode: 'dark',
    art: 'bands',
    codeTheme: 'material-theme',
    glass: { blur: 0, tint: '#263238', opacity: 0 },
    light: UNUSED_LIGHT,
    dark: {
      anchors: {
        'surface-0': '#1f292e',
        'surface-1': '#263238',
        'surface-2': '#2a373e',
        'surface-3': '#2a373e',
        'text-primary': '#eeffff',
        'text-secondary': '#c3d2d9',
        'text-muted': '#a2b6bf',
      },
      roles: { accent: '#80cbc4', danger: '#f07178', success: '#c3e88d', warning: '#ffcb6b', pro: '#c792ea' },
      scene: { middle: '#263238' },
    },
  },
}
