# NVIDIA Build Country Bypass

Bypasses country restrictions on NVIDIA Build phone verification.

## Usage

1. Open https://build.nvidia.com
2. Press `F12` → Console
3. Type `allow pasting` and press Enter (if blocked)
4. Open `bypass.user.js` and copy the code
5. Paste in console and press Enter
6. Turkey is auto-selected, enter your phone number
7. Click **Send Code**

## What It Does

- Intercepts `/otp-unsupported-countries.yaml` API
- Clears React Query cache for banned countries
- Injects banned countries (TR, IR, SY, CU, KP, RU, BY) into dropdown
- Forces button enabled state
- Auto-fills phone number (if set)

**For testing/research only.**

## Check These Out Too

- [opencode-pair](https://github.com/cemalturkcan/opencode-pair) — AI pair programming setup
- [opencode-anthropic-login-via-cli](https://github.com/cemalturkcan/opencode-anthropic-login-via-cli) — Anthropic login automation via CLI
