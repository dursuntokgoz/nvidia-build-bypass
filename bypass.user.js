// ==UserScript==
// @name         NVIDIA Build Country Bypass
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Adds banned countries and enables Send Code button
// @author       Developer
// @match        https://build.nvidia.com/*
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  const PHONE_NUMBER = ''; // Enter your number here: +905XXXXXXXXX

  const BANNED = [
    { value: 'TR', label: 'Turkey' },
    { value: 'IR', label: 'Iran' },
    { value: 'SY', label: 'Syria' },
    { value: 'CU', label: 'Cuba' },
    { value: 'KP', label: 'North Korea' },
    { value: 'RU', label: 'Russia' },
    { value: 'BY', label: 'Belarus' },
    { value: 'AF', label: 'Afghanistan' }
  ];

  if (!window._fetchPatched) {
    const F = window.fetch;
    window.fetch = async (...a) => {
      const u = a[0]?.url || a[0];
      if (u && u.includes('otp-unsupported-countries')) {
        return new Response(JSON.stringify([]), { status: 200 });
      }
      return F.apply(this, a);
    };
    window._fetchPatched = true;
  }

  const getProps = (el) => {
    const k = Object.keys(el || {}).find(k => k.startsWith('__reactProps'));
    return k ? el[k] : null;
  };

  const patch = () => {
    const btn = document.querySelector("button[aria-label='Phone number country']");
    if (!btn) return;
    const p = getProps(btn);
    if (!p?.options) return;

    BANNED.forEach(c => {
      if (!p.options.find(o => o.value === c.value)) {
        p.options.unshift({ ...c });
      }
    });
    p.options.forEach(o => o.disabled = false);
    p.onChange?.('TR');
  };

  const enableSend = () => {
    const s = [...document.querySelectorAll('button')].find(b => /send code/i.test(b.textContent));
    if (!s) return;
    s.disabled = false;
    s.setAttribute('aria-disabled', 'false');
    s.style.pointerEvents = 'auto';
    s.style.opacity = '1';
  };

  const setPhone = () => {
    const i = document.querySelector('input[type="tel"]');
    if (!i || !PHONE_NUMBER) return;
    const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set;
    setter.call(i, PHONE_NUMBER);
    i.dispatchEvent(new Event('input', { bubbles: true }));
    i.dispatchEvent(new Event('change', { bubbles: true }));
  };

  setInterval(() => { patch(); enableSend(); }, 500);
  patch();
  enableSend();
  setPhone();
})();
