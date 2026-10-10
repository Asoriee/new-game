<script lang="ts">
  import { inventory, type InventoryTile, MAX_SLOT_COUNT } from '../../core/inventoryState.svelte';
  import { board } from '../../core/boardState.svelte';
  import { getItem, getConsumableEnergyReward } from '../../config/chains';
  import { economy } from '../../core/economyState.svelte';
  import { energy } from '../../core/energyState.svelte';
  import { sound } from '../../services/audio';
  import { t } from '../../services/i18n.svelte';

  let selectedSlotIndex = $state<number | null>(null);

  function handleSelectSlot(index: number) {
    if (selectedSlotIndex === index) {
      selectedSlotIndex = null;
    } else {
      selectedSlotIndex = index;
      sound.playClick();
    }
  }

  function handlePlaceOnBoard(index: number) {
    const item = inventory.removeSlotItem(index);
    if (!item) return;

    const placed = board.placeItemFromInventory(item);
    if (!placed) {
      // Put back if board is full
      inventory.storeItem(item);
    } else {
      selectedSlotIndex = null;
    }
  }

  function handleUseConsumable(index: number) {
    const item = inventory.slots[index];
    if (!item) return;

    const energyVal = getConsumableEnergyReward(item.chainId, item.level);
    if (!energyVal) return;

    inventory.removeSlotItem(index);
    energy.addBonus(energyVal);
    sound.playSparkle();
    selectedSlotIndex = null;
  }

  function handleSellItem(index: number) {
    const item = inventory.removeSlotItem(index);
    if (!item) return;

    const def = getItem(item.chainId, item.level);
    if (def) {
      economy.addCoins(def.sellValue);
      sound.playSparkle();
    }
    selectedSlotIndex = null;
  }
</script>

{#if inventory.isDrawerOpen}
  <div
    class="drawer-backdrop"
    onclick={() => inventory.closeDrawer()}
    onkeydown={(e) => e.key === 'Escape' && inventory.closeDrawer()}
    role="button"
    tabindex="0"
    aria-label={t('inventory.close')}
  ></div>

  <div class="inventory-drawer" role="dialog" aria-modal="true">
    <!-- Handle bar for mobile drawer look -->
    <div class="drag-handle" onclick={() => inventory.closeDrawer()} role="presentation"></div>

    <!-- Header -->
    <div class="drawer-header">
      <div class="header-left">
        <div class="backpack-icon">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 6V4a3 3 0 016 0v2" stroke="#f5cd79" stroke-width="2" stroke-linecap="round"/>
            <rect x="4" y="6" width="16" height="15" rx="3" fill="#352213" stroke="#f5cd79" stroke-width="1.8"/>
            <path d="M4 11h16M10 11v4m4-4v4" stroke="#f5cd79" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </div>
        <div class="header-title-box">
          <h2 class="title">{t('inventory.title')}</h2>
          <span class="slot-counter">
            {t('inventory.slots', { used: inventory.usedSlotsCount, max: inventory.slotCount })}
          </span>
        </div>
      </div>

      <button class="close-btn" onclick={() => inventory.closeDrawer()} aria-label={t('inventory.close')}>
        ✕
      </button>
    </div>

    <!-- Slots Grid -->
    <div class="slots-container">
      <div class="slots-grid">
        {#each inventory.slots as slotItem, index}
          {@const isSelected = selectedSlotIndex === index}
          {@const itemDef = slotItem ? getItem(slotItem.chainId, slotItem.level) : null}
          {@const energyReward = slotItem ? getConsumableEnergyReward(slotItem.chainId, slotItem.level) : null}

          <div
            class="slot-cell {slotItem ? 'occupied' : 'empty'} {isSelected ? 'selected' : ''}"
            onclick={() => handleSelectSlot(index)}
            onkeydown={(e) => e.key === 'Enter' && handleSelectSlot(index)}
            role="button"
            tabindex="0"
          >
            {#if slotItem && itemDef}
              <div class="slot-art" style="--slot-color: {itemDef.color}">
                {@html itemDef.svg}
                <span class="tier-badge">{slotItem.level}</span>
                {#if energyReward}
                  <span class="consumable-indicator">⚡</span>
                {/if}
              </div>
            {:else}
              <div class="empty-marker">
                <span class="empty-plus">+</span>
              </div>
            {/if}
          </div>
        {/each}

        <!-- Next Slot Unlock Card (if below max limit) -->
        {#if inventory.slotCount < MAX_SLOT_COUNT}
          <div class="slot-cell lock-cell">
            <button
              class="unlock-slot-btn"
              disabled={!inventory.canBuySlot}
              onclick={() => inventory.buyNextSlot()}
            >
              <div class="lock-icon">🔒</div>
              <div class="lock-cost">
                <span>{inventory.nextSlotCost}</span>
                <span class="coin-symbol">🪙</span>
              </div>
            </button>
          </div>
        {/if}
      </div>
    </div>

    <!-- Selected Slot Actions -->
    {#if selectedSlotIndex !== null && inventory.slots[selectedSlotIndex]}
      {@const activeSlot = inventory.slots[selectedSlotIndex]!}
      {@const activeDef = getItem(activeSlot.chainId, activeSlot.level)}
      {@const energyReward = getConsumableEnergyReward(activeSlot.chainId, activeSlot.level)}

      <div class="slot-actions-panel">
        <div class="item-preview">
          {#if activeDef}
            <div class="preview-icon">{@html activeDef.svg}</div>
            <div class="preview-text">
              <div class="preview-name">{activeDef.name} <span class="tag">Ур. {activeSlot.level}</span></div>
              <div class="preview-desc">{activeDef.desc}</div>
            </div>
          {/if}
        </div>

        <div class="action-buttons-row">
          <button
            class="action-btn place-btn"
            onclick={() => handlePlaceOnBoard(selectedSlotIndex!)}
          >
            ↗️ {t('inventory.toBoard')}
          </button>

          {#if energyReward}
            <button
              class="action-btn use-btn"
              onclick={() => handleUseConsumable(selectedSlotIndex!)}
            >
              ⚡ +{energyReward}
            </button>
          {/if}

          {#if activeDef}
            <button
              class="action-btn sell-btn"
              onclick={() => handleSellItem(selectedSlotIndex!)}
            >
              +{activeDef.sellValue} 🪙
            </button>
          {/if}
        </div>
      </div>
    {:else if inventory.usedSlotsCount === 0}
      <div class="empty-hint">
        <span>{t('inventory.emptyNotice')}</span>
      </div>
    {/if}
  </div>
{/if}

<style>
  .drawer-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(8, 6, 18, 0.65);
    backdrop-filter: blur(4px);
    z-index: 100;
    touch-action: none;
  }

  .inventory-drawer {
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translate3d(-50%, 0, 0);
    width: 100%;
    max-width: 480px;
    max-height: 80dvh;
    background: linear-gradient(180deg, #1b162f 0%, #100d1c 100%);
    border-top: 1.5px solid rgba(245, 205, 121, 0.4);
    box-shadow: 0 -12px 32px rgba(0, 0, 0, 0.6);
    border-radius: 20px 20px 0 0;
    z-index: 101;
    display: flex;
    flex-direction: column;
    padding: 10px 14px 20px 14px;
    animation: slideUp 0.24s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    touch-action: pan-y;
  }

  @keyframes slideUp {
    from {
      transform: translate3d(-50%, 100%, 0);
    }
    to {
      transform: translate3d(-50%, 0, 0);
    }
  }

  .drag-handle {
    width: 40px;
    height: 4px;
    background: rgba(255, 255, 255, 0.25);
    border-radius: 2px;
    margin: 0 auto 8px auto;
    cursor: pointer;
  }

  .drawer-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
  }

  .header-left {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .backpack-icon {
    width: 32px;
    height: 32px;
  }

  .title {
    font-size: 1.05rem;
    font-weight: 700;
    color: #f5cd79;
    margin: 0;
    text-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);
  }

  .slot-counter {
    font-size: 0.72rem;
    color: rgba(255, 255, 255, 0.65);
    font-weight: 500;
  }

  .close-btn {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.15);
    color: #f1f2f6;
    font-size: 0.95rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background 0.15s;
  }

  .close-btn:active {
    background: rgba(255, 255, 255, 0.2);
  }

  .slots-container {
    overflow-y: auto;
    max-height: 250px;
    padding-bottom: 6px;
  }

  .slots-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 8px;
  }

  .slot-cell {
    aspect-ratio: 1;
    background: rgba(255, 255, 255, 0.04);
    border: 1.5px solid rgba(255, 255, 255, 0.08);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    cursor: pointer;
    transition: transform 0.15s, border-color 0.15s;
    user-select: none;
  }

  .slot-cell:active {
    transform: scale(0.95);
  }

  .slot-cell.occupied {
    background: radial-gradient(circle, rgba(140, 122, 230, 0.15) 0%, rgba(20, 15, 38, 0.4) 100%);
    border-color: rgba(245, 205, 121, 0.25);
  }

  .slot-cell.selected {
    border-color: #f5cd79;
    box-shadow: 0 0 12px rgba(245, 205, 121, 0.5);
    transform: scale(1.04);
  }

  .slot-cell.empty {
    border-style: dashed;
    border-color: rgba(255, 255, 255, 0.15);
  }

  .empty-marker {
    color: rgba(255, 255, 255, 0.2);
    font-size: 1.2rem;
    font-weight: 300;
  }

  .slot-art {
    width: 78%;
    height: 78%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .slot-art :global(svg) {
    width: 100%;
    height: 100%;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5));
  }

  .tier-badge {
    position: absolute;
    bottom: -2px;
    right: -2px;
    background: #0f0c1d;
    border: 1px solid #f5cd79;
    color: #f5cd79;
    font-size: 0.65rem;
    font-weight: 700;
    padding: 0 4px;
    border-radius: 4px;
    line-height: 1.2;
  }

  .consumable-indicator {
    position: absolute;
    top: -3px;
    right: -3px;
    font-size: 0.68rem;
    filter: drop-shadow(0 0 4px #2ed573);
  }

  .lock-cell {
    background: rgba(0, 0, 0, 0.25);
    border: 1.5px dashed rgba(245, 205, 121, 0.3);
    padding: 2px;
  }

  .unlock-slot-btn {
    width: 100%;
    height: 100%;
    background: none;
    border: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2px;
    cursor: pointer;
    color: #f5cd79;
  }

  .unlock-slot-btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  .lock-icon {
    font-size: 0.85rem;
  }

  .lock-cost {
    display: flex;
    align-items: center;
    gap: 2px;
    font-size: 0.68rem;
    font-weight: 700;
  }

  .coin-symbol {
    font-size: 0.65rem;
  }

  .slot-actions-panel {
    margin-top: 10px;
    padding-top: 10px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .item-preview {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .preview-icon {
    width: 38px;
    height: 38px;
    flex-shrink: 0;
  }

  .preview-icon :global(svg) {
    width: 100%;
    height: 100%;
  }

  .preview-text {
    flex: 1;
    min-width: 0;
  }

  .preview-name {
    font-size: 0.85rem;
    font-weight: 700;
    color: #f1f2f6;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .tag {
    font-size: 0.68rem;
    color: #f5cd79;
    border: 1px solid rgba(245, 205, 121, 0.4);
    border-radius: 4px;
    padding: 0 4px;
  }

  .preview-desc {
    font-size: 0.72rem;
    color: rgba(255, 255, 255, 0.6);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .action-buttons-row {
    display: flex;
    gap: 8px;
  }

  .action-btn {
    flex: 1;
    padding: 8px 10px;
    border-radius: 8px;
    border: none;
    font-size: 0.78rem;
    font-weight: 700;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    transition: transform 0.1s;
  }

  .action-btn:active {
    transform: scale(0.96);
  }

  .place-btn {
    background: linear-gradient(135deg, #4834d4, #686de0);
    color: #fff;
    box-shadow: 0 2px 8px rgba(72, 52, 212, 0.4);
  }

  .use-btn {
    background: linear-gradient(135deg, #10ac84, #1dd1a1);
    color: #fff;
    box-shadow: 0 2px 8px rgba(16, 172, 132, 0.4);
  }

  .sell-btn {
    background: rgba(245, 205, 121, 0.15);
    border: 1px solid rgba(245, 205, 121, 0.5);
    color: #f5cd79;
  }

  .empty-hint {
    margin-top: 12px;
    padding: 10px;
    text-align: center;
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.45);
    line-height: 1.4;
  }
</style>
