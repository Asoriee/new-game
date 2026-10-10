<script lang="ts">
  import { orders } from '../../core/ordersState.svelte';
  import { getItem } from '../../config/chains';
  import { sound } from '../../services/audio';
  import { t } from '../../services/i18n.svelte';

  function handleComplete(orderId: string) {
    orders.completeOrder(orderId);
  }

  function getCharacterKey(name: string): 'corvus' | 'lucian' | 'mira' {
    if (name.includes('Корвус') || name.includes('Corvus')) return 'corvus';
    if (name.includes('Люциан') || name.includes('Lucian')) return 'lucian';
    return 'mira';
  }

  function getOrderDialogue(order: (typeof orders.orders)[0]): string {
    const key = getCharacterKey(order.characterName);
    if (order.id === 'ord_1' || order.id === 'ord_2' || order.id === 'ord_3') {
      return t(`char.${key}.dialogue1`);
    }
    return t('orders.genericDialogue');
  }
</script>

<div class="orders-screen">
  <div class="orders-header">
    <h2>{t('orders.title')}</h2>
    <span class="orders-sub">{t('orders.subtitle')}</span>
  </div>

  <div class="orders-list">
    {#each orders.orders as order (order.id)}
      {@const canComplete = orders.canCompleteOrder(order)}
      {@const charKey = getCharacterKey(order.characterName)}

      <div class="order-card {canComplete ? 'ready' : ''}">
        <!-- Character Info Header -->
        <div class="char-header">
          <div class="char-avatar">
            {@html order.avatarSvg}
          </div>
          <div class="char-meta">
            <div class="char-name">{t(`char.${charKey}.name`)}</div>
            <div class="char-role">{t(`char.${charKey}.role`)}</div>
          </div>
        </div>

        <!-- Dialogue Bubble -->
        <div class="dialogue-box">
          <p>«{getOrderDialogue(order)}»</p>
        </div>

        <!-- Required Items List -->
        <div class="requirements-box">
          <span class="req-label">{t('orders.required')}</span>
          <div class="items-row">
            {#each order.requirements as req}
              {@const itemDef = getItem(req.chainId, req.level)}
              {@const hasItem = orders.checkRequirementMet(req.chainId, req.level)}

              <div class="req-item-pill {hasItem ? 'has-item' : 'missing'}">
                <div class="req-icon">
                  {@html itemDef?.svg || ''}
                </div>
                <div class="req-info">
                  <span class="req-name">{itemDef ? t(`item.${itemDef.id}.name`) : ''}</span>
                  <span class="req-level">{t('board.tier', { level: req.level })}</span>
                </div>
                <span class="req-status-icon">{hasItem ? '✓' : '…'}</span>
              </div>
            {/each}
          </div>
        </div>

        <!-- Reward & Action Footer -->
        <div class="order-footer">
          <div class="rewards-group">
            <span class="reward-tag coins">+{order.rewardCoins} 🪙</span>
            <span class="reward-tag stars">+{order.rewardStars} ★</span>
            <span class="reward-tag xp">+{order.rewardXp} XP</span>
          </div>

          <button
            class="complete-btn {canComplete ? 'pulse-btn' : 'disabled'}"
            disabled={!canComplete}
            onclick={() => handleComplete(order.id)}
          >
            {canComplete ? t('orders.complete') : t('orders.inProgress')}
          </button>
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  .orders-screen {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    padding: 12px 10px;
    gap: 12px;
  }

  .orders-header {
    text-align: center;
    padding-bottom: 4px;
  }

  .orders-header h2 {
    font-family: var(--font-magic);
    font-size: 16px;
    color: var(--arcane-gold);
  }

  .orders-sub {
    font-size: 11px;
    color: var(--text-muted);
  }

  .orders-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding-bottom: 20px;
  }

  .order-card {
    background: var(--bg-glass-strong);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-md);
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    box-shadow: var(--shadow-sm);
    transition: all 0.2s ease;
  }

  .order-card.ready {
    border-color: var(--arcane-gold);
    box-shadow: 0 0 16px rgba(245, 205, 121, 0.25);
  }

  .char-header {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .char-avatar {
    width: 40px;
    height: 40px;
    flex-shrink: 0;
  }

  :global(.char-avatar svg) {
    width: 100%;
    height: 100%;
  }

  .char-name {
    font-size: 14px;
    font-weight: 700;
    color: var(--text-main);
  }

  .char-role {
    font-size: 10px;
    color: var(--arcane-cyan);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .dialogue-box {
    background: rgba(14, 20, 37, 0.8);
    border-left: 3px solid var(--arcane-purple);
    padding: 6px 10px;
    border-radius: 0 var(--radius-xs) var(--radius-xs) 0;
  }

  .dialogue-box p {
    font-size: 12px;
    color: var(--text-muted);
    font-style: italic;
    line-height: 1.3;
  }

  .requirements-box {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .req-label {
    font-size: 11px;
    font-weight: 600;
    color: var(--text-dim);
  }

  .items-row {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .req-item-pill {
    display: flex;
    align-items: center;
    gap: 6px;
    background: rgba(18, 25, 45, 0.9);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-sm);
    padding: 4px 8px;
    flex: 1;
    min-width: 120px;
  }

  .req-item-pill.has-item {
    border-color: var(--arcane-emerald);
    background: rgba(16, 172, 132, 0.1);
  }

  .req-item-pill.missing {
    opacity: 0.7;
  }

  .req-icon {
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  :global(.req-icon svg) {
    width: 100%;
    height: 100%;
  }

  .req-info {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 0;
  }

  .req-name {
    font-size: 11px;
    font-weight: 600;
    color: var(--text-main);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .req-level {
    font-size: 9px;
    color: var(--text-dim);
  }

  .req-status-icon {
    font-size: 12px;
    font-weight: 700;
  }

  .has-item .req-status-icon {
    color: var(--arcane-emerald);
  }

  .missing .req-status-icon {
    color: var(--text-dim);
  }

  .order-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding-top: 4px;
    border-top: 1px solid rgba(140, 122, 230, 0.15);
  }

  .rewards-group {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .reward-tag {
    font-size: 11px;
    font-weight: 700;
    padding: 2px 6px;
    border-radius: var(--radius-xs);
    background: rgba(18, 25, 45, 0.8);
  }

  .reward-tag.coins {
    color: var(--arcane-gold);
  }

  .reward-tag.stars {
    color: var(--arcane-amber);
    border: 1px solid rgba(245, 205, 121, 0.4);
  }

  .reward-tag.xp {
    color: var(--arcane-cyan);
  }

  .complete-btn {
    padding: 8px 14px;
    font-size: 12px;
    font-weight: 700;
    border-radius: var(--radius-sm);
    min-height: 38px;
  }

  .complete-btn.pulse-btn {
    background: linear-gradient(135deg, var(--arcane-gold), var(--arcane-gold-dark));
    color: #3d2300;
    animation: pulseGlow 1.5s infinite;
  }

  .complete-btn.disabled {
    background: #1f273d;
    color: var(--text-dim);
    cursor: not-allowed;
  }
</style>
