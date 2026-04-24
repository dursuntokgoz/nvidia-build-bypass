// ==UserScript==
// @name         NVIDIA Build Country Bypass
// @namespace    http://tampermonkey.net/
// @version      5.1
// @description  Clears unsupported-countries cache, injects banned countries, enables Send Code button
// @author       Developer
// @match        https://build.nvidia.com/*
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  const PHONE_NUMBER = '';
  const BANNED = [
    { value: 'TR', label: 'Turkey' },
    { value: 'IR', label: 'Iran' },
    { value: 'SY', label: 'Syria' },
    { value: 'CU', label: 'Cuba' },
    { value: 'KP', label: 'North Korea' },
    { value: 'RU', label: 'Russia' },
    { value: 'BY', label: 'Belarus' }
  ];

  if (!window._fetchPatched) {
    const orig = window.fetch;
    window.fetch = async function(...args) {
      const url = typeof args[0] === 'string' ? args[0] : args[0]?.url || args[0]?.toString?.() || '';
      if (url.includes('otp-unsupported-countries')) {
        return new Response(JSON.stringify([]), { status: 200, headers: { 'Content-Type': 'application/json' } });
      }
      return orig.apply(this, args);
    };
    window._fetchPatched = true;
  }

  const getFiber = (el) => {
    const k = Object.keys(el || {}).find(k => k.startsWith('__reactFiber'));
    return k ? el[k] : null;
  };

  const findFormComp = (sendBtn) => {
    const fiber = getFiber(sendBtn);
    if (!fiber) return null;
    let current = fiber.return;
    while (current) {
      if (current.memoizedProps?.handleSendCode) return current;
      current = current.return;
    }
    return null;
  };

  const clearCache = () => {
    const sendBtn = [...document.querySelectorAll('button')].find(b => /send code/i.test(b.textContent));
    if (!sendBtn) return false;
    const formComp = findFormComp(sendBtn);
    if (!formComp?.memoizedState) return false;

    let hook = formComp.memoizedState;
    let idx = 0;
    while (hook && idx < 10) {
      const val = hook.memoizedState;
      if (val && Array.isArray(val.data) && val.data.length > 0) {
        val.refetch?.().catch(() => {});
        hook.memoizedState = { ...val, data: [], isFetching: false, status: 'success', isSuccess: true };
        return true;
      }
      hook = hook.next;
      idx++;
    }
    return false;
  };

  const patch = () => {
    const btn = document.querySelector("button[aria-label='Phone number country']");
    if (!btn) return;
    const fiber = getFiber(btn);
    if (!fiber?.memoizedProps?.options) return;
    const props = fiber.memoizedProps;

    BANNED.forEach(c => {
      if (!props.options.find(o => o.value === c.value)) {
        props.options.unshift({ ...c });
      }
    });
    props.options.forEach(o => { o.disabled = false; });
    props.onChange?.('TR');
  };

  const setPhone = () => {
    const i = document.querySelector('input[type="tel"]');
    if (!i || !PHONE_NUMBER) return;
    const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set;
    setter.call(i, PHONE_NUMBER);
    i.dispatchEvent(new Event('input', { bubbles: true }));
    i.dispatchEvent(new Event('change', { bubbles: true }));
  };

  const tick = () => {
    patch();
    setPhone();
    if (clearCache()) {
      const btn = document.querySelector("button[aria-label='Phone number country']");
      const fiber = getFiber(btn);
      fiber?.memoizedProps?.onChange?.('TR');
    }
  };

  setInterval(tick, 500);
  tick();
})();
