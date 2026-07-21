# QIconPicker

![@quasar/quasar-ui-qiconpicker](https://img.shields.io/npm/v/@quasar/quasar-ui-qiconpicker?label=@quasar/quasar-ui-qiconpicker)
![@quasar/quasar-app-extension-qiconpicker](https://img.shields.io/npm/v/@quasar/quasar-app-extension-qiconpicker?label=@quasar/quasar-app-extension-qiconpicker)
[![Netlify Status](https://api.netlify.com/api/v1/badges/fabea9b0-8350-44a6-bf07-197824997a61/deploy-status)](https://app.netlify.com/projects/qiconpicker/deploys)
[![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/quasarframework/quasar-ui-qiconpicker.svg)](https://github.com/quasarframework/quasar-ui-qiconpicker)
[![GitHub repo size in bytes](https://img.shields.io/github/repo-size/quasarframework/quasar-ui-qiconpicker)](https://github.com/quasarframework/quasar-ui-qiconpicker)
[![npm](https://img.shields.io/npm/dt/@quasar/quasar-app-extension-qiconpicker)](https://www.npmjs.com/package/@quasar/quasar-app-extension-qiconpicker)

<span class="badge-github-sponsors"><a href="https://github.com/sponsors/hawkeye64" title="Sponsor this project on GitHub"><img src="https://img.shields.io/badge/github-sponsors-ea4aaa.svg?logo=githubsponsors&logoColor=white" alt="GitHub Sponsors button" /></a></span>
<span class="badge-paypal"><a href="https://paypal.me/hawkeye64" title="Donate to this project using Paypal"><img src="https://img.shields.io/badge/paypal-donate-yellow.svg" alt="PayPal donate button" /></a></span>

[![Discord](https://img.shields.io/badge/discord-join%20server-738ADB?style=for-the-badge&logo=discord&logoColor=738ADB)](https://chat.quasar.dev)
[![X](https://img.shields.io/badge/follow-@jgalbraith64-1DA1F2?style=for-the-badge&logo=x&logoColor=1DA1F2)](https://twitter.com/jgalbraith64)

QIconPicker is a [Quasar](https://quasar.dev) component that provides an icon picker for Vue and Quasar applications.

# Structure

This is a pnpm workspace mono-repo. You cannot use npm for building.

- [/ui](packages/ui) - standalone npm package (go here for more information)
- [/app-extension](packages/app-extension) - Quasar app extension
- [/docs](packages/docs) - Q-Press documentation site with docs, demos, and examples
- [live demo](https://qiconpicker.netlify.app/) - **live Q-Press docs, demos, and examples**

## Local Development

```bash
pnpm install
pnpm build:ui
pnpm build:docs
pnpm --filter docs dev
```

## Support

If QIconPicker is useful in your workflow and you want to support ongoing maintenance:

- GitHub Sponsors: https://github.com/sponsors/hawkeye64
- PayPal: https://paypal.me/hawkeye64

## License

MIT (c) Jeff Galbraith <jeff@quasar.dev>
