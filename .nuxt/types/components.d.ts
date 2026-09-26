
import type { DefineComponent, SlotsType } from 'vue'
type IslandComponent<T> = DefineComponent<{}, {refresh: () => Promise<void>}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, SlotsType<{ fallback: { error: unknown } }>> & T

type HydrationStrategies = {
  hydrateOnVisible?: IntersectionObserverInit | true
  hydrateOnIdle?: number | true
  hydrateOnInteraction?: keyof HTMLElementEventMap | Array<keyof HTMLElementEventMap> | true
  hydrateOnMediaQuery?: string
  hydrateAfter?: number
  hydrateWhen?: boolean
  hydrateNever?: true
}
type LazyComponent<T> = DefineComponent<HydrationStrategies, {}, {}, {}, {}, {}, {}, { hydrated: () => void }> & T

interface _GlobalComponents {
  BlockEditor: typeof import("../../components/BlockEditor.vue")['default']
  IconArrow: typeof import("../../components/IconArrow.vue")['default']
  Lightbox: typeof import("../../components/Lightbox.vue")['default']
  ShapeGrid: typeof import("../../components/ShapeGrid.vue")['default']
  TargetCursor: typeof import("../../components/TargetCursor.vue")['default']
  TheFooter: typeof import("../../components/TheFooter.vue")['default']
  TheNavbar: typeof import("../../components/TheNavbar.vue")['default']
  ThePreloader: typeof import("../../components/ThePreloader.vue")['default']
  WarpText: typeof import("../../components/WarpText.vue")['default']
  WhatsAppButton: typeof import("../../components/WhatsAppButton.vue")['default']
  HomeContactoSection: typeof import("../../components/home/ContactoSection.vue")['default']
  HomeHeroSection: typeof import("../../components/home/HeroSection.vue")['default']
  HomeModelosSection: typeof import("../../components/home/ModelosSection.vue")['default']
  HomeNosotrosSection: typeof import("../../components/home/NosotrosSection.vue")['default']
  HomeProyectosSection: typeof import("../../components/home/ProyectosSection.vue")['default']
  HomeServiciosSection: typeof import("../../components/home/ServiciosSection.vue")['default']
  NuxtWelcome: typeof import("../../node_modules/nuxt/dist/app/components/welcome.vue")['default']
  NuxtLayout: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
  NuxtErrorBoundary: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
  ClientOnly: typeof import("../../node_modules/nuxt/dist/app/components/client-only")['default']
  DevOnly: typeof import("../../node_modules/nuxt/dist/app/components/dev-only")['default']
  ServerPlaceholder: typeof import("../../node_modules/nuxt/dist/app/components/server-placeholder")['default']
  NuxtLink: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-link")['default']
  NuxtLoadingIndicator: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
  NuxtTime: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
  NuxtRouteAnnouncer: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
  NuxtImg: typeof import("../../node_modules/@nuxt/image/dist/runtime/components/NuxtImg.vue")['default']
  NuxtPicture: typeof import("../../node_modules/@nuxt/image/dist/runtime/components/NuxtPicture.vue")['default']
  NuxtPage: typeof import("../../node_modules/nuxt/dist/pages/runtime/page")['default']
  NoScript: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['NoScript']
  Link: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Link']
  Base: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Base']
  Title: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Title']
  Meta: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Meta']
  Style: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Style']
  Head: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Head']
  Html: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Html']
  Body: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Body']
  NuxtIsland: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-island")['default']
  LazyBlockEditor: LazyComponent<typeof import("../../components/BlockEditor.vue")['default']>
  LazyIconArrow: LazyComponent<typeof import("../../components/IconArrow.vue")['default']>
  LazyLightbox: LazyComponent<typeof import("../../components/Lightbox.vue")['default']>
  LazyShapeGrid: LazyComponent<typeof import("../../components/ShapeGrid.vue")['default']>
  LazyTargetCursor: LazyComponent<typeof import("../../components/TargetCursor.vue")['default']>
  LazyTheFooter: LazyComponent<typeof import("../../components/TheFooter.vue")['default']>
  LazyTheNavbar: LazyComponent<typeof import("../../components/TheNavbar.vue")['default']>
  LazyThePreloader: LazyComponent<typeof import("../../components/ThePreloader.vue")['default']>
  LazyWarpText: LazyComponent<typeof import("../../components/WarpText.vue")['default']>
  LazyWhatsAppButton: LazyComponent<typeof import("../../components/WhatsAppButton.vue")['default']>
  LazyHomeContactoSection: LazyComponent<typeof import("../../components/home/ContactoSection.vue")['default']>
  LazyHomeHeroSection: LazyComponent<typeof import("../../components/home/HeroSection.vue")['default']>
  LazyHomeModelosSection: LazyComponent<typeof import("../../components/home/ModelosSection.vue")['default']>
  LazyHomeNosotrosSection: LazyComponent<typeof import("../../components/home/NosotrosSection.vue")['default']>
  LazyHomeProyectosSection: LazyComponent<typeof import("../../components/home/ProyectosSection.vue")['default']>
  LazyHomeServiciosSection: LazyComponent<typeof import("../../components/home/ServiciosSection.vue")['default']>
  LazyNuxtWelcome: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
  LazyNuxtLayout: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
  LazyNuxtErrorBoundary: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
  LazyClientOnly: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/client-only")['default']>
  LazyDevOnly: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/dev-only")['default']>
  LazyServerPlaceholder: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
  LazyNuxtLink: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
  LazyNuxtLoadingIndicator: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
  LazyNuxtTime: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
  LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
  LazyNuxtImg: LazyComponent<typeof import("../../node_modules/@nuxt/image/dist/runtime/components/NuxtImg.vue")['default']>
  LazyNuxtPicture: LazyComponent<typeof import("../../node_modules/@nuxt/image/dist/runtime/components/NuxtPicture.vue")['default']>
  LazyNuxtPage: LazyComponent<typeof import("../../node_modules/nuxt/dist/pages/runtime/page")['default']>
  LazyNoScript: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['NoScript']>
  LazyLink: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Link']>
  LazyBase: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Base']>
  LazyTitle: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Title']>
  LazyMeta: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Meta']>
  LazyStyle: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Style']>
  LazyHead: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Head']>
  LazyHtml: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Html']>
  LazyBody: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Body']>
  LazyNuxtIsland: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-island")['default']>
}

declare module 'vue' {
  export interface GlobalComponents extends _GlobalComponents { }
}

export {}
