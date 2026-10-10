<script lang="ts">
  import { ALCHEMIST_LAB, type RoomObjectDef } from '../../config/roomConfig';
  import { metaRoom } from '../../core/metaState.svelte';
  import { economy } from '../../core/economyState.svelte';
  import { sound } from '../../services/audio';

  let selectedObject = $state<RoomObjectDef | null>(null);
  let selectedVariant = $state<'A' | 'B' | 'C'>('A');

  let winVar = $derived(metaRoom.getVariant('window'));
  let fireVar = $derived(metaRoom.getVariant('fireplace'));
  let shelfVar = $derived(metaRoom.getVariant('shelves'));
  let carpetVar = $derived(metaRoom.getVariant('carpet'));
  let deskVar = $derived(metaRoom.getVariant('desk'));
  let cauldVar = $derived(metaRoom.getVariant('cauldron'));

  function openObjectModal(obj: RoomObjectDef) {
    selectedObject = obj;
    selectedVariant = metaRoom.getVariant(obj.id) || 'A';
    sound.playClick();
  }

  function closeModal() {
    selectedObject = null;
    sound.playClick();
  }

  function handleApplyStyle() {
    if (!selectedObject) return;
    const ok = metaRoom.unlockOrChangeStyle(selectedObject, selectedVariant);
    if (ok) {
      selectedObject = null;
    }
  }
</script>

<div class="meta-room-screen">
  <!-- Room Header -->
  <div class="room-header">
    <div class="room-title-group">
      <h2>{ALCHEMIST_LAB.name}</h2>
      <span class="room-sub">{ALCHEMIST_LAB.subtitle}</span>
    </div>
    <div class="progress-pill">
      <span class="progress-val">{metaRoom.completionPercentage}%</span>
      <div class="progress-bar-bg">
        <div class="progress-bar-fill" style="width: {metaRoom.completionPercentage}%"></div>
      </div>
    </div>
  </div>

  <!-- Interactive Vector Scene Canvas -->
  <div class="room-canvas-container">
    <svg class="room-svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
      <!-- Defs: Gradients & Patterns -->
      <defs>
        <radialGradient id="labBgGlow" cx="50%" cy="30%" r="70%">
          <stop offset="0%" stop-color="#1f2744"/>
          <stop offset="60%" stop-color="#101526"/>
          <stop offset="100%" stop-color="#070a13"/>
        </radialGradient>
        <linearGradient id="wallBrick" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#1b233d"/>
          <stop offset="100%" stop-color="#101628"/>
        </linearGradient>
        <linearGradient id="floorGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#151b2e"/>
          <stop offset="100%" stop-color="#090d18"/>
        </linearGradient>
      </defs>

      <!-- Background: Walls & Gothic Arches -->
      <rect x="0" y="0" width="100" height="100" fill="url(#labBgGlow)"/>
      <path d="M0 0h100v68H0z" fill="url(#wallBrick)" opacity="0.7"/>

      <!-- Floor Perspective -->
      <polygon points="0,68 100,68 100,100 0,100" fill="url(#floorGrad)"/>
      <line x1="0" y1="68" x2="100" y2="68" stroke="#8c7ae6" stroke-width="0.5" opacity="0.4"/>
      <line x1="20" y1="68" x2="0" y2="100" stroke="#8c7ae6" stroke-width="0.3" opacity="0.3"/>
      <line x1="40" y1="68" x2="25" y2="100" stroke="#8c7ae6" stroke-width="0.3" opacity="0.3"/>
      <line x1="60" y1="68" x2="75" y2="100" stroke="#8c7ae6" stroke-width="0.3" opacity="0.3"/>
      <line x1="80" y1="68" x2="100" y2="100" stroke="#8c7ae6" stroke-width="0.3" opacity="0.3"/>

      <!-- Architectural Arch -->
      <path d="M10 68V24Q50 5 90 24v44" fill="none" stroke="#2c3a63" stroke-width="2" opacity="0.6"/>

      <!-- 1. Stained Glass Window (Object 4) -->
      <g class="room-layer window-layer">
        <path d="M38 46V22Q50 10 62 22v24z" fill="#0d1b33" stroke="#8c7ae6" stroke-width="1.2"/>
        {#if winVar === 'A'}
          <!-- Star Constellation (Gold) -->
          <circle cx="50" cy="28" r="10" fill="#f5cd79" opacity="0.25"/>
          <circle cx="50" cy="24" r="2" fill="#fff"/>
          <circle cx="44" cy="30" r="1.5" fill="#f5cd79"/>
          <circle cx="56" cy="31" r="1.5" fill="#f5cd79"/>
          <line x1="50" y1="24" x2="44" y2="30" stroke="#f5cd79" stroke-width="0.6"/>
          <line x1="50" y1="24" x2="56" y2="31" stroke="#f5cd79" stroke-width="0.6"/>
        {:else if winVar === 'B'}
          <!-- Moon Eclipse (Purple) -->
          <circle cx="50" cy="28" r="10" fill="#8c7ae6" opacity="0.3"/>
          <path d="M46 22a8 8 0 1 0 8 12 7 7 0 1 1-8-12z" fill="#a29bfe"/>
        {:else if winVar === 'C'}
          <!-- Tree of Life (Emerald) -->
          <circle cx="50" cy="28" r="10" fill="#10ac84" opacity="0.3"/>
          <path d="M50 38v-8m0 0q-4-3-6-6m6 6q4-3 6-6" stroke="#1dd1a1" stroke-width="1" stroke-linecap="round"/>
        {:else}
          <!-- Dusty Boarded Window -->
          <line x1="40" y1="24" x2="60" y2="44" stroke="#4b382a" stroke-width="1.5"/>
          <line x1="40" y1="44" x2="60" y2="24" stroke="#4b382a" stroke-width="1.5"/>
        {/if}
      </g>

      <!-- 2. Fireplace (Object 5, left wall) -->
      <g class="room-layer fireplace-layer">
        <path d="M6 72V46h24v26z" fill="#1e2538" stroke="#4b382a" stroke-width="1"/>
        <path d="M10 72v-18q8-6 16 0v18z" fill="#0d111d"/>
        {#if fireVar === 'A'}
          <!-- Warm Fire -->
          <path d="M18 70q-4-4 0-10q4 6 0 10z" fill="#ff9f43"/>
          <circle cx="18" cy="67" r="2" fill="#fed330"/>
        {:else if fireVar === 'B'}
          <!-- Dragon Lava -->
          <path d="M18 70q-4-4 0-10q4 6 0 10z" fill="#ff4757"/>
          <circle cx="18" cy="67" r="2" fill="#ffa801"/>
        {:else if fireVar === 'C'}
          <!-- Crystal Blue Flame -->
          <path d="M18 70q-4-4 0-10q4 6 0 10z" fill="#00d2d3"/>
          <circle cx="18" cy="67" r="2" fill="#fff"/>
        {:else}
          <!-- Cold Embers -->
          <circle cx="18" cy="70" r="3" fill="#2d3436"/>
        {/if}
      </g>

      <!-- 3. Shelves for Potions (Object 3, right wall) -->
      <g class="room-layer shelves-layer">
        <rect x="76" y="24" width="20" height="34" fill="#1b233a" stroke={shelfVar ? '#f5cd79' : '#3d4868'} stroke-width="0.8"/>
        <line x1="76" y1="35" x2="96" y2="35" stroke="#f5cd79" stroke-width="0.8"/>
        <line x1="76" y1="46" x2="96" y2="46" stroke="#f5cd79" stroke-width="0.8"/>
        {#if shelfVar}
          <!-- Glowing bottles -->
          <circle cx="81" cy="32" r="2" fill="#ff6b6b"/>
          <circle cx="87" cy="32" r="2" fill="#54a0ff"/>
          <circle cx="92" cy="32" r="1.8" fill="#1dd1a1"/>
          <circle cx="83" cy="43" r="2" fill="#f5cd79"/>
          <circle cx="89" cy="43" r="2.2" fill="#8c7ae6"/>
        {:else}
          <!-- Dusty spiderwebs on shelves -->
          <line x1="78" y1="26" x2="88" y2="33" stroke="rgba(255,255,255,0.2)" stroke-width="0.5"/>
        {/if}
      </g>

      <!-- 4. Carpet on floor (Object 6, center floor) -->
      <g class="room-layer carpet-layer">
        {#if carpetVar === 'A'}
          <!-- Alchemy Gold Circle -->
          <ellipse cx="50" cy="82" rx="22" ry="9" fill="#2c2214" stroke="#f5cd79" stroke-width="1.2"/>
          <circle cx="50" cy="82" r="5" fill="none" stroke="#f5cd79" stroke-width="0.8" stroke-dasharray="1 1"/>
        {:else if carpetVar === 'B'}
          <!-- Arcane Purple Seal -->
          <ellipse cx="50" cy="82" rx="22" ry="9" fill="#1c1335" stroke="#8c7ae6" stroke-width="1.2"/>
          <polygon points="50,75 58,85 42,85" fill="none" stroke="#a29bfe" stroke-width="0.6"/>
        {:else if carpetVar === 'C'}
          <!-- Lunar Flowers (Cyan) -->
          <ellipse cx="50" cy="82" rx="22" ry="9" fill="#0f2638" stroke="#00d2d3" stroke-width="1.2"/>
          <circle cx="50" cy="82" r="4" fill="#48dbfb" opacity="0.5"/>
        {:else}
          <!-- Worn floor stones -->
          <ellipse cx="50" cy="82" rx="20" ry="7" fill="#121828" opacity="0.6"/>
        {/if}
      </g>

      <!-- 5. Work Desk (Object 2, bottom right) -->
      <g class="room-layer desk-layer">
        <polygon points="68,66 94,66 96,86 64,86" fill={deskVar === 'C' ? '#dcdde1' : deskVar === 'B' ? '#1e272e' : '#4b382a'} stroke="#f5cd79" stroke-width="0.8"/>
        {#if deskVar}
          <!-- Open Grimoire and Quill -->
          <polygon points="74,70 82,71 80,77 72,76" fill="#f5cd79" opacity="0.9"/>
          <circle cx="88" cy="73" r="2.5" fill="#00d2d3"/>
        {/if}
      </g>

      <!-- 6. Alchemical Cauldron (Object 1, center-left) -->
      <g class="room-layer cauldron-layer">
        <ellipse cx="44" cy="62" rx="9" ry="3" fill="#2d3436" stroke="#f5cd79" stroke-width="1"/>
        <path d="M35 62c0 9 4 15 9 15s9-6 9-15" fill="#1e272e" stroke="#f5cd79" stroke-width="1"/>
        {#if cauldVar === 'A'}
          <!-- Bronze & Gold brew -->
          <ellipse cx="44" cy="62" rx="7.5" ry="2" fill="#e58e26"/>
          <circle cx="43" cy="62" r="1.5" fill="#fed330"/>
        {:else if cauldVar === 'B'}
          <!-- Dark Purple brew -->
          <ellipse cx="44" cy="62" rx="7.5" ry="2" fill="#8c7ae6"/>
          <circle cx="45" cy="62" r="1.5" fill="#e056fd"/>
        {:else if cauldVar === 'C'}
          <!-- Elven Light brew -->
          <ellipse cx="44" cy="62" rx="7.5" ry="2" fill="#00d2d3"/>
          <circle cx="44" cy="62" r="1.5" fill="#fff"/>
        {:else}
          <!-- Cold empty cauldron -->
          <ellipse cx="44" cy="62" rx="7.5" ry="2" fill="#121828"/>
        {/if}
      </g>

      <!-- Interactive Hotspots for All 6 Objects -->
      {#each ALCHEMIST_LAB.objects as obj}
        {@const unlocked = metaRoom.isUnlocked(obj.id)}
        <g
          class="hotspot-group {unlocked ? 'unlocked' : 'locked'}"
          transform="translate({obj.coordinates.x}, {obj.coordinates.y})"
          onclick={() => openObjectModal(obj)}
          onkeydown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              openObjectModal(obj);
            }
          }}
          role="button"
          tabindex="0"
          aria-label="{obj.name} - {unlocked ? 'Сменить стиль' : `Восстановить за ${obj.starCost} звезд`}"
        >
          <!-- Pulsing Target Badge -->
          <circle cx="0" cy="0" r="4.5" fill={unlocked ? 'rgba(140, 122, 230, 0.9)' : 'rgba(245, 205, 121, 0.95)'} stroke="#fff" stroke-width="0.8"/>
          {#if !unlocked}
            <text x="0" y="1.5" text-anchor="middle" font-size="3.5" font-weight="bold" fill="#3d2300">★</text>
          {:else}
            <text x="0" y="1.2" text-anchor="middle" font-size="3" fill="#fff">✎</text>
          {/if}
        </g>
      {/each}
    </svg>
  </div>

  <!-- Style Customization Bottom Sheet / Modal -->
  {#if selectedObject}
    {@const isUnlocked = metaRoom.isUnlocked(selectedObject.id)}
    {@const canAfford = economy.stars >= selectedObject.starCost}

    <div
      class="modal-backdrop"
      onclick={closeModal}
      onkeydown={(e) => {
        if (e.key === 'Escape') closeModal();
      }}
      tabindex="0"
      role="button"
      aria-label="Закрыть модальное окно"
    >
      <div
        class="style-sheet"
        onclick={(e) => e.stopPropagation()}
        onkeydown={(e) => e.stopPropagation()}
        role="dialog"
        tabindex="-1"
        aria-modal="true"
      >
        <div class="sheet-header">
          <div class="sheet-title-group">
            <h3>{selectedObject.name}</h3>
            <span class="sheet-sub">
              {isUnlocked ? 'Выберите стиль декора' : `Стоимость: ${selectedObject.starCost} ★`}
            </span>
          </div>
          <button class="sheet-close-btn" onclick={closeModal}>×</button>
        </div>

        <!-- 3 Variant Cards -->
        <div class="variants-row">
          {#each selectedObject.variants as variant}
            {@const isSelected = selectedVariant === variant.id}
            <button
              class="variant-card {isSelected ? 'selected' : ''}"
              onclick={() => {
                selectedVariant = variant.id;
                sound.playClick();
              }}
            >
              <div class="variant-swatch" style="--v-color: {variant.color}">
                <span class="v-letter">{variant.id}</span>
              </div>
              <div class="variant-name">{variant.name}</div>
              <div class="variant-desc">{variant.desc}</div>
            </button>
          {/each}
        </div>

        <!-- Confirm Action Button -->
        <div class="sheet-footer">
          {#if isUnlocked}
            <button class="confirm-btn apply-btn" onclick={handleApplyStyle}>
              Применить стиль
            </button>
          {:else}
            <button
              class="confirm-btn unlock-btn {canAfford ? '' : 'disabled'}"
              disabled={!canAfford}
              onclick={handleApplyStyle}
            >
              {#if canAfford}
                Восстановить за {selectedObject.starCost} ★
              {:else}
                Не хватает звезд ({economy.stars}/{selectedObject.starCost} ★)
              {/if}
            </button>
          {/if}
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  .meta-room-screen {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: relative;
    padding: 8px;
  }

  .room-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 4px 8px 8px 8px;
  }

  .room-title-group h2 {
    font-family: var(--font-magic);
    font-size: 15px;
    color: var(--arcane-gold);
    line-height: 1.1;
  }

  .room-sub {
    font-size: 11px;
    color: var(--text-muted);
  }

  .progress-pill {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 3px;
  }

  .progress-val {
    font-size: 12px;
    font-weight: 700;
    color: var(--arcane-cyan);
  }

  .progress-bar-bg {
    width: 70px;
    height: 6px;
    background: rgba(14, 20, 37, 0.9);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-full);
    overflow: hidden;
  }

  .progress-bar-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--arcane-cyan), var(--arcane-gold));
    border-radius: var(--radius-full);
    transition: width 0.3s ease;
  }

  .room-canvas-container {
    flex: 1;
    width: 100%;
    min-height: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    border-radius: var(--radius-md);
    overflow: hidden;
    border: 2px solid rgba(140, 122, 230, 0.3);
    box-shadow: inset 0 0 30px rgba(0, 0, 0, 0.9);
  }

  .room-svg {
    width: 100%;
    height: 100%;
    max-height: 560px;
  }

  .hotspot-group {
    cursor: pointer;
    transition: transform 0.15s ease;
  }

  .hotspot-group:hover, .hotspot-group:active {
    transform: scale(1.2);
  }

  .hotspot-group.locked circle {
    animation: pulseGlow 1.8s infinite;
  }

  /* Modal Backdrop & Style Sheet */
  .modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(4, 6, 12, 0.75);
    backdrop-filter: blur(4px);
    z-index: 100;
    display: flex;
    align-items: flex-end;
    justify-content: center;
  }

  .style-sheet {
    width: 100%;
    max-width: var(--app-max-width);
    background: var(--bg-glass-strong);
    border-top: 2px solid var(--arcane-gold);
    border-radius: var(--radius-lg) var(--radius-lg) 0 0;
    padding: 16px;
    box-shadow: 0 -10px 40px rgba(0, 0, 0, 0.9);
    animation: popSparkle 0.2s ease-out;
  }

  .sheet-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
  }

  .sheet-title-group h3 {
    font-family: var(--font-magic);
    font-size: 16px;
    color: var(--arcane-gold);
  }

  .sheet-sub {
    font-size: 11px;
    color: var(--text-muted);
  }

  .sheet-close-btn {
    width: 32px;
    height: 32px;
    min-width: 32px;
    min-height: 32px;
    border-radius: var(--radius-full);
    background: rgba(255, 255, 255, 0.1);
    color: var(--text-muted);
    font-size: 18px;
    font-weight: 700;
  }

  .variants-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    margin-bottom: 16px;
  }

  .variant-card {
    background: rgba(18, 25, 45, 0.8);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-sm);
    padding: 10px 6px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    text-align: center;
    transition: all 0.15s ease;
  }

  .variant-card.selected {
    border-color: var(--arcane-gold);
    background: rgba(245, 205, 121, 0.15);
    transform: translateY(-2px);
    box-shadow: 0 0 12px rgba(245, 205, 121, 0.3);
  }

  .variant-swatch {
    width: 32px;
    height: 32px;
    border-radius: var(--radius-full);
    background: radial-gradient(circle, var(--v-color), rgba(18, 25, 45, 0.8));
    border: 2px solid var(--v-color);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .v-letter {
    font-size: 13px;
    font-weight: 800;
    color: #fff;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.8);
  }

  .variant-name {
    font-size: 11px;
    font-weight: 700;
    color: var(--text-main);
  }

  .variant-desc {
    font-size: 9px;
    color: var(--text-muted);
    line-height: 1.2;
  }

  .sheet-footer {
    width: 100%;
  }

  .confirm-btn {
    width: 100%;
    padding: 12px;
    font-size: 14px;
    font-weight: 700;
    border-radius: var(--radius-md);
  }

  .apply-btn {
    background: linear-gradient(135deg, var(--arcane-purple), #574b90);
    color: #fff;
  }

  .unlock-btn {
    background: linear-gradient(135deg, #f5cd79, #e58e26);
    color: #3d2300;
    box-shadow: 0 0 16px rgba(245, 205, 121, 0.5);
  }

  .unlock-btn.disabled {
    background: #2f3640;
    color: #718093;
    box-shadow: none;
    cursor: not-allowed;
  }
</style>
