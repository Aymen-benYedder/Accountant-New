export interface AppState {
  customizerVisibility?: boolean;
  containerStyle?: string;
  rebuildRoutes?: boolean;
  setCustomizerVisibility?: (customizerVisibility: boolean) => void;
  /** Authenticated user for app-wide context (used in role/component logic) */
  user?: {
    _id: string;
    name: string;
    email: string;
    role: string;
    [key: string]: any; // allow extension
  };
}
