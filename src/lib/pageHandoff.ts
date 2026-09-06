import { createTransitionLifecycle, type TransitionLifecyclePhase, type TransitionLifecycleState } from "operational-topology";
import { NAVIGATION_ANIMATIONS, type NavigationAnimationName } from "operational-topology/animations";
export type PageTransitionAnimation = NavigationAnimationName;
export type NavigationTransitionAnimation = NavigationAnimationName;
export type PageTransitionDirection = "forward" | "backward";
export const navigationAnimations = NAVIGATION_ANIMATIONS;
export const PAGE_HANDOFF_EVENTS = { transition: "navigation-transition", state: "navigation-transition-state", ambient: "navigation-ambient", signals: "navigation-signals", occupants: "navigation-occupants" } as const;

export interface NavigationTransitionEventDetail { phase: TransitionLifecyclePhase; animation: PageTransitionAnimation; direction: PageTransitionDirection; transitionId?: string; source: string; destination?: string; }

/** Website adapter intent; OTF owns Navigation Transition lifecycle execution. */

export interface PageTransitionIntent {
  destination: string;
  animation?: PageTransitionAnimation;
  direction?: PageTransitionDirection;
  context?: Record<string, unknown>;
}

export interface PageTransitionResolution {
  animation: PageTransitionAnimation;
  direction: PageTransitionDirection;
}

const collectionRoots = ["/journal", "/incident-library", "/world"];

const trimTrailingSlash = (path: string) => {
  while (path.length > 1 && path.endsWith("/")) path = path.slice(0, -1);
  return path;
};

const normalizePath = (value: string) => {
  try {
    return trimTrailingSlash(new URL(value, window.location.origin).pathname);
  } catch {
    return trimTrailingSlash(value);
  }
};

const stripLocale = (path: string) => path.replace(/^\/(?:en|es)(?=\/|$)/, "") || "/";

const isCollection = (path: string) => collectionRoots.some((root) => path === root || path === root + "/entries" || path === root + "/topics");
const isDetail = (path: string) => collectionRoots.some((root) => path.startsWith(root + "/") && path !== root && path !== root + "/entries" && path !== root + "/topics");

export function getPageTransition({
  currentRoute,
  destinationRoute,
  navigationContext,
}: {
  currentRoute: string;
  destinationRoute: string;
  navigationContext?: Record<string, unknown>;
}): PageTransitionResolution {
  if (navigationContext?.origin === true || stripLocale(currentRoute) === "/origin") {
    return { animation: "originArrival", direction: "forward" };
  }

  const current = stripLocale(normalizePath(currentRoute));
  const destination = stripLocale(normalizePath(destinationRoute));
  if (isCollection(current) && isDetail(destination)) return { animation: "converge", direction: "forward" };
  if (isDetail(current) && isCollection(destination)) return { animation: "expand", direction: "backward" };
  return { animation: "flow", direction: "forward" };
}

export function isEligiblePageHandoffLink(event: MouseEvent, anchor: HTMLAnchorElement) {
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return false;
  if (anchor.hasAttribute("data-no-page-handoff") || anchor.target && anchor.target !== "_self" || anchor.hasAttribute("download")) return false;
  const raw = anchor.getAttribute("href");
  if (!raw || raw.startsWith("#") || /^(?:mailto:|tel:|javascript:)/i.test(raw)) return false;
  let url: URL;
  try { url = new URL(raw, window.location.href); } catch { return false; }
  return url.origin === window.location.origin && url.pathname !== window.location.pathname;
}

let activeNavigation: Promise<void> | null = null;

const dispatchPageTransition = (phase: TransitionLifecyclePhase, animation: PageTransitionAnimation, direction: PageTransitionDirection) => {
  document.documentElement.dataset.pageTransition = phase;
  window.dispatchEvent(new CustomEvent("navigation-transition", { detail: { phase, animation, direction } }));
};

export async function pageHandoff({ destination, animation, direction, context }: PageTransitionIntent) {
  if (activeNavigation) return activeNavigation;
  activeNavigation = (async () => {
    const target = new URL(destination, window.location.href);
    const resolved = animation ? { animation, direction: direction ?? "forward" } : getPageTransition({ currentRoute: window.location.pathname, destinationRoute: target.pathname, navigationContext: context });
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      window.location.assign(target.href);
      return;
    }
    const lifecycle = createTransitionLifecycle({
      playNavigation: (phase) => dispatchPageTransition(phase, resolved.animation, resolved.direction),
      playPresentation: (phase) => dispatchPageTransition(phase, resolved.animation, resolved.direction),
      setAmbientEnabled: (enabled) => window.dispatchEvent(new CustomEvent("navigation-ambient", { detail: enabled })),
      setSignalsEnabled: (enabled) => window.dispatchEvent(new CustomEvent("navigation-signals", { detail: enabled })),
      setOccupantsVisible: (visible) => window.dispatchEvent(new CustomEvent("navigation-occupants", { detail: visible })),
      onStateChange: (state: TransitionLifecycleState) => {
        if (state === "complete" || state === "cancelled") delete document.documentElement.dataset.pageTransition;
        window.dispatchEvent(new CustomEvent("navigation-transition-state", { detail: state }));
      },
    });

    try {
      await lifecycle.exit();
      sessionStorage.setItem("thisisgenaro.pageHandoff", JSON.stringify({ ...resolved, destination: target.pathname, context }));
      if (context?.origin === true || resolved.animation === "originArrival") sessionStorage.setItem("thisisgenaro.originHandoff", "1");
      window.location.assign(target.href);
    } catch {
      delete document.documentElement.dataset.pageTransition;
      window.location.assign(target.href);
    }
  })();
  return activeNavigation;
}

export function onNavigationTransition(listener: (event: CustomEvent<NavigationTransitionEventDetail>) => void) {
  const handler = (event: Event) => listener(event as CustomEvent<NavigationTransitionEventDetail>);
  window.addEventListener(PAGE_HANDOFF_EVENTS.transition, handler);
  return () => window.removeEventListener(PAGE_HANDOFF_EVENTS.transition, handler);
}

export function onNavigationTransitionState(listener: (state: TransitionLifecycleState) => void) {
  const handler = (event: Event) => listener((event as CustomEvent<TransitionLifecycleState>).detail);
  window.addEventListener(PAGE_HANDOFF_EVENTS.state, handler);
  return () => window.removeEventListener(PAGE_HANDOFF_EVENTS.state, handler);
}

export function installPageHandoff() {
  if (typeof window === "undefined" || window.__thisisgenaroPageHandoff) return;
  window.__thisisgenaroPageHandoff = true;
  document.addEventListener("click", (event) => {
    if (!(event instanceof MouseEvent)) return;
    const anchor = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("a[href]") : null;
    if (!anchor || !isEligiblePageHandoffLink(event, anchor)) return;
    event.preventDefault();
    void pageHandoff({ destination: anchor.href });
  }, true);

  let marker: string | null = null;
  let originMarker = false;
  try {
    marker = sessionStorage.getItem("thisisgenaro.pageHandoff");
    originMarker = sessionStorage.getItem("thisisgenaro.originHandoff") === "1";
    if (originMarker) sessionStorage.removeItem("thisisgenaro.originHandoff");
  } catch { return; }
  if (originMarker) document.documentElement.dataset.originHandoff = "true";
  if (!marker) return;
  try { sessionStorage.removeItem("thisisgenaro.pageHandoff"); } catch {}
  try {
    const transition = JSON.parse(marker) as PageTransitionResolution;
    const lifecycle = createTransitionLifecycle({
      playNavigation: (phase) => dispatchPageTransition(phase, transition.animation, transition.direction),
      playPresentation: (phase) => dispatchPageTransition(phase, transition.animation, transition.direction),
      setAmbientEnabled: (enabled) => window.dispatchEvent(new CustomEvent("navigation-ambient", { detail: enabled })),
      setSignalsEnabled: (enabled) => window.dispatchEvent(new CustomEvent("navigation-signals", { detail: enabled })),
      setOccupantsVisible: (visible) => window.dispatchEvent(new CustomEvent("navigation-occupants", { detail: visible })),
      onStateChange: (state) => {
        if (state === "complete" || state === "cancelled") delete document.documentElement.dataset.pageTransition;
        window.dispatchEvent(new CustomEvent("navigation-transition-state", { detail: state }));
      },
    });
    void lifecycle.enter().catch(() => document.documentElement.removeAttribute("data-page-transition"));
  } catch {
    // A malformed marker must never prevent the destination page from rendering.
  }
}

declare global {
  interface Window { __thisisgenaroPageHandoff?: boolean; }
}
