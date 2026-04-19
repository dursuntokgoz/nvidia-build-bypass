# NVIDIA Build Country Bypass

Bypasses country restrictions on NVIDIA Build phone verification.

## Usage

1. Open https://build.nvidia.com
2. Press `F12` → Console
3. Type `allow pasting` and press Enter (if blocked)
4. Open `bypass.user.js` and copy the code
5. Paste in console and press Enter
6. Select **your country** from dropdown (Turkey, Iran, etc.)
7. Enter phone number
8. Click **Send Code**

## What It Does

- Intercepts `/otp-unsupported-countries.yaml` API
- Injects banned countries (TR, IR, SY, CU, KP, RU, BY, AF) into dropdown
- Forces button enabled state
- Auto-fills phone number (if set)

**For testing/research only.**
