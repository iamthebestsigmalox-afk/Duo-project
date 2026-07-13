// Отдельный компонент загрузки (Loading).
// Специально вынесен в свой файл, чтобы его было легко подключить
// отдельным коммитом/PR — например, в src/router.jsx как
// defaultPendingComponent, или в src/routes/__root.jsx, или в
// любом месте, где идёт fetch/асинхронная загрузка данных.
//
// Пример подключения в router.jsx:
//
//   import { Loading } from "./components/loading";
//
//   const router = createRouter({
//     routeTree,
//     context: { queryClient },
//     defaultPendingComponent: Loading,
//     defaultPendingMs: 300,
//   });

import { Loader2 } from "lucide-react";

/**
 * Компактный спиннер. Можно вставить внутрь кнопки, карточки,
 * секции и т.д.
 */
export function Spinner({ className = "" }) {
  return <Loader2 className={`h-5 w-5 animate-spin text-[var(--color-copper-dark)] ${className}`} />;
}

/**
 * Полноэкранный экран загрузки — например, для pendingComponent
 * роутера или для Suspense fallback.
 */
export function Loading() {
  return (
    <div className="min-h-screen grid place-items-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-[var(--color-copper-dark)]" />
        <p className="text-sm text-muted-foreground tracking-widest uppercase">Загрузка...</p>
      </div>
    </div>
  );
}

/**
 * Инлайн-версия для загрузки конкретного блока (например, списка
 * товаров в каталоге), без разворота на весь экран.
 */
export function LoadingInline({ label = "Загрузка..." }) {
  return (
    <div className="flex items-center justify-center gap-3 py-16 text-muted-foreground">
      <Loader2 className="h-5 w-5 animate-spin" />
      <span className="text-sm">{label}</span>
    </div>
  );
}

export default Loading;
