<template>
  <section class="landing-page markdown-brand">
    <header class="hero">
      <div class="hero__mesh hero__mesh--left" />
      <div class="hero__mesh hero__mesh--right" />

      <div class="hero__grid">
        <div class="hero__copy">
          <div class="hero__eyebrow">{{ heroEyebrow }}</div>
          <img :src="logoSrc" :alt="logoAlt" class="hero-logo" />
          <h1 class="hero-title">{{ productName }}</h1>

          <p class="hero-subtitle">{{ siteConfig.description }}</p>
          <p class="hero-lede">{{ heroLede }}</p>

          <div class="hero-buttons">
            <q-btn
              to="/getting-started/introduction"
              no-caps
              rounded
              unelevated
              class="hero-button hero-button--solid"
            >
              <div class="hero-button__content q-anchor--skip">
                <span class="hero-button__slot hero-button__slot--empty" aria-hidden="true" />
                <span class="hero-button__label">Get Started</span>
                <span class="hero-button__slot">
                  <q-icon :name="biArrowRightCircle" />
                </span>
              </div>
            </q-btn>

            <q-btn
              to="/other/upgrade-guide"
              no-caps
              rounded
              unelevated
              class="hero-button hero-button--ghost"
            >
              <div class="hero-button__content q-anchor--skip">
                <span class="hero-button__slot hero-button__slot--empty" aria-hidden="true" />
                <span class="hero-button__label">Upgrade Guide</span>
                <span class="hero-button__slot">
                  <q-icon name="upgrade" />
                </span>
              </div>
            </q-btn>

            <q-btn
              :href="githubTreeUrl"
              target="_blank"
              rel="noopener noreferrer"
              no-caps
              rounded
              unelevated
              class="hero-button hero-button--ghost"
            >
              <div class="hero-button__content q-anchor--skip">
                <span class="hero-button__slot">
                  <q-icon :name="fabGithub" />
                </span>
                <span class="hero-button__label">GitHub Repo</span>
                <span class="hero-button__slot hero-button__slot--empty" aria-hidden="true" />
              </div>
            </q-btn>
          </div>

          <div class="hero-pills">
            <span v-for="pill in heroPills" :key="pill" class="hero-pill">
              {{ pill }}
            </span>
          </div>
        </div>

        <div class="hero__visual">
          <div class="preview-panel">
            <div class="preview-panel__header">
              <span class="preview-panel__kicker">{{ previewKicker }}</span>
              <span class="preview-panel__note">Form-native selection</span>
            </div>

            <div class="preview-panel__body">
              <div class="preview-panel__copy">
                <h2>{{ previewTitle }}</h2>
                <p>{{ previewBody }}</p>
              </div>

              <div class="preview-stats">
                <article
                  v-for="highlight in previewHighlights"
                  :key="highlight.label"
                  class="preview-stat"
                >
                  <div class="preview-stat__value">{{ highlight.value }}</div>
                  <div class="preview-stat__label">{{ highlight.label }}</div>
                  <p class="preview-stat__body">{{ highlight.body }}</p>
                </article>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <section class="feature-section">
      <div class="section-heading">
        <div class="section-heading__eyebrow">Included</div>
        <h2 class="section-heading__title">{{ sectionTitle }}</h2>
        <p class="section-heading__text">{{ sectionText }}</p>
      </div>

      <div class="feature-grid">
        <article v-for="feature in featureCards" :key="feature.title" class="feature-card">
          <div class="feature-card__icon">
            <q-icon :name="feature.icon" />
          </div>
          <h3 class="feature-card__title">{{ feature.title }}</h3>
          <p class="feature-card__body">{{ feature.body }}</p>
        </article>
      </div>
    </section>

    <section class="resource-section">
      <article class="resource-card resource-card--primary">
        <div class="resource-card__eyebrow">Ecosystem</div>
        <h2 class="resource-card__title">
          Built in the same docs workflow as the other md-plugins sites
        </h2>
        <p class="resource-card__body">
          This site runs on Q-Press and the shared md-plugins tooling, so {{ productName }}'s docs,
          examples, and navigation fit into the same family as the sibling Quasar UI projects.
        </p>

        <div class="resource-card__actions">
          <a :href="githubRepoUrl" target="_blank" rel="noopener noreferrer" class="resource-link">
            <q-icon :name="fabGithub" />
            <span>{{ productName }} Repo</span>
          </a>

          <a
            href="https://github.com/hawkeye64/md-plugins"
            target="_blank"
            rel="noopener noreferrer"
            class="resource-link"
          >
            <q-icon name="hub" />
            <span>md-plugins</span>
          </a>

          <a
            href="https://www.npmjs.com/package/@md-plugins/quasar-app-extension-q-press"
            target="_blank"
            rel="noopener noreferrer"
            class="resource-link"
          >
            <q-icon name="description" />
            <span>Q-Press</span>
          </a>
        </div>
      </article>

      <article class="resource-card resource-card--secondary">
        <div class="resource-card__eyebrow">Need Help?</div>
        <h2 class="resource-card__title">
          Start with the intro, then use the examples as live reference
        </h2>
        <p class="resource-card__body">
          The docs are structured to move quickly from install and upgrade steps into working
          examples. If something feels off, GitHub Discussions and the repo issue tracker are the
          best places to surface it.
        </p>

        <div class="resource-list">
          <div v-for="item in supportItems" :key="item.title" class="resource-list__item">
            <div class="resource-list__title">{{ item.title }}</div>
            <div class="resource-list__body">{{ item.body }}</div>
          </div>
        </div>
      </article>
    </section>
  </section>
</template>

<script setup lang="ts">
import { fabGithub } from '@quasar/extras/fontawesome-v7'
import { biArrowRightCircle } from '@quasar/extras/bootstrap-icons'
import siteConfig from '../../siteConfig'

const productName = 'QIconPicker'
const logoSrc = '/qiconpicker-logo.svg'
const logoAlt = 'QIconPicker Logo'
const githubTreeUrl = 'https://github.com/quasarframework/quasar-ui-qiconpicker/tree/v3-beta'
const githubRepoUrl = 'https://github.com/quasarframework/quasar-ui-qiconpicker'
const heroEyebrow = 'Vue 3 + Quasar 2'
const heroLede =
  'Add searchable icon selection to forms, builders, and admin tools with a picker that understands large icon sets without pushing users into another workflow.'
const previewKicker = 'Icon Selection'
const previewTitle = 'Find the right icon without leaving your form or builder flow'
const previewBody =
  'Browse, search, and page through large icon libraries inside a Quasar-native picker that still gives you room for custom collections and slot-based presentation.'
const sectionTitle = 'Searchable icon picking for real application workflows'
const sectionText =
  'QIconPicker keeps icon selection inside your app shell with large-library browsing, custom sets, and a presentation model that fits forms, editors, and admin tooling.'

const heroPills = ['Search', 'Icon Sets', 'Pagination', 'Custom Collections', 'Slots']

const previewHighlights = [
  {
    value: 'Find',
    label: 'Search + Filter',
    body: 'Help users narrow large icon lists quickly with search terms, collection filters, and focused picker flows.',
  },
  {
    value: 'Page',
    label: 'Large Libraries',
    body: 'Page through dense icon sets without forcing the whole catalog into one oversized selection surface.',
  },
  {
    value: 'Slot',
    label: 'Custom Display',
    body: 'Shape item, selected, empty, and action states so the picker still feels native inside forms and builders.',
  },
]

const featureCards = [
  {
    icon: 'search',
    title: 'Searchable Libraries',
    body: 'Let users find the right icon quickly instead of scrolling through an endless wall of glyphs.',
  },
  {
    icon: 'grid_view',
    title: 'Large Set Browsing',
    body: 'Handle bigger icon collections with paging and a picker flow that stays manageable.',
  },
  {
    icon: 'collections_bookmark',
    title: 'Custom Collections',
    body: 'Mix built-in sets with your own curated icon groups when a product needs tighter control.',
  },
  {
    icon: 'preview',
    title: 'Preview-Friendly UI',
    body: 'Show icons clearly while keeping the selection experience anchored in your application layout.',
  },
  {
    icon: 'input',
    title: 'Form Integration',
    body: 'Drop icon selection into admin forms, content builders, and settings screens without extra glue.',
  },
  {
    icon: 'extension',
    title: 'Quasar-Native Fit',
    body: 'Keep the picker visually consistent with the rest of your Quasar components and themes.',
  },
]

const supportItems = [
  {
    title: 'Introduction First',
    body: 'Use the getting-started docs to wire icon sets, choose your filtering behavior, and fit the picker into forms or builders.',
  },
  {
    title: 'Upgrade Notes',
    body: "QIconPicker's current docs follow the Vue 3 + Quasar 2 line, so the upgrade guide should be the first stop when migrating older integrations.",
  },
  {
    title: 'Discussions + Issues',
    body: 'Questions, bugs, and API edge cases are easiest to track in the QIconPicker repo and GitHub Discussions.',
  },
]
</script>

<style lang="scss" scoped>
.landing-page {
  --landing-border: rgba(255, 255, 255, 0.14);
  --landing-border-strong: rgba(255, 255, 255, 0.22);
  --landing-surface: rgba(25, 34, 55, 0.72);
  --landing-surface-strong: rgba(33, 45, 71, 0.88);
  --landing-text-soft: rgba(228, 239, 255, 0.82);
  --landing-shadow: 0 28px 60px rgba(18, 25, 40, 0.22);
  padding: 28px clamp(16px, 2.4vw, 34px) 42px;
  color: $brand-dark-text;
}

.hero {
  position: relative;
  overflow: hidden;
  margin-bottom: 32px;
  padding: clamp(24px, 4vw, 44px);
  border: 1px solid var(--landing-border);
  border-radius: 34px;
  background:
    radial-gradient(circle at top left, rgba(190, 215, 255, 0.22), transparent 34%),
    radial-gradient(circle at 82% 20%, rgba(255, 255, 255, 0.08), transparent 20%),
    linear-gradient(145deg, rgba(26, 38, 64, 0.96), rgba(17, 25, 44, 0.96));
  box-shadow: var(--landing-shadow);
}

.hero__mesh {
  position: absolute;
  width: 240px;
  height: 240px;
  border-radius: 999px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.12), transparent 68%);
  filter: blur(10px);
  pointer-events: none;
}

.hero__mesh--left {
  top: -90px;
  left: -70px;
}

.hero__mesh--right {
  right: -40px;
  bottom: -90px;
}

.hero__grid {
  position: relative;
  z-index: 1;
  display: grid;
  gap: 24px;
  align-items: center;
  grid-template-columns: minmax(0, 1.06fr) minmax(320px, 0.94fr);
}

.hero__copy {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 14px;
}

.hero__eyebrow,
.section-heading__eyebrow,
.resource-card__eyebrow,
.preview-panel__kicker {
  display: inline-flex;
  align-items: center;
  min-height: 32px;
  padding: 0 14px;
  border: 1px solid var(--landing-border-strong);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  color: #dbe7ff;
  font-family: 'Montserrat', 'Poppins', 'Segoe UI', sans-serif;
  font-size: 0.76rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.resource-card__eyebrow {
  margin-bottom: 14px;
}

.hero-logo {
  width: clamp(84px, 11vw, 120px);
  border-radius: 28px;
  box-shadow: 0 24px 48px rgba(14, 20, 34, 0.28);
}

.hero-title {
  margin: 0;
  font-family: 'Montserrat', 'Poppins', 'Segoe UI', sans-serif;
  font-size: clamp(3.2rem, 8vw, 6rem);
  line-height: 0.95;
  font-weight: 800;
  letter-spacing: -0.05em;
  color: #f7fbff;
}

.hero-subtitle {
  max-width: 620px;
  margin: 0;
  font-family: 'Montserrat', 'Poppins', 'Segoe UI', sans-serif;
  font-size: clamp(1.15rem, 2vw, 1.45rem);
  line-height: 1.45;
  font-weight: 700;
  color: #e8f0ff;
}

.hero-lede {
  max-width: 580px;
  margin: 0;
  font-size: 1rem;
  line-height: 1.7;
  color: var(--landing-text-soft);
}

.hero-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 12px;
  padding-top: 6px;
  margin-bottom: 6px;
}

.hero-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding-top: 6px;
}

.hero-button {
  min-height: 50px;
  padding: 0 18px;
  border: 1px solid transparent;
  text-decoration: none;
  transition:
    transform 0.22s ease,
    background-color 0.22s ease,
    border-color 0.22s ease,
    color 0.22s ease,
    box-shadow 0.22s ease;
}

.hero-button:hover,
.resource-link:hover {
  transform: translateY(-1px);
}

.hero-button :deep(.q-btn__content) {
  width: 100%;
  min-width: 0;
}

.hero-button--solid {
  background: #f7fbff;
  color: #18253f;
  box-shadow: 0 18px 30px rgba(16, 24, 41, 0.18);
}

.hero-button--ghost {
  background: rgba(255, 255, 255, 0.08);
  border-color: var(--landing-border-strong);
  color: #f7fbff;
}

.hero-button__content {
  display: grid;
  grid-template-columns: 1.5rem minmax(0, 1fr) 1.5rem;
  align-items: center;
  column-gap: 12px;
  min-width: 0;
  width: 100%;
  font-family: 'Montserrat', 'Poppins', 'Segoe UI', sans-serif;
  font-size: 0.95rem;
  font-weight: 700;
}

.hero-button__slot {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
}

.hero-button__slot--empty {
  visibility: hidden;
}

.hero-button__slot :deep(.q-icon) {
  font-size: 1.3rem;
}

.hero-button__label {
  white-space: nowrap;
  text-align: center;
}

.hero-pill {
  padding: 8px 12px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.05);
  color: #dce8ff;
  font-size: 0.84rem;
  font-weight: 600;
}

.preview-panel,
.feature-card,
.resource-card {
  overflow: hidden;
  border: 1px solid var(--landing-border);
  border-radius: 24px;
  background: var(--landing-surface);
  box-shadow: var(--landing-card-shadow);
}

.preview-panel {
  width: 100%;
  padding: 20px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02)),
    rgba(22, 31, 48, 0.52);
  backdrop-filter: blur(8px);
}

.preview-panel__header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 18px;
}

.preview-panel__note,
.section-heading__text,
.feature-card__body,
.resource-card__body,
.resource-list__body {
  color: var(--landing-text-soft);
}

.preview-panel__note {
  color: var(--landing-note-text);
  font-size: 0.84rem;
  font-weight: 600;
}

.preview-panel__body {
  display: grid;
  gap: 20px;
}

.preview-panel__copy h2,
.section-heading__title,
.feature-card__title,
.resource-card__title {
  font-family: 'Montserrat', 'Poppins', 'Segoe UI', sans-serif;
  color: #f7fbff;
}

.preview-panel__copy h2 {
  margin: 0 0 10px;
  font-size: clamp(1.35rem, 2vw, 1.7rem);
  line-height: 1.2;
}

.preview-panel__copy p,
.section-heading__text,
.feature-card__body,
.resource-card__body,
.resource-list__body {
  margin: 0;
  line-height: 1.68;
}

.preview-stats {
  display: grid;
  gap: 14px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.preview-stat {
  min-height: 190px;
  padding: 18px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.08);
  box-shadow: 0 22px 38px rgba(16, 22, 36, 0.2);
}

.preview-stat__value {
  margin-bottom: 8px;
  font-family: 'Montserrat', 'Poppins', 'Segoe UI', sans-serif;
  font-size: clamp(1.95rem, 3.5vw, 2.55rem);
  line-height: 1;
  font-weight: 800;
  color: #f7fbff;
}

.preview-stat__label {
  margin-bottom: 10px;
  color: #dbe7ff;
  font-family: 'Montserrat', 'Poppins', 'Segoe UI', sans-serif;
  font-size: 0.74rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.preview-stat__body {
  margin: 0;
  color: var(--landing-text-soft);
  font-size: 0.94rem;
  line-height: 1.58;
}

.feature-section,
.resource-section {
  margin-top: 28px;
}

.section-heading {
  max-width: 760px;
  margin: 0 auto 20px;
  text-align: center;
}

.section-heading__title {
  margin: 14px 0 10px;
  font-size: clamp(2rem, 4vw, 2.8rem);
  line-height: 1.12;
  text-wrap: balance;
}

.feature-grid,
.resource-section {
  display: grid;
  gap: 18px;
}

.feature-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.resource-section {
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
}

.feature-card,
.resource-card {
  position: relative;
  padding: 20px;
}

.feature-card::before {
  content: '';
  position: absolute;
  inset: 0 auto auto 0;
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, rgba(190, 215, 255, 0.55), transparent 65%);
}

.feature-card__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 46px;
  height: 46px;
  margin-bottom: 14px;
  border-radius: 14px;
  background: rgba(190, 215, 255, 0.14);
  color: #dce8ff;
  font-size: 1.35rem;
}

.feature-card__title,
.resource-card__title {
  margin: 0 0 10px;
  font-size: 1.16rem;
  line-height: 1.3;
}

.resource-card--primary {
  background:
    radial-gradient(circle at top right, rgba(190, 215, 255, 0.16), transparent 30%),
    var(--landing-surface-strong);
}

.resource-card__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 16px;
}

.resource-link {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  min-height: 44px;
  padding: 0 16px;
  border: 1px solid var(--landing-border-strong);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.05);
  color: #e8f0ff;
  text-decoration: none;
  transition:
    transform 0.22s ease,
    border-color 0.22s ease,
    background-color 0.22s ease;
}

.resource-list {
  display: grid;
  gap: 0;
  margin-top: 16px;
}

.resource-list__item {
  padding: 12px 0;
  border-top: 1px solid var(--landing-resource-item-border);
}

.resource-list__item:first-child {
  padding-top: 0;
  border-top: 0;
}

.resource-list__title {
  margin-bottom: 6px;
  font-family: 'Montserrat', 'Poppins', 'Segoe UI', sans-serif;
  font-size: 0.96rem;
  font-weight: 700;
  color: #dce8ff;
}

.feature-card__body,
.resource-card__body {
  color: var(--landing-body-text);
  font-size: 0.97rem;
}

.resource-list__body {
  color: var(--landing-body-text);
  font-size: 0.93rem;
  line-height: 1.55;
}

@media (max-width: 1100px) {
  .hero__grid,
  .resource-section,
  .feature-grid {
    grid-template-columns: 1fr;
  }

  .preview-stats {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 700px) {
  .landing-page {
    padding: 18px 12px 30px;
  }

  .hero {
    padding: 24px 18px;
    border-radius: 24px;
  }

  .hero__copy {
    align-items: stretch;
  }

  .hero-buttons,
  .resource-card__actions {
    flex-direction: column;
  }

  .hero-button,
  .resource-link {
    justify-content: center;
  }

  .preview-stat {
    min-height: 0;
  }

  .feature-card,
  .resource-card {
    padding: 18px;
    border-radius: 20px;
  }
}

/* codex-theme-override:start */
.landing-page {
  --landing-page-text: #{$brand-light-text};
  --landing-heading: #{$brand-light-text};
  --landing-body-text: #{rgba($brand-light-text, 0.84)};
  --landing-note-text: #{rgba($brand-light-text, 0.66)};
  --landing-border: #{rgba($brand-secondary, 0.16)};
  --landing-border-strong: #{rgba($brand-secondary, 0.24)};
  --landing-surface: #{rgba($brand-light, 0.78)};
  --landing-surface-strong: #{rgba($brand-light, 0.92)};
  --landing-text-soft: #{rgba($brand-light-text, 0.78)};
  --landing-shadow: 0 28px 60px #{rgba($brand-primary, 0.14)};
  --landing-card-shadow: 0 16px 34px #{rgba($brand-secondary, 0.12)};
  --landing-chip-bg: #{rgba($brand-light, 0.52)};
  --landing-chip-text: #{$brand-primary};
  --landing-solid-bg: #{$brand-primary};
  --landing-solid-text: #{$brand-light};
  --landing-solid-shadow: 0 18px 30px #{rgba($brand-primary, 0.24)};
  --landing-ghost-bg: #{rgba($brand-light, 0.46)};
  --landing-ghost-text: #{$brand-light-text};
  --landing-pill-border: #{rgba($brand-secondary, 0.14)};
  --landing-pill-bg: #{rgba($brand-light, 0.44)};
  --landing-pill-text: #{$brand-primary};
  --landing-panel-gradient-top: #{rgba($brand-light, 0.7)};
  --landing-panel-gradient-bottom: #{rgba($brand-light, 0.22)};
  --landing-panel-bg: #{rgba($brand-light-bg, 0.88)};
  --landing-preview-card-border: #{rgba($brand-secondary, 0.18)};
  --landing-preview-card-bg: #{rgba($brand-light, 0.82)};
  --landing-preview-card-shadow: 0 22px 38px #{rgba($brand-secondary, 0.14)};
  --landing-accent-line: #{rgba($brand-primary, 0.4)};
  --landing-icon-bg: #{rgba($brand-primary, 0.1)};
  --landing-icon-color: #{$brand-primary};
  --landing-spot-accent: #{rgba($brand-primary, 0.14)};
  --landing-resource-link-bg: #{rgba($brand-light, 0.48)};
  --landing-resource-link-text: #{$brand-light-text};
  --landing-resource-item-border: #{rgba($brand-secondary, 0.1)};
  --landing-resource-item-bg: #{rgba($brand-light, 0.42)};
  --landing-accent-text: #{$brand-primary};
  --landing-mesh-color: #{rgba($brand-primary, 0.16)};
  --landing-hero-glow-1: #{rgba($brand-primary, 0.18)};
  --landing-hero-glow-2: #{rgba($brand-secondary, 0.12)};
  --landing-hero-start: #{rgba($brand-light, 0.96)};
  --landing-hero-end: #{rgba($brand-light-bg, 0.96)};
  color: var(--landing-page-text);
}

body.body--dark .landing-page {
  --landing-page-text: #{$brand-dark-text};
  --landing-heading: #{$brand-dark-text};
  --landing-body-text: #{rgba($brand-dark-text, 0.8)};
  --landing-note-text: #{rgba($brand-dark-text, 0.64)};
  --landing-border: #{rgba($brand-light, 0.12)};
  --landing-border-strong: #{rgba($brand-light, 0.2)};
  --landing-surface: #{rgba($dark-pill, 0.74)};
  --landing-surface-strong: #{rgba($dark-pill, 0.88)};
  --landing-text-soft: #{rgba($brand-dark-text, 0.82)};
  --landing-shadow: 0 28px 60px #{rgba($brand-dark-bg, 0.28)};
  --landing-card-shadow: 0 16px 34px #{rgba($brand-dark-bg, 0.24)};
  --landing-chip-bg: #{rgba($brand-light, 0.08)};
  --landing-chip-text: #{$brand-primary};
  --landing-solid-bg: #{$brand-light};
  --landing-solid-text: #{$brand-dark-bg};
  --landing-solid-shadow: 0 18px 30px #{rgba($brand-dark-bg, 0.28)};
  --landing-ghost-bg: #{rgba($brand-light, 0.08)};
  --landing-ghost-text: #{$brand-dark-text};
  --landing-pill-border: #{rgba($brand-light, 0.12)};
  --landing-pill-bg: #{rgba($brand-light, 0.05)};
  --landing-pill-text: #{$brand-primary};
  --landing-panel-gradient-top: #{rgba($brand-light, 0.08)};
  --landing-panel-gradient-bottom: #{rgba($brand-light, 0.02)};
  --landing-panel-bg: #{rgba($brand-dark-bg, 0.56)};
  --landing-preview-card-border: #{rgba($brand-light, 0.12)};
  --landing-preview-card-bg: #{rgba($brand-dark-bg, 0.78)};
  --landing-preview-card-shadow: 0 22px 38px #{rgba($brand-dark-bg, 0.28)};
  --landing-accent-line: #{rgba($brand-primary, 0.55)};
  --landing-icon-bg: #{rgba($brand-primary, 0.16)};
  --landing-icon-color: #{$brand-primary};
  --landing-spot-accent: #{rgba($brand-primary, 0.18)};
  --landing-resource-link-bg: #{rgba($brand-light, 0.06)};
  --landing-resource-link-text: #{$brand-dark-text};
  --landing-resource-item-border: #{rgba($brand-light, 0.08)};
  --landing-resource-item-bg: #{rgba($brand-light, 0.04)};
  --landing-accent-text: #{$brand-primary};
  --landing-mesh-color: #{rgba($brand-light, 0.12)};
  --landing-hero-glow-1: #{rgba($brand-primary, 0.22)};
  --landing-hero-glow-2: #{rgba($brand-light, 0.08)};
  --landing-hero-start: #{rgba($brand-dark-bg, 0.96)};
  --landing-hero-end: #{rgba($dark-pill, 0.96)};
}

.hero {
  background:
    radial-gradient(circle at top left, var(--landing-hero-glow-1), transparent 34%),
    radial-gradient(circle at 82% 20%, var(--landing-hero-glow-2), transparent 20%),
    linear-gradient(145deg, var(--landing-hero-start), var(--landing-hero-end));
  box-shadow: var(--landing-shadow);
}

.hero__mesh {
  background: radial-gradient(circle, var(--landing-mesh-color), transparent 68%);
}

.hero__eyebrow,
.section-heading__eyebrow,
.resource-card__eyebrow,
.preview-panel__kicker {
  border-color: var(--landing-border-strong);
  background: var(--landing-chip-bg);
  color: var(--landing-chip-text);
}

.hero-title,
.hero-subtitle,
.preview-panel__copy h2,
.section-heading__title,
.feature-card__title,
.resource-card__title {
  color: var(--landing-heading);
}

.hero-button--solid {
  background: var(--landing-solid-bg);
  color: var(--landing-solid-text);
  box-shadow: var(--landing-solid-shadow);
}

.hero-button--ghost {
  background: var(--landing-ghost-bg);
  border-color: var(--landing-border-strong);
  color: var(--landing-ghost-text);
}

.hero-pill {
  border-color: var(--landing-pill-border);
  background: var(--landing-pill-bg);
  color: var(--landing-pill-text);
}

.preview-panel,
.feature-card,
.resource-card {
  background: var(--landing-surface);
  box-shadow: var(--landing-card-shadow);
}

.preview-panel {
  background:
    linear-gradient(
      180deg,
      var(--landing-panel-gradient-top),
      var(--landing-panel-gradient-bottom)
    ),
    var(--landing-panel-bg);
}

.preview-stat {
  border-color: var(--landing-preview-card-border);
  background: var(--landing-preview-card-bg);
  box-shadow: var(--landing-preview-card-shadow);
}

.preview-stat__value {
  color: var(--landing-heading);
}

.preview-stat__label {
  color: var(--landing-accent-text);
}

.feature-card::before {
  background: linear-gradient(90deg, var(--landing-accent-line), transparent 65%);
}

.feature-card__icon {
  background: var(--landing-icon-bg);
  color: var(--landing-icon-color);
}

.resource-card--primary {
  background:
    radial-gradient(circle at top right, var(--landing-spot-accent), transparent 30%),
    var(--landing-surface-strong);
}

.resource-link {
  border-color: var(--landing-border-strong);
  background: var(--landing-resource-link-bg);
  color: var(--landing-resource-link-text);
}

.resource-list__item {
  border-color: var(--landing-resource-item-border);
}

.resource-list__title {
  color: var(--landing-accent-text);
}
/* codex-theme-override:end */

/* qpress-theme-bridge:start */
.landing-page,
body.body--dark .landing-page {
  --landing-page-text: var(--qpress-text-primary);
  --landing-heading: var(--qpress-text-primary);
  --landing-body-text: var(--qpress-text-body);
  --landing-note-text: var(--qpress-text-muted);
  --landing-border: var(--qpress-border-subtle);
  --landing-border-strong: var(--qpress-border-strong);
  --landing-surface: var(--qpress-surface-raised);
  --landing-surface-strong: var(--qpress-surface-raised-strong);
  --landing-text-soft: var(--qpress-text-soft);
  --landing-shadow: var(--qpress-shadow-large);
  --landing-card-shadow: var(--qpress-card-shadow);
  --landing-chip-bg: var(--qpress-chip-bg);
  --landing-chip-text: var(--qpress-chip-text);
  --landing-solid-bg: var(--qpress-action-solid-bg);
  --landing-solid-text: var(--qpress-action-solid-text);
  --landing-solid-shadow: var(--qpress-action-solid-shadow);
  --landing-ghost-bg: var(--qpress-action-ghost-bg);
  --landing-ghost-text: var(--qpress-action-ghost-text);
  --landing-pill-border: var(--qpress-pill-border);
  --landing-pill-bg: var(--qpress-pill-bg);
  --landing-pill-text: var(--qpress-pill-text);
  --landing-panel-gradient-top: var(--qpress-panel-gradient-top);
  --landing-panel-gradient-bottom: var(--qpress-panel-gradient-bottom);
  --landing-panel-bg: var(--qpress-surface-panel);
  --landing-preview-card-border: var(--qpress-tile-border);
  --landing-preview-card-bg: var(--qpress-tile-bg);
  --landing-preview-card-shadow: var(--qpress-card-shadow);
  --landing-stat-border: var(--qpress-highlight-border);
  --landing-stat-bg: var(--qpress-highlight-bg);
  --landing-accent-line: var(--qpress-accent-line);
  --landing-icon-bg: var(--qpress-icon-bg);
  --landing-icon-color: var(--qpress-icon-color);
  --landing-menu-color: var(--qpress-color-primary);
  --landing-menu-contrast: var(--qpress-action-solid-text);
  --landing-meta-text: var(--qpress-meta-text);
  --landing-showcase-image-border: var(--qpress-tile-border);
  --landing-showcase-image-bg: var(--qpress-tile-bg);
  --landing-spot-accent: var(--qpress-spot-accent);
  --landing-resource-link-bg: var(--qpress-resource-link-bg);
  --landing-resource-link-text: var(--qpress-resource-link-text);
  --landing-resource-item-border: var(--qpress-resource-item-border);
  --landing-resource-item-bg: var(--qpress-resource-item-bg);
  --landing-accent-text: var(--qpress-color-primary);
  --landing-page-overlay-1: var(--qpress-hero-glow-primary);
  --landing-page-overlay-2: var(--qpress-hero-glow-secondary);
  --landing-page-overlay-start: var(--qpress-hero-start);
  --landing-page-overlay-end: var(--qpress-hero-end);
  --landing-mesh-color: var(--qpress-mesh-color);
  --landing-hero-glow-1: var(--qpress-hero-glow-primary);
  --landing-hero-glow-2: var(--qpress-hero-glow-secondary);
  --landing-hero-start: var(--qpress-hero-start);
  --landing-hero-end: var(--qpress-hero-end);
}
/* qpress-theme-bridge:end */
</style>
