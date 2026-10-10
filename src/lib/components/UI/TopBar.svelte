<script lang="ts">
  import { energy } from '../../core/energyState.svelte';
  import { economy } from '../../core/economyState.svelte';
  import { sound } from '../../services/audio';
  import { i18n, t, type Language } from '../../services/i18n.svelte';

  interface Props {
    onOpenShop?: () => void;
  }

  let { onOpenShop }: Props = $props();
  let isMuted = $state(sound.isMuted);

  function handleToggleSound() {
    isMuted = sound.toggleMute();
  }

  function cycleLanguage() {
    const codes: Language[] = ['ru', 'en', 'tr'];
    const nextIdx = (codes.indexOf(i18n.currentLang) + 1) % codes.length;
    i18n.setLanguage(codes[nextIdx]);
    sound.playClick();
  }

  let formattedNextRefill = $derived(
    energy.current >= energy.max ? t('topbar.max') : energy.formattedNextRefill
  );
</script>

<header class="top-bar">
  <!-- Energy Pill -->
  <button class="stat-pill energy-pill" onclick={onOpenShop} title={t('topbar.energyTitle')}>
    <div class="pill-icon energy-icon">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13 2L3 14h8l-2 8 10-12h-8l2-8z" fill="#fbc531"/>
      </svg>
    </div>
    <div class="pill-text">
      <span class="pill-val">{energy.current}/{energy.max}</span>
      <span class="pill-sub">{formattedNextRefill}</span>
    </div>
    <span class="pill-plus">+</span>
  </button>

  <!-- Currency Group -->
  <div class="currencies">
    <!-- Coins -->
    <div class="stat-pill compact" title={t('topbar.coinsTitle')}>
      <div class="pill-icon">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="9" fill="#f5cd79" stroke="#e58e26" stroke-width="1.5"/>
          <circle cx="12" cy="12" r="5" fill="#e58e26" opacity="0.4"/>
          <text x="12" y="15" text-anchor="middle" font-size="10" font-weight="bold" fill="#78350f">M</text>
        </svg>
      </div>
      <span class="pill-val">{economy.coins}</span>
    </div>

    <!-- Gems -->
    <div class="stat-pill compact" title={t('topbar.gemsTitle')}>
      <div class="pill-icon">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <polygon points="12,3 20,9 12,21 4,9" fill="#00d2d3" stroke="#01a3a4" stroke-width="1.5"/>
          <polygon points="12,3 16,9 12,21" fill="#fff" opacity="0.4"/>
        </svg>
      </div>
      <span class="pill-val">{economy.gems}</span>
    </div>

    <!-- Stars (For Meta Room) -->
    <div class="stat-pill compact star-pill" title={t('topbar.starsTitle')}>
      <div class="pill-icon">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" fill="#f5cd79" stroke="#e58e26" stroke-width="1.2"/>
        </svg>
      </div>
      <span class="pill-val star-val">{economy.stars}</span>
    </div>
  </div>

  <!-- Right Controls: Language & Audio -->
  <div class="right-controls">
    <button class="lang-btn" onclick={cycleLanguage} title="Сменить язык">
      <span class="lang-flag">{i18n.currentLang === 'ru' ? '🇷🇺' : i18n.currentLang === 'en' ? '🇬🇧' : '🇹🇷'}</span>
      <span class="lang-code">{i18n.currentLang.toUpperCase()}</span>
    </button>

    <button class="icon-btn sound-btn" onclick={handleToggleSound} aria-label={t('topbar.sound')}>
      {#if isMuted}
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11 5L6 9H2v6h4l5 4V5z" fill="#747d8c"/>
          <line x1="23" y1="9" x2="17" y2="15" stroke="#ff6b6b" stroke-width="2" stroke-linecap="round"/>
          <line x1="17" y1="9" x2="23" y2="15" stroke="#ff6b6b" stroke-width="2" stroke-linecap="round"/>
        </svg>
      {:else}
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11 5L6 9H2v6h4l5 4V5z" fill="#f5cd79"/>
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07m2.83-9.9a9 9 0 0 1 0 12.73" stroke="#f5cd79" stroke-width="2" stroke-linecap="round"/>
        </svg>
      {/if}
    </button>
  </div>
</header>

<style>
  .top-bar {
    height: var(--topbar-height);
    padding: 0 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 6px;
    background: var(--bg-glass-strong);
    border-bottom: 1px solid var(--border-subtle);
    backdrop-filter: blur(10px);
    z-index: 50;
    box-shadow: var(--shadow-sm);
  }

  .stat-pill {
    display: flex;
    align-items: center;
    gap: 5px;
    background: rgba(18, 25, 45, 0.9);
    border: 1px solid rgba(140, 122, 230, 0.25);
    border-radius: var(--radius-full);
    padding: 4px 8px;
    color: var(--text-main);
    font-size: 13px;
    font-weight: 600;
  }

  .energy-pill {
    padding: 4px 10px;
    background: linear-gradient(135deg, rgba(26, 35, 60, 0.95), rgba(15, 20, 36, 0.95));
    border-color: rgba(245, 205, 121, 0.35);
  }

  .energy-pill:active {
    transform: scale(0.97);
  }

  .pill-icon {
    width: 18px;
    height: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .pill-icon svg {
    width: 100%;
    height: 100%;
  }

  .pill-text {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    line-height: 1.1;
  }

  .pill-val {
    font-size: 13px;
    font-weight: 700;
  }

  .pill-sub {
    font-size: 9px;
    color: var(--text-muted);
    font-weight: 500;
  }

  .pill-plus {
    font-size: 14px;
    font-weight: 700;
    color: var(--arcane-gold);
    margin-left: 2px;
  }

  .currencies {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .stat-pill.compact {
    padding: 4px 7px;
  }

  .star-pill {
    border-color: rgba(245, 205, 121, 0.5);
    background: rgba(45, 36, 20, 0.6);
  }

  .star-val {
    color: var(--arcane-gold);
  }

  .right-controls {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .lang-btn {
    height: 32px;
    min-height: 32px;
    min-width: 48px;
    padding: 2px 7px;
    border-radius: var(--radius-full);
    background: rgba(18, 25, 45, 0.9);
    border: 1px solid var(--border-subtle);
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 11px;
    font-weight: 700;
    color: var(--arcane-gold);
    transition: transform 0.12s ease, border-color 0.15s ease;
  }

  .lang-btn:active {
    transform: scale(0.95);
    border-color: var(--arcane-gold);
  }

  .lang-flag {
    font-size: 13px;
    line-height: 1;
  }

  .lang-code {
    font-size: 10px;
    letter-spacing: 0.5px;
  }

  .icon-btn {
    width: 32px;
    height: 32px;
    min-width: 32px;
    min-height: 32px;
    border-radius: var(--radius-full);
    background: rgba(18, 25, 45, 0.8);
    border: 1px solid var(--border-subtle);
    padding: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .icon-btn svg {
    width: 100%;
    height: 100%;
  }
</style>
