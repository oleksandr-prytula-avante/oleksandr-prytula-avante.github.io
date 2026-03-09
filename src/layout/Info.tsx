import { useEffect, useState } from "react";

import { Tags } from "../components/Tags/Tags";
import { ATS_CV_PATH } from "../constants/paths";
import {
  DESKTOP_MIN_WIDTH_MEDIA_QUERY,
  MIN_ANIMATED_VIEWPORT_MEDIA_QUERY,
} from "../constants/mediaQueries";
import { COMMON_SKILL_TAGS } from "../constants/skillTags";
import {
  TAG_REVEAL_DURATION_MS,
  TAG_REVEAL_STAGGER_MS,
} from "../components/Tags/Tags";
import { useI18n } from "../hooks/useI18n";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { ETranslationKey } from "../i18n/types";
import { TypingCursor } from "../components/TypingCursor";
import profilePhotoSrc from "../assets/images/profile.webp";

const ORANGE_LINE_REVEAL_DURATION_MS = 500;
const NAME_TYPING_START_EXTRA_DELAY_MS = 20;
const HI_TYPING_INTERVAL_MS = 70;
const ROLE_TYPING_INTERVAL_MS = 70;
const ENGINEERING_TOOLKIT_TYPING_INTERVAL_MS = 45;
const NAME_TYPING_INTERVAL_MS = 75;
const NEED_MORE_DETAILS_TYPING_INTERVAL_MS = 45;
const CV_DOWNLOAD_TYPING_INTERVAL_MS = 38;
const HERO_TYPING_STEP_SINGLE_CHAR = 1;
const HERO_TYPING_STEP_DOUBLE_CHARS = 2;
const ENGINEERING_TOOLKIT_COLON_TRIM_INDEX = -1;
const ENGINEERING_TOOLKIT_COLON_EXTRA_LENGTH = 1;
const DEFAULT_CHAR_COUNT = 0;
const ENABLED_TAB_INDEX = 0;
const DISABLED_TAB_INDEX = -1;
const SCALE_X_VISIBLE = "scaleX(1)";
const SCALE_X_HIDDEN = "scaleX(0)";
const ENGINEERING_TOOLKIT_EMPTY_LENGTH = 0;
const NAME_TYPING_START_DELAY_MS =
  ORANGE_LINE_REVEAL_DURATION_MS + NAME_TYPING_START_EXTRA_DELAY_MS;
const NEED_MORE_DETAILS_START_DELAY_MS =
  (COMMON_SKILL_TAGS.length - 1) * TAG_REVEAL_STAGGER_MS +
  TAG_REVEAL_DURATION_MS;

type InfoProps = {
  hoveredSkill?: string | null;
  onSkillEnter: (skill: string) => void;
  onSkillLeave: () => void;
  onSecondaryContentVisibilityChange: (isVisible: boolean) => void;
  onHeroPrintingStateChange: (isPrinting: boolean) => void;
};

export function Info(props: InfoProps) {
  const {
    hoveredSkill = null,
    onSkillEnter,
    onSkillLeave,
    onSecondaryContentVisibilityChange,
    onHeroPrintingStateChange,
  } = props;
  const i18n = useI18n();
  const [visibleHiChars, setVisibleHiChars] = useState(DEFAULT_CHAR_COUNT);
  const [isLineVisible, setIsLineVisible] = useState(false);
  const [visibleNameChars, setVisibleNameChars] = useState(DEFAULT_CHAR_COUNT);
  const [isNameTypingStarted, setIsNameTypingStarted] = useState(false);
  const [visibleRoleChars, setVisibleRoleChars] = useState(DEFAULT_CHAR_COUNT);
  const [visibleEngineeringToolkitChars, setVisibleEngineeringToolkitChars] =
    useState(DEFAULT_CHAR_COUNT);
  const [
    isEngineeringToolkitTypingStarted,
    setIsEngineeringToolkitTypingStarted,
  ] = useState(false);
  const [showSecondaryContent, setShowSecondaryContent] = useState(false);
  const [visibleNeedMoreDetailsChars, setVisibleNeedMoreDetailsChars] =
    useState(DEFAULT_CHAR_COUNT);
  const [isNeedMoreDetailsTypingStarted, setIsNeedMoreDetailsTypingStarted] =
    useState(false);
  const [visibleCvDownloadChars, setVisibleCvDownloadChars] =
    useState(DEFAULT_CHAR_COUNT);
  const [isCvDownloadTypingStarted, setIsCvDownloadTypingStarted] =
    useState(false);
  const [shouldPlayHeroAnimation, setShouldPlayHeroAnimation] = useState(true);
  const isDesktopViewport = useMediaQuery(DESKTOP_MIN_WIDTH_MEDIA_QUERY, true);
  const isAnimationViewport = useMediaQuery(
    MIN_ANIMATED_VIEWPORT_MEDIA_QUERY,
    true,
  );

  const hiText = i18n.t(ETranslationKey.HeroHiIm);
  const nameText = i18n.t(ETranslationKey.HeroName);
  const surnameText = i18n.t(ETranslationKey.HeroSurname);
  const fullNameLength = nameText.length + surnameText.length;
  const visibleName = nameText.slice(
    DEFAULT_CHAR_COUNT,
    Math.min(visibleNameChars, nameText.length),
  );
  const visibleSurname = surnameText.slice(
    0,
    Math.max(visibleNameChars - nameText.length, DEFAULT_CHAR_COUNT),
  );
  const roleText = i18n.t(ETranslationKey.HeroRole);
  const engineeringToolkitText = i18n.t(ETranslationKey.HeroEngineeringToolkit);
  const engineeringToolkitBaseText = engineeringToolkitText.endsWith(":")
    ? engineeringToolkitText.slice(0, ENGINEERING_TOOLKIT_COLON_TRIM_INDEX)
    : engineeringToolkitText;
  const engineeringToolkitTotalLength =
    engineeringToolkitBaseText.length + ENGINEERING_TOOLKIT_COLON_EXTRA_LENGTH;
  const visibleEngineeringToolkitBaseChars = Math.min(
    visibleEngineeringToolkitChars,
    engineeringToolkitBaseText.length,
  );
  const isEngineeringToolkitColonVisible =
    visibleEngineeringToolkitChars > engineeringToolkitBaseText.length;
  const needMoreDetailsText = i18n.t(ETranslationKey.HeroNeedMoreDetails);
  const cvDownloadText = i18n.t(ETranslationKey.HeroCvDownload);
  const isHiTyping = visibleHiChars < hiText.length;
  const isNameTyping = isNameTypingStarted && visibleNameChars < fullNameLength;
  const isTypingNameRow = visibleNameChars < nameText.length;
  const isRoleTyping =
    !isHiTyping &&
    visibleNameChars >= fullNameLength &&
    visibleRoleChars < roleText.length;
  const isEngineeringToolkitTyping =
    isEngineeringToolkitTypingStarted &&
    visibleEngineeringToolkitChars < engineeringToolkitTotalLength;
  const isNeedMoreDetailsPrinted =
    visibleNeedMoreDetailsChars >= needMoreDetailsText.length;
  const isCvDownloadPrinted = visibleCvDownloadChars >= cvDownloadText.length;
  const isHeroPrintingInProgress =
    !showSecondaryContent || !isNeedMoreDetailsPrinted || !isCvDownloadPrinted;
  const isDesktopSecondaryContentReady =
    isEngineeringToolkitTypingStarted || showSecondaryContent;
  const isMobileSecondaryContentReady =
    showSecondaryContent && isCvDownloadPrinted;
  const isSecondaryContentReady = isDesktopViewport
    ? isDesktopSecondaryContentReady
    : isMobileSecondaryContentReady;
  const isProfilePhotoVisible = !shouldPlayHeroAnimation || isNameTypingStarted;

  function setHeroTypingState(isCompleted: boolean) {
    setVisibleHiChars(isCompleted ? hiText.length : DEFAULT_CHAR_COUNT);
    setIsLineVisible(isCompleted);
    setVisibleNameChars(isCompleted ? fullNameLength : DEFAULT_CHAR_COUNT);
    setIsNameTypingStarted(isCompleted);
    setVisibleRoleChars(isCompleted ? roleText.length : DEFAULT_CHAR_COUNT);
    setVisibleEngineeringToolkitChars(
      isCompleted ? engineeringToolkitTotalLength : DEFAULT_CHAR_COUNT,
    );
    setIsEngineeringToolkitTypingStarted(isCompleted);
    setShowSecondaryContent(isCompleted);
    setVisibleNeedMoreDetailsChars(
      isCompleted ? needMoreDetailsText.length : DEFAULT_CHAR_COUNT,
    );
    setIsNeedMoreDetailsTypingStarted(isCompleted);
    setVisibleCvDownloadChars(
      isCompleted ? cvDownloadText.length : DEFAULT_CHAR_COUNT,
    );
    setIsCvDownloadTypingStarted(isCompleted);
  }

  function renderTypingCursor(shouldRender: boolean, color?: string) {
    if (!shouldRender) {
      return null;
    }

    return <TypingCursor color={color} />;
  }

  useEffect(
    function () {
      onSecondaryContentVisibilityChange(isSecondaryContentReady);
    },
    [isSecondaryContentReady, onSecondaryContentVisibilityChange],
  );

  useEffect(
    function () {
      onHeroPrintingStateChange(isHeroPrintingInProgress);
    },
    [isHeroPrintingInProgress, onHeroPrintingStateChange],
  );

  useEffect(
    function () {
      if (!isAnimationViewport) {
        setShouldPlayHeroAnimation(false);
      }
    },
    [isAnimationViewport],
  );

  useEffect(
    function () {
      if (!shouldPlayHeroAnimation) {
        setHeroTypingState(true);

        return;
      }

      setHeroTypingState(false);

      const timeoutIds: number[] = [];
      const intervalIds: number[] = [];

      function typeRole() {
        const roleIntervalId = window.setInterval(function () {
          setVisibleRoleChars(function (currentValue) {
            const nextValue = Math.min(
              currentValue + HERO_TYPING_STEP_SINGLE_CHAR,
              roleText.length,
            );

            if (nextValue >= roleText.length) {
              window.clearInterval(roleIntervalId);

              if (
                engineeringToolkitTotalLength ===
                ENGINEERING_TOOLKIT_EMPTY_LENGTH
              ) {
                setShowSecondaryContent(true);
              } else {
                setIsEngineeringToolkitTypingStarted(true);

                const engineeringToolkitIntervalId = window.setInterval(
                  function () {
                    setVisibleEngineeringToolkitChars(
                      function (toolkitCurrentValue) {
                        const toolkitNextValue = Math.min(
                          toolkitCurrentValue + HERO_TYPING_STEP_SINGLE_CHAR,
                          engineeringToolkitTotalLength,
                        );

                        if (toolkitNextValue >= engineeringToolkitTotalLength) {
                          window.clearInterval(engineeringToolkitIntervalId);
                          setShowSecondaryContent(true);
                        }

                        return toolkitNextValue;
                      },
                    );
                  },
                  ENGINEERING_TOOLKIT_TYPING_INTERVAL_MS,
                );

                intervalIds.push(engineeringToolkitIntervalId);
              }
            }

            return nextValue;
          });
        }, ROLE_TYPING_INTERVAL_MS);

        intervalIds.push(roleIntervalId);
      }

      function typeName() {
        const nameIntervalId = window.setInterval(function () {
          setVisibleNameChars(function (currentValue) {
            const nextValue = Math.min(
              currentValue + HERO_TYPING_STEP_SINGLE_CHAR,
              fullNameLength,
            );

            if (nextValue >= fullNameLength) {
              window.clearInterval(nameIntervalId);
              typeRole();
            }

            return nextValue;
          });
        }, NAME_TYPING_INTERVAL_MS);

        intervalIds.push(nameIntervalId);
      }

      const hiIntervalId = window.setInterval(function () {
        setVisibleHiChars(function (currentValue) {
          const nextValue = Math.min(
            currentValue + HERO_TYPING_STEP_DOUBLE_CHARS,
            hiText.length,
          );

          if (nextValue >= hiText.length) {
            window.clearInterval(hiIntervalId);
            setIsLineVisible(true);

            const timeoutId = window.setTimeout(function () {
              setIsNameTypingStarted(true);
              typeName();
            }, NAME_TYPING_START_DELAY_MS);

            timeoutIds.push(timeoutId);
          }

          return nextValue;
        });
      }, HI_TYPING_INTERVAL_MS);

      intervalIds.push(hiIntervalId);

      return function () {
        intervalIds.forEach(function (intervalId) {
          window.clearInterval(intervalId);
        });

        timeoutIds.forEach(function (timeoutId) {
          window.clearTimeout(timeoutId);
        });
      };
    },
    [
      cvDownloadText.length,
      fullNameLength,
      hiText,
      needMoreDetailsText.length,
      roleText,
      engineeringToolkitTotalLength,
      shouldPlayHeroAnimation,
    ],
  );

  useEffect(
    function () {
      if (!shouldPlayHeroAnimation) {
        return;
      }

      if (!showSecondaryContent) {
        setVisibleNeedMoreDetailsChars(DEFAULT_CHAR_COUNT);
        setIsNeedMoreDetailsTypingStarted(false);
        setVisibleCvDownloadChars(DEFAULT_CHAR_COUNT);
        setIsCvDownloadTypingStarted(false);
        return;
      }

      setVisibleNeedMoreDetailsChars(DEFAULT_CHAR_COUNT);
      setIsNeedMoreDetailsTypingStarted(false);

      let typingIntervalId: number | undefined;

      const typingStartTimeoutId = window.setTimeout(function () {
        setIsNeedMoreDetailsTypingStarted(true);

        typingIntervalId = window.setInterval(function () {
          setVisibleNeedMoreDetailsChars(function (currentValue) {
            const nextValue = Math.min(
              currentValue + HERO_TYPING_STEP_SINGLE_CHAR,
              needMoreDetailsText.length,
            );

            if (
              nextValue >= needMoreDetailsText.length &&
              typingIntervalId !== undefined
            ) {
              window.clearInterval(typingIntervalId);
            }

            return nextValue;
          });
        }, NEED_MORE_DETAILS_TYPING_INTERVAL_MS);
      }, NEED_MORE_DETAILS_START_DELAY_MS);

      return function () {
        window.clearTimeout(typingStartTimeoutId);

        if (typingIntervalId !== undefined) {
          window.clearInterval(typingIntervalId);
        }
      };
    },
    [needMoreDetailsText, shouldPlayHeroAnimation, showSecondaryContent],
  );

  useEffect(
    function () {
      if (!shouldPlayHeroAnimation) {
        return;
      }

      if (!showSecondaryContent || !isNeedMoreDetailsPrinted) {
        setVisibleCvDownloadChars(DEFAULT_CHAR_COUNT);
        setIsCvDownloadTypingStarted(false);
        return;
      }

      setVisibleCvDownloadChars(DEFAULT_CHAR_COUNT);
      setIsCvDownloadTypingStarted(true);

      const intervalId = window.setInterval(function () {
        setVisibleCvDownloadChars(function (currentValue) {
          const nextValue = Math.min(
            currentValue + HERO_TYPING_STEP_SINGLE_CHAR,
            cvDownloadText.length,
          );

          if (nextValue >= cvDownloadText.length) {
            window.clearInterval(intervalId);
            setShouldPlayHeroAnimation(false);
          }

          return nextValue;
        });
      }, CV_DOWNLOAD_TYPING_INTERVAL_MS);

      return function () {
        window.clearInterval(intervalId);
      };
    },
    [
      cvDownloadText,
      isNeedMoreDetailsPrinted,
      shouldPlayHeroAnimation,
      showSecondaryContent,
    ],
  );

  const hiTypingCursor = renderTypingCursor(isHiTyping);
  const nameTypingCursor = renderTypingCursor(isNameTyping && isTypingNameRow);
  const surnameTypingCursor = renderTypingCursor(
    isNameTyping && !isTypingNameRow,
  );
  const roleTypingCursor = renderTypingCursor(
    isRoleTyping,
    "var(--color-accent)",
  );
  const engineeringToolkitTypingCursor = renderTypingCursor(
    isEngineeringToolkitTyping,
  );
  const needMoreDetailsTypingCursor = renderTypingCursor(
    isNeedMoreDetailsTypingStarted &&
      visibleNeedMoreDetailsChars < needMoreDetailsText.length,
  );
  const cvDownloadTypingCursor = renderTypingCursor(
    isCvDownloadTypingStarted && visibleCvDownloadChars < cvDownloadText.length,
    "var(--color-accent)",
  );
  let engineeringToolkitColon = null;

  if (isEngineeringToolkitColonVisible) {
    engineeringToolkitColon = <span className="pl-1">:</span>;
  }

  let description = null;

  if (showSecondaryContent) {
    description = (
      <>
        <Tags
          hoveredSkill={hoveredSkill}
          onSkillEnter={onSkillEnter}
          onSkillLeave={onSkillLeave}
        />

        <div className="mt-8 flex items-center justify-end gap-2 max-[1024px]:justify-start max-[639px]:flex-col max-[639px]:items-start max-[639px]:gap-1">
          <p className="text-[1.09375rem] uppercase text-white min-[1025px]:max-[1366px]:text-sm max-[1024px]:text-[1rem]">
            {needMoreDetailsText.slice(0, visibleNeedMoreDetailsChars)}
            {needMoreDetailsTypingCursor}
          </p>
          <a
            className="inline-flex cursor-pointer items-center py-1 text-[1.09375rem] uppercase text-[color:var(--color-accent)] transition-colors duration-200 ease-out hover:text-white min-[1025px]:max-[1366px]:text-sm max-[1024px]:text-[1.375rem]"
            href={ATS_CV_PATH}
            target="_blank"
            rel="noreferrer"
            aria-hidden={!isCvDownloadTypingStarted}
            tabIndex={
              isCvDownloadTypingStarted ? ENABLED_TAB_INDEX : DISABLED_TAB_INDEX
            }
          >
            <span className="relative inline-block">
              <span className="invisible">{cvDownloadText}</span>
              <span className="absolute left-0 top-0 whitespace-nowrap">
                {cvDownloadText.slice(0, visibleCvDownloadChars)}
                {cvDownloadTypingCursor}
              </span>
            </span>
          </a>
        </div>
      </>
    );
  }

  return (
    <div className="flex h-full flex-col px-10 pt-8 pb-12 max-[1024px]:p-0">
      <div className="mb-4 flex items-center">
        <span className="text-xl font-bold uppercase text-white max-[1366px]:text-base">
          {hiText.slice(0, visibleHiChars)}
          {hiTypingCursor}
        </span>
        <span
          className="ml-6 inline-block h-[4px] flex-1 origin-left bg-[color:var(--color-accent)] transition-transform duration-500 ease-out"
          style={{
            transform: isLineVisible ? SCALE_X_VISIBLE : SCALE_X_HIDDEN,
          }}
        />
      </div>

      <div className="mt-2 flex items-start gap-6 max-[639px]:gap-4">
        <img
          src={profilePhotoSrc}
            alt="Profile photo"
            className={`h-[calc(7.75rem)] w-[calc(7.75rem)] shrink-0 rounded-full border-2 border-[color:var(--color-accent)] object-cover transition-all duration-400 ease-out will-change-transform will-change-opacity max-[1366px]:h-[calc(6.25rem)] max-[1366px]:w-[calc(6.25rem)] max-[1024px]:h-20 max-[1024px]:w-20 max-[639px]:h-16 max-[639px]:w-16 ${isProfilePhotoVisible ? "translate-y-0 scale-100 opacity-100" : "translate-y-2 scale-95 opacity-0"}`}
          loading="eager"
        />

        <h1 className="text-6xl font-bold uppercase leading-none text-white max-[1366px]:text-5xl max-[1024px]:whitespace-nowrap max-[639px]:whitespace-normal">
          <span className="block max-[1024px]:inline max-[639px]:block">
            {visibleName}
            {nameTypingCursor}
          </span>
          <span className="mt-1 block max-[1024px]:mt-0 max-[1024px]:ml-3 max-[1024px]:inline max-[639px]:mt-1 max-[639px]:ml-0 max-[639px]:block">
            {visibleSurname}
            {surnameTypingCursor}
          </span>
        </h1>
      </div>

      <p className="mt-6 text-[1.25rem] uppercase text-[color:var(--color-accent)] min-[1025px]:max-[1366px]:text-sm max-[1024px]:text-[1.75rem]">
        {roleText.slice(0, visibleRoleChars)}
        {roleTypingCursor}
      </p>

      <p className="mt-4 text-[1rem] uppercase text-white min-[1025px]:max-[1366px]:text-[0.875rem] max-[1024px]:text-[0.9375rem]">
        {engineeringToolkitBaseText.slice(
          DEFAULT_CHAR_COUNT,
          visibleEngineeringToolkitBaseChars,
        )}
        {engineeringToolkitColon}
        {engineeringToolkitTypingCursor}
      </p>

      {description}
    </div>
  );
}
