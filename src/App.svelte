<script lang="ts">
  import TopBar from './lib/components/UI/TopBar.svelte';
  import BottomNav, { type ScreenType } from './lib/components/UI/BottomNav.svelte';
  import BoardView from './lib/components/Board/BoardView.svelte';
  import MetaRoomView from './lib/components/MetaRoom/MetaRoomView.svelte';
  import OrdersView from './lib/components/Orders/OrdersView.svelte';
  import ShopModal from './lib/components/Shop/ShopModal.svelte';
  import { t } from './lib/services/i18n.svelte';

  let activeScreen = $state<ScreenType>('board');

  $effect(() => {
    if (typeof document !== 'undefined') {
      document.title = t('app.title');
    }
  });
</script>

<div class="game-viewport">
  <!-- Status Bar (Energy, Currencies, Sound Toggle) -->
  <TopBar onOpenShop={() => activeScreen = 'shop'} />

  <!-- Main Viewport Area -->
  <main class="screen-content">
    {#if activeScreen === 'board'}
      <BoardView />
    {:else if activeScreen === 'room'}
      <MetaRoomView />
    {:else if activeScreen === 'orders'}
      <OrdersView />
    {:else if activeScreen === 'shop'}
      <ShopModal onClose={() => activeScreen = 'board'} />
    {/if}
  </main>

  <!-- Bottom Navigation Tabs -->
  <BottomNav
    {activeScreen}
    onSelectScreen={(screen) => activeScreen = screen}
  />
</div>
