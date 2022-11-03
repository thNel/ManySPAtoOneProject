/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SRC_FOLDER_SERVER_RELATIVE_URL: string;
  readonly VITE_SERVER_RELATIVE_SITE_URL: string;
  readonly VITE_APP_TITLE: string;
  readonly VITE_PLATFORM: 'sharepoint' | 'bitrix';
  readonly VITE_EIP_URL: string;
  readonly VITE_RTTN_URL: string;
  readonly VITE_FP_URL: string;
  readonly VITE_ROOT_URL: string;
  readonly VITE_ABE_URL: string;
  readonly VITE_ABE_SRC_FOLDER_SERVER_RELATIVE_URL: string;
  readonly VITE_ABE_SERVER_RELATIVE_SITE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
