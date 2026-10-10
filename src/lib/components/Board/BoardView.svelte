<script lang="ts">
  import {
    board,
    BOARD_COLS,
    BOARD_ROWS,
    TOTAL_CELLS,
    type BoardTile
  } from '../../core/boardState.svelte';
  import {
    CHAINS,
    GENERATORS,
    getItem,
    getConsumableEnergyReward,
    getGeneratorTier
  } from '../../config/chains';
  import { inventory } from '../../core/inventoryState.svelte';
  import InventoryDrawer from './InventoryDrawer.svelte';
  import { sound } from '../../services/audio';
  import { t } from '../../services/i18n.svelte';

  let boardElement: HTMLDivElement | null = $state(null);
  let dragTileIndex = $state<number | null>(null);
  let dragPointer = $state<{ x: number; y: number } | null>(null);
  let isPointerDragging = $state(false);
  let startPointerPos = { x: 0, y: 0 };
  let tick = $state(0);

  $effect(() => {
    const timer = setInterval(() => {
      tick += 1;
    }, 1000);
    return () => clearInterval(timer);
  });

  function formatCooldown(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  function handlePointerDown(index: number, e: PointerEvent) {
    const tile = board.cells[index];
    if (!tile) {
      if (board.selectedIndex !== null) {
        board.moveOrSwapTile(board.selectedIndex, index);
      }
      return;
    }

    startPointerPos = { x: e.clientX, y: e.clientY };
    dragTileIndex = index;
    dragPointer = { x: e.clientX, y: e.clientY };
    isPointerDragging = false;

    // Capture pointer
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }

  function handlePointerMove(e: PointerEvent) {
    if (dragTileIndex === null) return;

    const dist = Math.hypot(e.clientX - startPointerPos.x, e.clientY - startPointerPos.y);
    if (dist > 8) {
      isPointerDragging = true;
      dragPointer = { x: e.clientX, y: e.clientY };
    }
  }

  function handlePointerUp(index: number, e: PointerEvent) {
    if (dragTileIndex === null) return;

    if (!isPointerDragging) {
      // Tap interaction
      handleCellTap(index);
    } else {
      // Drag & Drop release: find drop target cell under pointer
      const targetElement = document.elementFromPoint(e.clientX, e.clientY);
      const cellElement = targetElement?.closest('[data-cell-index]');
      if (cellElement) {
        const targetIndex = Number(cellElement.getAttribute('data-cell-index'));
        if (!isNaN(targetIndex) && targetIndex !== dragTileIndex) {
          board.moveOrSwapTile(dragTileIndex, targetIndex);
        }
      }
    }

    dragTileIndex = null;
    dragPointer = null;
    isPointerDragging = false;
  }

  function handleCellTap(index: number) {
    const prevSelected = board.selectedIndex;

    if (prevSelected !== null && prevSelected !== index) {
      const srcTile = board.cells[prevSelected];
      const targetTile = board.cells[index];

      // If we tapped on a valid merge target or empty cell
      if (srcTile && (!targetTile || board.canMerge(prevSelected, index))) {
        board.moveOrSwapTile(prevSelected, index);
        return;
      }
    }

    board.selectCell(index);
  }

  function handleSell() {
    if (board.selectedIndex !== null) {
      board.sellTile(board.selectedIndex);
    }
  }

  let selectedTile = $derived(
    board.selectedIndex !== null ? board.cells[board.selectedIndex] : null
  );

  let selectedItemDef = $derived(
    selectedTile && !selectedTile.isGenerator
      ? getItem(selectedTile.chainId, selectedTile.level)
      : null
  );

  let selectedGeneratorDef = $derived(
    selectedTile && selectedTile.isGenerator && selectedTile.generatorId
      ? getGeneratorTier(selectedTile.generatorId, selectedTile.level || 1)
      : null
  );

  let selectedEnergyReward = $derived(
    selectedTile && !selectedTile.isGenerator
      ? getConsumableEnergyReward(selectedTile.chainId, selectedTile.level)
      : null
  );
</script>

<div class="board-screen">
  <!-- Top Utility Bar: Backpack Toggle -->
  <div class="board-top-bar">
    <button
      class="backpack-toggle-btn {inventory.isFull ? 'full' : ''}"
      onclick={() => inventory.openDrawer()}
      aria-label={t('inventory.title')}
    >
      <span class="backpack-icon-svg">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 6V4a3 3 0 016 0v2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <rect x="4" y="6" width="16" height="15" rx="3" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.8"/>
          <path d="M4 11h16M10 11v4m4-4v4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
      </span>
      <span class="backpack-label">{t('inventory.title')}</span>
      <span class="backpack-badge">{inventory.usedSlotsCount}/{inventory.slotCount}</span>
    </button>
  </div>

  <!-- Board Grid Container (7 columns x 9 rows) -->
  <div class="board-frame">
    <div class="board-grid" bind:this={boardElement}>
      {#each board.cells as tile, index}
        {@const isSelected = board.selectedIndex === index}
        {@const isValidMergeTarget =
          board.selectedIndex !== null &&
          board.selectedIndex !== index &&
          board.canMerge(board.selectedIndex, index)}
        {@const isDragging = dragTileIndex === index && isPointerDragging}

        <div
          class="board-cell {isSelected ? 'selected' : ''} {isValidMergeTarget ? 'merge-target' : ''}"
          data-cell-index={index}
          onpointerdown={(e) => handlePointerDown(index, e)}
          onpointermove={handlePointerMove}
          onpointerup={(e) => handlePointerUp(index, e)}
          role="button"
          tabindex="0"
        >
          {#if tile}
            <div
              class="tile-wrapper {isDragging ? 'dragging-original' : ''} {tile.isCobweb ? 'cobwebbed' : ''} {tile.isBubble ? 'bubble' : ''}"
            >
              {#if tile.isGenerator && tile.generatorId}
                {@const gen = getGeneratorTier(tile.generatorId, tile.level || 1)}
                {@const isSleeping = board.isGeneratorSleeping(tile)}
                {@const remainingSecs = isSleeping ? board.getGeneratorRemainingCooldown(tile) : 0}

                <!-- Generator Tile -->
                <div class="generator-tile {isSleeping ? 'sleeping' : ''}" style="--gen-color: {gen.color}">
                  <div class="tile-art">
                    {@html gen.svg}
                  </div>

                  {#if isSleeping}
                    <div class="gen-sleep-overlay" title={t('gen.sleeping')}>
                      <span class="sleep-icon">💤</span>
                      <span class="sleep-timer">{formatCooldown(remainingSecs)}</span>
                    </div>
                  {:else}
                    <div class="gen-tier-badge">K{tile.level || 1}</div>
                    <div class="gen-charge-dot" title="{tile.chargesRemaining ?? gen.maxCharges}/{gen.maxCharges}">
                      ⚡{tile.chargesRemaining ?? gen.maxCharges}
                    </div>
                  {/if}
                </div>
              {:else}
                {@const itemDef = getItem(tile.chainId, tile.level)}
                <!-- Standard Item Tile -->
                <div class="item-tile" style="--item-color: {itemDef?.color || '#a4b0be'}">
                  <div class="tile-art">
                    {@html itemDef?.svg || ''}
                  </div>
                  <div class="level-badge">{tile.level}</div>
                </div>
              {/if}

              <!-- Cobweb overlay -->
              {#if tile.isCobweb}
                <div class="cobweb-overlay" title={t('board.cobwebTitle')}>
                  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0l40 40M40 0L0 40M20 0v40M0 20h40" stroke="rgba(255,255,255,0.4)" stroke-width="0.8"/>
                    <circle cx="20" cy="20" r="10" stroke="rgba(255,255,255,0.4)" stroke-width="0.8" fill="none"/>
                    <circle cx="20" cy="20" r="16" stroke="rgba(255,255,255,0.3)" stroke-width="0.8" fill="none"/>
                  </svg>
                  <span class="web-icon">🕸️</span>
                </div>
              {/if}

              <!-- Bubble overlay -->
              {#if tile.isBubble}
                <div class="bubble-overlay">
                  <div class="bubble-shine"></div>
                  <button
                    class="bubble-pop-btn"
                    onclick={(e) => {
                      e.stopPropagation();
                      board.popBubble(index, false);
                    }}
                  >
                    ×
                  </button>
                </div>
              {/if}
            </div>
          {/if}

          <!-- Particle Emitter in this cell -->
          {#each board.particles.filter((p) => p.cellIndex === index) as particle (particle.id)}
            <div class="sparkle-burst" style="--p-color: {particle.color}">
              <span class="spark s1">✦</span>
              <span class="spark s2">★</span>
              <span class="spark s3">✦</span>
              <span class="spark s4">★</span>
            </div>
          {/each}
        </div>
      {/each}
    </div>
  </div>

  <!-- Dragging Floating Proxy -->
  {#if isPointerDragging && dragTileIndex !== null && dragPointer}
    {@const tile = board.cells[dragTileIndex]}
    {#if tile}
      <div
        class="drag-proxy"
        style="transform: translate3d({dragPointer.x - 28}px, {dragPointer.y - 28}px, 0)"
      >
        {#if tile.isGenerator && tile.generatorId}
          {@html getGeneratorTier(tile.generatorId, tile.level || 1).svg}
        {:else}
          {@html getItem(tile.chainId, tile.level)?.svg || ''}
        {/if}
      </div>
    {/if}
  {/if}

  <!-- Bottom Item Info Panel -->
  <div class="item-info-bar">
    {#if selectedTile && selectedTile.isGenerator && selectedTile.generatorId}
      {@const gen = getGeneratorTier(selectedTile.generatorId, selectedTile.level || 1)}
      {@const isSleeping = board.isGeneratorSleeping(selectedTile)}
      {@const remainingSecs = isSleeping ? board.getGeneratorRemainingCooldown(selectedTile) : 0}
      {@const genNameKey = `gen.${gen.id}.name`}
      <div class="info-content">
        <div class="info-icon" style="border-color: {gen.color}">
          {@html gen.svg}
        </div>
        <div class="info-meta">
          <div class="info-title">
            {t(genNameKey)}
            <span class="tier-tag">K{selectedTile.level || 1}</span>
          </div>
          <div class="info-desc">
            {#if isSleeping}
              <span class="sleep-desc">💤 {t('gen.cooldown', { time: formatCooldown(remainingSecs) })}</span>
            {:else}
              <span>{t('gen.charges', { cur: selectedTile.chargesRemaining ?? gen.maxCharges, max: gen.maxCharges })}</span>
            {/if}
          </div>
        </div>

        <div class="info-actions">
          {#if isSleeping}
            <button
              class="action-btn speedup-ad-btn"
              onclick={() => board.speedupGenerator(board.selectedIndex!, 'ad')}
              title={t('gen.wakeUpAd')}
            >
              {t('gen.wakeUpAd')}
            </button>
            <button
              class="action-btn speedup-gems-btn"
              onclick={() => board.speedupGenerator(board.selectedIndex!, 'gems')}
              title={t('gen.wakeUpGems', { cost: 5 })}
            >
              5 💎
            </button>
          {:else}
            <button
              class="action-btn spawn-btn"
              onclick={() => board.spawnFromGenerator(board.selectedIndex!)}
            >
              {t('board.spawnBtn')}
            </button>
          {/if}
        </div>
      </div>
    {:else if selectedItemDef && selectedTile}
      {@const itemNameKey = `item.${selectedItemDef.id}.name`}
      {@const itemDescKey = `item.${selectedItemDef.id}.desc`}
      <div class="info-content">
        <div class="info-icon">
          {@html selectedItemDef.svg}
        </div>
        <div class="info-meta">
          <div class="info-title">
            {t(itemNameKey)}
            <span class="tier-tag">{t('board.tier', { level: selectedTile.level })}</span>
          </div>
          <div class="info-desc">{t(itemDescKey)}</div>
        </div>
        <div class="info-actions">
          {#if !selectedTile.isCobweb && !selectedTile.isBubble}
            {#if selectedEnergyReward}
              <button
                class="action-btn energy-act-btn"
                onclick={() => board.useConsumable(board.selectedIndex!)}
                title={t('board.useConsumable', { amount: selectedEnergyReward })}
              >
                ⚡ +{selectedEnergyReward}
              </button>
            {/if}
            <button
              class="action-btn backpack-store-btn"
              disabled={inventory.isFull}
              onclick={() => board.moveToInventory(board.selectedIndex!)}
              title={inventory.isFull ? t('inventory.full') : t('inventory.toInventory')}
            >
              🎒
            </button>
            <button class="action-btn sell-btn" onclick={handleSell}>
              {t('board.sell', { amount: selectedItemDef.sellValue })}
            </button>
          {:else if selectedTile.isCobweb}
            <button
              class="action-btn unlock-btn"
              onclick={() => board.unlockCobweb(board.selectedIndex!)}
            >
              {t('board.removeWeb')}
            </button>
          {/if}
        </div>
      </div>
    {:else}
      <div class="info-placeholder">
        <span>{t('board.prompt')}</span>
      </div>
    {/if}
  </div>

  <!-- Inventory Drawer Sheet -->
  <InventoryDrawer />
</div>

<style>
  .board-screen {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
    position: relative;
    padding: 6px 6px 4px 6px;
    touch-action: none;
  }

  .board-frame {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 0;
  }

  .board-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(9, 1fr);
    gap: 4px;
    width: 100%;
    height: 100%;
    max-height: 520px;
    aspect-ratio: 7 / 9;
    padding: 6px;
    background: radial-gradient(circle at 50% 50%, rgba(20, 27, 48, 0.95), rgba(10, 14, 25, 0.98));
    border: 2px solid rgba(140, 122, 230, 0.3);
    border-radius: var(--radius-md);
    box-shadow:
      inset 0 0 20px rgba(0, 0, 0, 0.8),
      0 4px 20px rgba(0, 0, 0, 0.6);
  }

  .board-cell {
    position: relative;
    background: rgba(14, 19, 34, 0.7);
    border: 1px solid rgba(140, 122, 230, 0.15);
    border-radius: var(--radius-xs);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.4);
    touch-action: none;
    user-select: none;
    transition: border-color 0.15s ease, background-color 0.15s ease;
  }

  .board-cell.selected {
    border-color: var(--arcane-gold);
    background: rgba(245, 205, 121, 0.12);
    box-shadow: 0 0 10px rgba(245, 205, 121, 0.4), inset 0 0 8px rgba(245, 205, 121, 0.2);
  }

  .board-cell.merge-target {
    border-color: var(--arcane-cyan);
    background: rgba(0, 210, 211, 0.15);
    animation: pulseGlow 1.2s infinite;
  }

  .tile-wrapper {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2px;
    transition: transform 0.12s ease;
  }

  .tile-wrapper.dragging-original {
    opacity: 0.3;
  }

  .item-tile, .generator-tile {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .generator-tile {
    background: radial-gradient(circle, rgba(245, 205, 121, 0.15), transparent 70%);
    border-radius: var(--radius-xs);
  }

  .tile-art {
    width: 82%;
    height: 82%;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5));
  }

  :global(.tile-art svg) {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .level-badge {
    position: absolute;
    bottom: 1px;
    right: 2px;
    background: rgba(9, 12, 23, 0.85);
    border: 1px solid var(--item-color, #f5cd79);
    color: var(--item-color, #f5cd79);
    font-size: 9px;
    font-weight: 700;
    width: 14px;
    height: 14px;
    border-radius: var(--radius-full);
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
  }

  .generator-tile {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    border-radius: var(--radius-xs);
    background: radial-gradient(circle, rgba(245, 205, 121, 0.12) 0%, rgba(14, 20, 37, 0.6) 100%);
    border: 1.5px solid var(--gen-color, #f5cd79);
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.4);
    transition: transform 0.12s, filter 0.2s;
  }

  .generator-tile.sleeping {
    filter: grayscale(0.6) brightness(0.65);
    border-color: rgba(255, 255, 255, 0.25);
    background: rgba(14, 20, 37, 0.85);
  }

  .gen-sleep-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: rgba(10, 8, 20, 0.7);
    border-radius: var(--radius-xs);
    z-index: 2;
  }

  .sleep-icon {
    font-size: 11px;
    animation: gentleBob 1.5s infinite ease-in-out;
  }

  @keyframes gentleBob {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-2px); }
  }

  .sleep-timer {
    font-size: 8px;
    font-weight: 700;
    color: #f5cd79;
    font-family: monospace;
    background: rgba(0, 0, 0, 0.6);
    padding: 0 2px;
    border-radius: 3px;
    margin-top: 1px;
  }

  .gen-tier-badge {
    position: absolute;
    top: 1px;
    left: 1px;
    background: #0f0c1d;
    border: 1px solid var(--gen-color, #f5cd79);
    color: var(--gen-color, #f5cd79);
    font-size: 8px;
    font-weight: 800;
    padding: 0 3px;
    border-radius: 3px;
    line-height: 1.2;
    z-index: 2;
  }

  .gen-charge-dot {
    position: absolute;
    bottom: 1px;
    right: 1px;
    background: rgba(15, 12, 29, 0.9);
    border: 1px solid rgba(245, 205, 121, 0.4);
    color: #f5cd79;
    font-size: 8px;
    font-weight: 700;
    padding: 0 3px;
    border-radius: 3px;
    line-height: 1.2;
    z-index: 2;
  }

  .speedup-ad-btn {
    background: linear-gradient(135deg, #4834d4, #686de0);
    color: #fff;
    box-shadow: 0 0 8px rgba(72, 52, 212, 0.5);
  }

  .speedup-gems-btn {
    background: linear-gradient(135deg, #00d2d3, #54a0ff);
    color: #032128;
    font-weight: 800;
    box-shadow: 0 0 8px rgba(0, 210, 211, 0.4);
  }

  .sleep-desc {
    color: #f5cd79;
    font-weight: 600;
  }

  .cobweb-overlay {
    position: absolute;
    inset: 0;
    background: rgba(10, 14, 25, 0.45);
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
  }

  .cobweb-overlay svg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
  }

  .web-icon {
    font-size: 14px;
    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.8));
  }

  .bubble-overlay {
    position: absolute;
    inset: 0;
    border-radius: var(--radius-xs);
    border: 1.5px solid var(--arcane-gold);
    box-shadow: 0 0 12px rgba(245, 205, 121, 0.6);
    background: radial-gradient(circle, rgba(245, 205, 121, 0.2), transparent);
    animation: bubbleFloat 1.6s infinite ease-in-out;
  }

  .bubble-pop-btn {
    position: absolute;
    top: -4px;
    right: -4px;
    width: 16px;
    height: 16px;
    min-width: 16px;
    min-height: 16px;
    border-radius: var(--radius-full);
    background: var(--arcane-ruby);
    color: #fff;
    font-size: 11px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    border: none;
  }

  .drag-proxy {
    position: fixed;
    top: 0;
    left: 0;
    width: 56px;
    height: 56px;
    pointer-events: none;
    z-index: 999;
    filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.7)) drop-shadow(0 0 10px var(--arcane-gold));
  }

  :global(.drag-proxy svg) {
    width: 100%;
    height: 100%;
  }

  /* Particle Confetti / Sparks */
  .sparkle-burst {
    position: absolute;
    inset: 0;
    pointer-events: none;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 20;
  }

  .spark {
    position: absolute;
    color: var(--p-color, #f5cd79);
    font-size: 14px;
    animation: mergeConfetti 0.5s ease-out forwards;
  }

  .s1 { --tx: -20px; --ty: -25px; }
  .s2 { --tx: 20px; --ty: -25px; }
  .s3 { --tx: -20px; --ty: 15px; }
  .s4 { --tx: 20px; --ty: 15px; }

  /* Bottom Item Info Bar */
  .item-info-bar {
    height: 60px;
    width: 100%;
    background: var(--bg-glass-strong);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-sm);
    display: flex;
    align-items: center;
    padding: 6px 12px;
    margin-top: 4px;
  }

  .info-content {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .info-icon {
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(14, 20, 37, 0.9);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-xs);
    padding: 3px;
    flex-shrink: 0;
  }

  :global(.info-icon svg) {
    width: 100%;
    height: 100%;
  }

  .info-meta {
    flex: 1;
    min-width: 0;
  }

  .info-title {
    font-size: 13px;
    font-weight: 700;
    color: var(--text-main);
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .tier-tag {
    font-size: 10px;
    font-weight: 600;
    color: var(--arcane-gold);
    background: rgba(245, 205, 121, 0.15);
    padding: 1px 5px;
    border-radius: var(--radius-xs);
  }

  .info-desc {
    font-size: 11px;
    color: var(--text-muted);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .action-btn {
    padding: 6px 12px;
    font-size: 12px;
    font-weight: 700;
    border-radius: var(--radius-sm);
    min-height: 36px;
    white-space: nowrap;
  }

  .spawn-btn {
    background: linear-gradient(135deg, #f5cd79, #e58e26);
    color: #3d2300;
    box-shadow: 0 0 10px rgba(245, 205, 121, 0.4);
  }

  .energy-act-btn {
    background: linear-gradient(135deg, #10ac84, #1dd1a1);
    color: #fff;
    box-shadow: 0 0 10px rgba(16, 172, 132, 0.4);
    animation: pulseEnergy 2s infinite ease-in-out;
  }

  @keyframes pulseEnergy {
    0%, 100% { transform: scale(1); box-shadow: 0 0 8px rgba(16, 172, 132, 0.4); }
    50% { transform: scale(1.03); box-shadow: 0 0 14px rgba(29, 209, 161, 0.7); }
  }

  .backpack-store-btn {
    background: rgba(140, 122, 230, 0.2);
    border: 1px solid rgba(140, 122, 230, 0.5);
    color: #f1f2f6;
    padding: 6px 10px;
    font-size: 14px;
  }

  .backpack-store-btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  .sell-btn {
    background: rgba(245, 205, 121, 0.15);
    border: 1px solid rgba(245, 205, 121, 0.4);
    color: var(--arcane-gold);
  }

  .unlock-btn {
    background: linear-gradient(135deg, #10ac84, #00d2d3);
    color: #042921;
  }

  .board-top-bar {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0 2px 4px 2px;
    width: 100%;
  }

  .backpack-toggle-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    background: rgba(28, 22, 48, 0.85);
    border: 1.2px solid rgba(245, 205, 121, 0.35);
    border-radius: 12px;
    padding: 3px 8px;
    color: #f5cd79;
    font-size: 11px;
    font-weight: 600;
    cursor: pointer;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
    transition: transform 0.15s, border-color 0.15s, background 0.15s;
  }

  .backpack-toggle-btn:active {
    transform: scale(0.95);
  }

  .backpack-toggle-btn.full {
    border-color: #ff4757;
    color: #ff6b81;
  }

  .backpack-icon-svg {
    width: 14px;
    height: 14px;
    display: flex;
    align-items: center;
  }

  .backpack-icon-svg svg {
    width: 100%;
    height: 100%;
  }

  .backpack-badge {
    background: rgba(245, 205, 121, 0.2);
    border-radius: 6px;
    padding: 1px 5px;
    font-size: 10px;
    font-weight: 700;
  }

  .backpack-toggle-btn.full .backpack-badge {
    background: rgba(255, 71, 87, 0.25);
    color: #fff;
  }

  .info-placeholder {
    width: 100%;
    text-align: center;
    font-size: 12px;
    color: var(--text-dim);
    font-style: italic;
  }
</style>
