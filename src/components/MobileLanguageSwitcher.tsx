import { useI18n } from "../hooks/useI18n";
import { LOCALE_LABEL_KEYS } from "../i18n/types";

type MobileLanguageSwitcherProps = {
  isDisabled?: boolean;
};

export function MobileLanguageSwitcher(props: MobileLanguageSwitcherProps) {
  const { isDisabled = false } = props;
  const i18n = useI18n();

  return (
    <div className="mt-8 flex w-full flex-wrap items-center justify-center gap-3">
      {i18n.languageOptions.map(function (nextLocale) {
        const isActiveLocale = nextLocale === i18n.locale;

        return (
          <button
            key={nextLocale}
            type="button"
            className={
              isDisabled
                ? "subtle-border subtle-border--quiet control-label relative flex h-10 min-w-14 cursor-not-allowed items-center justify-center rounded-full border bg-white/5 px-4 text-[0.95rem] text-white/50"
                : isActiveLocale
                  ? "subtle-border subtle-border--quiet control-label relative flex h-10 min-w-14 cursor-pointer items-center justify-center rounded-full border bg-white/8 px-4 text-[0.95rem] text-white"
                  : "subtle-border subtle-border--quiet control-label relative flex h-10 min-w-14 cursor-pointer items-center justify-center rounded-full border bg-white/2 px-4 text-[0.95rem] text-white/80 transition-colors duration-200 ease-out hover:bg-white/8 hover:text-white focus-visible:bg-white/8 focus-visible:text-white"
            }
            onClick={function () {
              if (isDisabled) {
                return;
              }

              i18n.setLocale(nextLocale);
            }}
            disabled={isDisabled}
            aria-pressed={isActiveLocale}
          >
            {i18n.t(LOCALE_LABEL_KEYS[nextLocale])}
          </button>
        );
      })}
    </div>
  );
}
