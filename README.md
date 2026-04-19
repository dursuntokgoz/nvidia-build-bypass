# NVIDIA Build Country Bypass

Bypasses country restrictions on NVIDIA Build phone verification.

## Usage

### Browser Console (Quick)

1. Open https://build.nvidia.com
2. Press `F12` → Console
3. Type `allow pasting` and press Enter (if blocked)
4. Open `bypass.user.js` and copy the code
5. Paste in console and press Enter
6. Select **Turkey** from dropdown
7. Enter phone number
8. Click **Send Code**

### Tampermonkey (Auto)

1. Install [Tampermonkey](https://www.tampermonkey.net/)
2. Create new script
3. Copy content from `bypass.user.js`
4. Set `PHONE_NUMBER` variable
5. Save and reload page

## What It Does

- Intercepts `/otp-unsupported-countries.yaml` API
- Injects banned countries into dropdown
- Forces button enabled state
- Auto-fills phone number (if set)

**For testing/research only.**
