# BOOMR. Brand System — "Trajectory"

## Concept
BOOMR. is a concept store for one object: the boomerang. Everything in the
brand comes back to the physics of a throw — release, arc, return. That's
the visual and verbal thread tying colors, type, icons and motion together.

## Color — chosen for meaning, not decoration

| Token | Hex | Role | Why |
|---|---|---|---|
| `--midnight` (Void Indigo) | `#0a0c14` | Primary ground | Deeper and bluer than a neutral near-black, so the site reads as "dusk sky" — the moment just before or after a throw — rather than generic dark-mode grey. |
| `--deep` / `--surface` / `--card` | `#10131f` / `#151827` / `#1b1f32` | Elevation layers | Same indigo family, stepped in lightness only — keeps depth without introducing a competing hue. |
| `--ochre` (Solar Flare) | `#ff5a2e` | Primary accent / CTA | The kinetic-energy color of release — warm, saturated orange-red. Sits in near-complementary contrast to the indigo ground, which is exactly why it reads as "energy" rather than blending in. Used only for action: buy, add-to-cart, primary CTAs, hover states. |
| `--info` (Return Cyan) | `#38e0c8` | Secondary accent | Traces the arc *back* — reserved for "return" moments only: success confirmations, in-stock indicators, the flight-path motif in illustrations. Never used for primary actions, so it stays meaningful instead of decorative. |
| `--chalk` (Bone) | `#f4efe4` | Primary text / light surfaces | A warm off-white — canvas, ash wood, chalk grip — never clinical pure white. |
| `--chalk-dim` | `#9aa1bd` | Secondary text | Cool, muted, low-contrast against the indigo ground for hierarchy. |
| `--danger` | `#ef5350` | Errors only | Kept clearly distinct from Solar Flare so "buy" and "error" are never visually confused. |

**Rule of use:** Solar Flare = act. Return Cyan = confirm/return. Everything
else stays in the indigo/bone neutral scale. If a screen has more than one
accent color fighting for attention, something's wrong.

## Typography

- **Display — Space Grotesk**: geometric, technical, slightly aeronautical
  letterforms. Used for headings, prices, stat numbers — anywhere the brand
  needs to feel engineered rather than soft.
- **Body — Inter**: neutral, highly legible, disappears into the background
  so product copy and specs stay readable at small sizes on mobile.
- **Mono — Space Mono**: SKUs, badges, countdown timers — anything that reads
  as a "spec sheet" detail.

## Motion principles

- Entrances stage in like a throw settling into its line: eyebrow → heading
  (line by line) → copy → actions → stats → visual, each with a slight
  overshoot-free `power3.out` ease — confident, not bouncy.
- The hero visual parallaxes and rotates on scroll — literally traces an arc
  as you scroll past it, tying the *interaction* back to the *concept*.
- Reduced-motion users get an instant, fully-visible state — no motion is
  ever required to read content.

## Mobile-first intent
Every surface is designed to feel like a native app once the viewport drops
below tablet width: large touch targets, bottom-anchored primary actions
where relevant, and no animation that depends on hover (hover effects always
have a tap-equivalent).

## Icons
Icon set follows the same rule as color: line-weight icons in `--chalk`/
`--chalk-dim` for neutral UI, filled/accent-colored only for the two states
that matter — an active cart badge (Solar Flare) and confirmed/return states
(Return Cyan). No decorative icon should ever borrow the accent colors.
