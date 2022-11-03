import { defineConfig, loadEnv, splitVendorChunkPlugin } from 'vite';
import vue from '@vitejs/plugin-vue';
import envCompatible from 'vite-plugin-env-compatible';
import tsconfigPaths from 'vite-tsconfig-paths';
import { resolve } from 'path';

const ENV_PREFIX = ['VITE_'];

const relativePath = {
  // Относительно текущего каталога
  env: '../../.config',
  shared: '../shared/',
  root: './',
  src: 'src',
  
  // Относительно root каталога
  public: './public/',
  build: './dist/',
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, relativePath.env, ENV_PREFIX);
  
  return {
    // Базовый адрес размещения приложения
    // Полезно, когда приложение доступно не из корня сайта,
    // а, например, из sharepoint "/sites/SiteName/SiteAssets/Vue/"
    base: env.VITE_SRC_FOLDER_SERVER_RELATIVE_URL,
    // Каталог, содержащий index.html файл
    root: relativePath.root,
    // Каталог public для этого приложения
    publicDir: relativePath.public,
    // Каталог, содержащий .env файлы
    envDir: relativePath.env,
    // Подключаемые плагины для Vite
    plugins: [
      vue(),
      tsconfigPaths(),
      envCompatible({
        prefix: ENV_PREFIX[0],
      }),
      splitVendorChunkPlugin(),
    ],
    // Решения
    resolve: {
      // Расшифровка сокращений
      alias: {
        // Корень текущего приложения
        '@': `${resolve(__dirname, relativePath.src)}`,
        // Shared папка для всех приложений
        '@shared': `${resolve(__dirname, relativePath.shared)}`,
        // Прочие сокращения, упрощающие чтение кода
        'devextreme/ui': 'devextreme/esm/ui',
      },
      dedupe: [
        "vue"
      ],
    },
    // Опции запуска vite-сервера
    server: {
      port: 3000,
      open: env.VITE_OPEN_BROWSER === 'true',
      proxy: {
        '/_api': {
          target: env.VITE_SP_REST_PROXY_BASE + env.VITE_PREPROD_PORT,
        },
        '/_vti_bin': {
          target: env.VITE_SP_REST_PROXY_BASE + env.VITE_PREPROD_PORT,
        },
        '/_vr': {
          secure: false,
          changeOrigin: true,
          target: env.VITE_ROOT_URL,
        },
      },
    },
    // Настройки сборки приложения
    build: {
      // Папка для ассетов внутри собранного приложения
      assetsDir: 'assets',
      // В какую папку относительно root положить сборку
      outDir: relativePath.build,
      // production sourcemap
      sourcemap: true,
      // Разбивка css на файлы
      cssCodeSplit: true,
    },
  };
});