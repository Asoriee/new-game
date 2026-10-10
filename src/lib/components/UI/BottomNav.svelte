<script lang="ts">
  import { sound } from '../../services/audio';
  import { orders } from '../../core/ordersState.svelte';
  import { economy } from '../../core/economyState.svelte';
  import { t } from '../../services/i18n.svelte';

  export type ScreenType = 'board' | 'room' | 'orders' | 'shop';

  interface Props {
    activeScreen: ScreenType;
    onSelectScreen: (screen: ScreenType) => void;
  }

  let { activeScreen, onSelectScreen }: Props = $props();

  let readyOrdersCount = $derived(
    orders.orders.filter((o) => orders.canCompleteOrder(o)).length
  );

  let hasRoomUpgradeAvailable = $derived(economy.stars >= 1);

  function handleSelect(screen: ScreenType) {
    if (activeScreen !== screen) {
      sound.playClick();
      onSelectScreen(screen);
    }
  }
</script>

<nav class="bottom-nav">
  <!-- Board Tab -->
  <button
    class="nav-tab {activeScreen === 'board' ? 'active' : ''}"
    onclick={() => handleSelect('board')}
  >
    <div class="tab-icon">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 11V9a7 7 0 0 0-14 0v2a5 5 0 0 0 0 10h14a5 5 0 0 0 0-10z" fill="currentColor" opacity="0.3"/>
        <path d="M10 2h4v4h-4z" fill="currentColor"/>
        <path d="M10 6l-5 12a3 3 0 0 0 2.8 4h8.4a3 3 0 0 0 2.8-4l-5-12z" stroke="currentColor" stroke-width="1.8"/>
      </svg>
    </div>
    <span class="tab-label">{t('nav.laboratory')}</span>
  </button>

  <!-- Meta Room Tab -->
  <button
    class="nav-tab {activeScreen === 'room' ? 'active' : ''}"
    onclick={() => handleSelect('room')}
  >
    <div class="tab-icon">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 21h18M4 21V10l8-6 8 6v11M9 21v-6a3 3 0 0 1 6 0v6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
        <circle cx="12" cy="9" r="1.5" fill="currentColor"/>
      </svg>
      {#if hasRoomUpgradeAvailable}
        <span class="badge star-badge">★</span>
      {/if}
    </div>
    <span class="tab-label">{t('nav.study')}</span>
  </button>

  <!-- Orders Tab -->
  <button
    class="nav-tab {activeScreen === 'orders' ? 'active' : ''}"
    onclick={() => handleSelect('orders')}
  >
    <div class="tab-icon">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" stroke-width="1.8"/>
        <polyline points="14,2 14,8 20,8" stroke="currentColor" stroke-width="1.8"/>
        <line x1="8" y1="13" x2="16" y2="13" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
        <line x1="8" y1="17" x2="14" y2="17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
      </svg>
      {#if readyOrdersCount > 0}
        <span class="badge order-badge">{readyOrdersCount}</span>
      {/if}
    </div>
    <span class="tab-label">{t('nav.orders')}</span>
  </button>

  <!-- Shop Tab -->
  <button
    class="nav-tab {activeScreen === 'shop' ? 'active' : ''}"
    onclick={() => handleSelect('shop')}
  >
    <div class="tab-icon">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polygon points="6,3 18,3 22,9 12,21 2,9" stroke="currentColor" stroke-width="1.8"/>
        <polyline points="2,9 12,21 22,9" stroke="currentColor" stroke-width="1.8"/>
        <line x1="6" y1="3" x2="12" y2="9" stroke="currentColor" stroke-width="1.8"/>
        <line x1="18" y1="3" x2="12" y2="9" stroke="currentColor" stroke-width="1.8"/>
      </svg>
    </div>
    <span class="tab-label">{t('nav.shop')}</span>
  </button>
</nav>

<style>
  .bottom-nav {
    height: var(--bottomnav-height);
    background: var(--bg-glass-strong);
    border-top: 1px solid var(--border-subtle);
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 0 4px;
    z-index: 50;
    backdrop-filter: blur(12px);
  }

  .nav-tab {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 3px;
    color: var(--text-muted);
    transition: all 0.15s ease;
    padding: 6px 0;
  }

  .nav-tab.active {
    color: var(--arcane-gold);
    transform: translateY(-2px);
  }

  .tab-icon {
    width: 24px;
    height: 24px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .tab-icon svg {
    width: 100%;
    height: 100%;
  }

  .tab-label {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.3px;
  }

  .badge {
    position: absolute;
    top: -4px;
    right: -8px;
    min-width: 16px;
    height: 16px;
    border-radius: var(--radius-full);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    font-weight: 700;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.6);
  }

  .order-badge {
    background: var(--arcane-ruby);
    color: #fff;
  }

  .star-badge {
    background: var(--arcane-gold);
    color: #4a2c00;
    font-size: 9px;
    animation: pulseGlow 1.8s infinite;
  }
</style>
