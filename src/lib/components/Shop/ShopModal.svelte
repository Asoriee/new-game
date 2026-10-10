<script lang="ts">
  import { energy } from '../../core/energyState.svelte';
  import { economy } from '../../core/economyState.svelte';
  import { sound } from '../../services/audio';
  import { t } from '../../services/i18n.svelte';

  interface Props {
    onClose?: () => void;
  }

  let { onClose }: Props = $props();

  let rewardedClaimCooldown = $state(false);

  function handleClaimRewardedEnergy() {
    if (rewardedClaimCooldown) return;
    rewardedClaimCooldown = true;
    energy.add(25);
    sound.playSparkle();

    setTimeout(() => {
      rewardedClaimCooldown = false;
    }, 3000);
  }

  function handleBuyEnergyForGems() {
    if (economy.spendGems(10)) {
      energy.add(50);
      sound.playSparkle();
    } else {
      sound.playClick();
    }
  }

  function handleBuyCoinsForGems() {
    if (economy.spendGems(15)) {
      economy.addCoins(300);
      sound.playSparkle();
    } else {
      sound.playClick();
    }
  }
</script>

<div class="shop-screen">
  <div class="shop-header">
    <h2>{t('shop.title')}</h2>
    <span class="shop-sub">{t('shop.subtitle')}</span>
  </div>

  <div class="shop-content">
    <!-- Starter Pack Banner -->
    <div class="offer-banner">
      <div class="banner-badge">{t('shop.hitBadge')}</div>
      <div class="banner-body">
        <div class="banner-icon">✨</div>
        <div class="banner-text">
          <h3>{t('shop.starterPackTitle')}</h3>
          <p>{t('shop.starterPackDesc')}</p>
        </div>
      </div>
      <button class="buy-pack-btn" onclick={() => {
        economy.addGems(50);
        energy.add(150);
        sound.playFanfare();
      }}>
        {t('shop.starterPackPrice')}
      </button>
    </div>

    <!-- Section: Energy -->
    <div class="shop-section">
      <h3 class="section-title">{t('shop.energySection')}</h3>
      <div class="cards-grid">
        <!-- Rewarded Video Energy -->
        <div class="shop-card rewarded-card">
          <div class="card-icon">🎬</div>
          <div class="card-info">
            <div class="card-title">{t('shop.rewardedTitle')}</div>
            <div class="card-desc">{t('shop.rewardedDesc')}</div>
          </div>
          <button
            class="card-action-btn rewarded-btn"
            disabled={rewardedClaimCooldown}
            onclick={handleClaimRewardedEnergy}
          >
            {rewardedClaimCooldown ? t('shop.rewardedClaimed') : t('shop.rewardedBtn')}
          </button>
        </div>

        <!-- Gems for Energy -->
        <div class="shop-card">
          <div class="card-icon">⚡</div>
          <div class="card-info">
            <div class="card-title">{t('shop.gemEnergyTitle')}</div>
            <div class="card-desc">{t('shop.gemEnergyDesc')}</div>
          </div>
          <button class="card-action-btn gem-btn" onclick={handleBuyEnergyForGems}>
            10 💎
          </button>
        </div>
      </div>
    </div>

    <!-- Section: Gold Coins -->
    <div class="shop-section">
      <h3 class="section-title">{t('shop.coinsSection')}</h3>
      <div class="cards-grid">
        <div class="shop-card">
          <div class="card-icon">💰</div>
          <div class="card-info">
            <div class="card-title">{t('shop.coinsPackTitle')}</div>
            <div class="card-desc">{t('shop.coinsPackDesc')}</div>
          </div>
          <button class="card-action-btn gem-btn" onclick={handleBuyCoinsForGems}>
            15 💎
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .shop-screen {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    padding: 12px 10px;
    gap: 14px;
  }

  .shop-header {
    text-align: center;
  }

  .shop-header h2 {
    font-family: var(--font-magic);
    font-size: 16px;
    color: var(--arcane-gold);
  }

  .shop-sub {
    font-size: 11px;
    color: var(--text-muted);
  }

  .shop-content {
    display: flex;
    flex-direction: column;
    gap: 14px;
    padding-bottom: 20px;
  }

  .offer-banner {
    position: relative;
    background: linear-gradient(135deg, rgba(87, 75, 144, 0.9), rgba(27, 20, 100, 0.9));
    border: 1.5px solid var(--arcane-gold);
    border-radius: var(--radius-md);
    padding: 14px 12px 12px 12px;
    box-shadow: 0 0 20px rgba(140, 122, 230, 0.3);
  }

  .banner-badge {
    position: absolute;
    top: -8px;
    left: 12px;
    background: var(--arcane-gold);
    color: #4a2c00;
    font-size: 9px;
    font-weight: 800;
    padding: 2px 8px;
    border-radius: var(--radius-xs);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
  }

  .banner-body {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
  }

  .banner-icon {
    font-size: 28px;
  }

  .banner-text h3 {
    font-family: var(--font-magic);
    font-size: 13px;
    color: #fff;
  }

  .banner-text p {
    font-size: 10px;
    color: var(--arcane-gold);
  }

  .buy-pack-btn {
    width: 100%;
    padding: 10px;
    font-size: 13px;
    font-weight: 700;
    border-radius: var(--radius-sm);
    background: linear-gradient(135deg, var(--arcane-gold), var(--arcane-gold-dark));
    color: #3d2300;
    box-shadow: 0 0 12px rgba(245, 205, 121, 0.4);
  }

  .shop-section {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .section-title {
    font-size: 12px;
    font-weight: 700;
    color: var(--text-main);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .cards-grid {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .shop-card {
    background: var(--bg-glass-strong);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-sm);
    padding: 10px 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
  }

  .card-icon {
    font-size: 24px;
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(18, 25, 45, 0.8);
    border-radius: var(--radius-xs);
    flex-shrink: 0;
  }

  .card-info {
    flex: 1;
    min-width: 0;
  }

  .card-title {
    font-size: 13px;
    font-weight: 700;
    color: var(--text-main);
  }

  .card-desc {
    font-size: 10px;
    color: var(--text-muted);
  }

  .card-action-btn {
    padding: 6px 14px;
    font-size: 12px;
    font-weight: 700;
    border-radius: var(--radius-sm);
    min-height: 36px;
    white-space: nowrap;
  }

  .rewarded-btn {
    background: linear-gradient(135deg, var(--arcane-emerald), #00d2d3);
    color: #022c22;
  }

  .gem-btn {
    background: rgba(0, 210, 211, 0.15);
    border: 1px solid var(--arcane-cyan);
    color: var(--arcane-cyan);
  }
</style>
