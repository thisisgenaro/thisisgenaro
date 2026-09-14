import type { TransitionLifecyclePhase } from "operational-topology";
import type { NavigationTransitionAnimation, PageTransitionDirection } from "./pageHandoff";

export interface NavigationScenePlayback {
  animation: NavigationTransitionAnimation;
  phase: TransitionLifecyclePhase;
  direction: PageTransitionDirection;
  destination?: string;
}

export interface NavigationSceneAdapter {
  playNavigation(playback: NavigationScenePlayback): void | Promise<void>;
  playPresentation?(playback: NavigationScenePlayback): void | Promise<void>;
  setAmbientEnabled?(enabled: boolean): void;
  setSignalsEnabled?(enabled: boolean): void;
  setOccupantsVisible?(visible: boolean): void;
}

let activeAdapter: NavigationSceneAdapter | null = null;

export function registerNavigationSceneAdapter(adapter: NavigationSceneAdapter | null) {
  activeAdapter = adapter;
  return () => {
    if (activeAdapter === adapter) activeAdapter = null;
  };
}

export function getNavigationSceneAdapter() {
  return activeAdapter;
}
