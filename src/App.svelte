<script lang="ts">
  import TopBar from './lib/components/UI/TopBar.svelte';
  import BottomNav, { type ScreenType } from './lib/components/UI/BottomNav.svelte';
  import BoardView from './lib/components/Board/BoardView.svelte';
  import MetaRoomView from './lib/components/MetaRoom/MetaRoomView.svelte';
  import OrdersView from './lib/components/Orders/OrdersView.svelte';
  import ShopModal from './lib/components/Shop/ShopModal.svelte';

  let activeScreen = $state<ScreenType>('board');
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
