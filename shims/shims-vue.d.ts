export {};

import 'vue-router';

declare module 'vue-router' {
  interface RouteMeta {
    label: string;
    showInMenu?: boolean;
    icon?: string;
    layout?: string;
    tags?: Array[string];
    url?: string;
    parent?: string;
  }
}
