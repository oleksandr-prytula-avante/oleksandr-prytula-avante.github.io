import { useEffect, useMemo } from "react";

import { Tags } from "../components/Tags/Tags";
import { CV_PATH } from "../constants/paths";
import {
  DESKTOP_MIN_WIDTH_MEDIA_QUERY,
  MIN_ANIMATED_VIEWPORT_MEDIA_QUERY,
} from "../constants/mediaQueries";
import { COMMON_SKILL_TAGS } from "../constants/skillTags";
import {
  TAG_REVEAL_DURATION_MS,
  TAG_REVEAL_STAGGER_MS,
  ORANGE_LINE_REVEAL_DURATION_MS,
  NAME_TYPING_START_EXTRA_DELAY_MS,
  HI_TYPING_INTERVAL_MS,
  ROLE_TYPING_INTERVAL_MS,
  ENGINEERING_TOOLKIT_TYPING_INTERVAL_MS,
  NAME_TYPING_INTERVAL_MS,
  NEED_MORE_DETAILS_TYPING_INTERVAL_MS,
  CV_DOWNLOAD_TYPING_INTERVAL_MS,
  HERO_TYPING_STEP_DOUBLE_CHARS,
} from "../constants/animations";
import { SCALE_X_VISIBLE, SCALE_X_HIDDEN } from "../constants/sections";
import { useI18n } from "../hooks/useI18n";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { useTypingSequence } from "../hooks/useTypingSequence";
import { ETranslationKey } from "../i18n/types";
import { TypingCursor } from "../components/TypingCursor";
import { TypingText } from "../components/TypingText";

const ENGINEERING_TOOLKIT_COLON_TRIM_INDEX = -1;
const ENGINEERING_TOOLKIT_COLON_EXTRA_LENGTH = 1;
const DEFAULT_CHAR_COUNT = 0;
const ENABLED_TAB_INDEX = 0;
const DISABLED_TAB_INDEX = -1;
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
  const isDesktopViewport = useMediaQuery(DESKTOP_MIN_WIDTH_MEDIA_QUERY, true);
  const isAnimationViewport = useMediaQuery(
    MIN_ANIMATED_VIEWPORT_MEDIA_QUERY,
    true,
  );

  const hiText = i18n.t(ETranslationKey.HeroHiIm);
  const nameText = i18n.t(ETranslationKey.HeroName);
  const surnameText = i18n.t(ETranslationKey.HeroSurname);
  const fullNameLength = nameText.length + surnameText.length;
  const roleText = i18n.t(ETranslationKey.HeroRole);
  const engineeringToolkitText = i18n.t(ETranslationKey.HeroEngineeringToolkit);
  const engineeringToolkitBaseText = engineeringToolkitText.endsWith(":")
    ? engineeringToolkitText.slice(0, ENGINEERING_TOOLKIT_COLON_TRIM_INDEX)
    : engineeringToolkitText;
  const engineeringToolkitTotalLength =
    engineeringToolkitBaseText.length + ENGINEERING_TOOLKIT_COLON_EXTRA_LENGTH;
  const needMoreDetailsText = i18n.t(ETranslationKey.HeroNeedMoreDetails);
  const cvDownloadText = i18n.t(ETranslationKey.HeroCvDownload);
  const steps = useMemo(
    () => [
      {
        length: hiText.length,
        intervalMs: HI_TYPING_INTERVAL_MS,
        charsPerTick: HERO_TYPING_STEP_DOUBLE_CHARS,
      },
      {
        length: fullNameLength,
        intervalMs: NAME_TYPING_INTERVAL_MS,
        delayMs: NAME_TYPING_START_DELAY_MS,
      },
      { length: roleText.length, intervalMs: ROLE_TYPING_INTERVAL_MS },
      {
        length: engineeringToolkitTotalLength,
        intervalMs: ENGINEERING_TOOLKIT_TYPING_INTERVAL_MS,
      },
      {
        length: needMoreDetailsText.length,
        intervalMs: NEED_MORE_DETAILS_TYPING_INTERVAL_MS,
        delayMs: NEED_MORE_DETAILS_START_DELAY_MS,
      },
      {
        length: cvDownloadText.length,
        intervalMs: CV_DOWNLOAD_TYPING_INTERVAL_MS,
      },
    ],
    [
      hiText,
      fullNameLength,
      roleText,
      engineeringToolkitTotalLength,
      needMoreDetailsText,
      cvDownloadText,
    ],
  );
  const typing = useTypingSequence(steps, isAnimationViewport);
  const hi = typing.getStep(0);
  const name = typing.getStep(1);
  const role = typing.getStep(2);
  const toolkit = typing.getStep(3);
  const details = typing.getStep(4);
  const cv = typing.getStep(5);
  const visibleHiChars = hi.visibleChars;
  const visibleNameChars = name.visibleChars;
  const visibleRoleChars = role.visibleChars;
  const visibleEngineeringToolkitChars = toolkit.visibleChars;
  const visibleNeedMoreDetailsChars = details.visibleChars;
  const visibleCvDownloadChars = cv.visibleChars;
  const isCvDownloadTypingStarted = cv.isStarted;
  const visibleName = nameText.slice(
    0,
    Math.min(visibleNameChars, nameText.length),
  );
  const visibleSurname = surnameText.slice(
    0,
    Math.max(visibleNameChars - nameText.length, 0),
  );
  const visibleEngineeringToolkitBaseChars = Math.min(
    visibleEngineeringToolkitChars,
    engineeringToolkitBaseText.length,
  );
  const isEngineeringToolkitColonVisible =
    visibleEngineeringToolkitChars > engineeringToolkitBaseText.length;
  const isLineVisible = hi.isFinished;
  const isHiTyping = hi.isStarted && !hi.isFinished;
  const isNameTyping = name.isStarted && !name.isFinished;
  const isTypingNameRow = visibleNameChars < nameText.length;
  const isRoleTyping = role.isStarted && !role.isFinished;
  const isEngineeringToolkitTyping = toolkit.isStarted && !toolkit.isFinished;
  const isNeedMoreDetailsTypingStarted = details.isStarted;
  const showSecondaryContent = toolkit.isFinished;
  const isSecondaryContentReady = isDesktopViewport
    ? toolkit.isStarted
    : cv.isFinished;

  function renderTypingCursor(shouldRender: boolean, color?: string) {
    if (!shouldRender) {
      return null;
    }

    return <TypingCursor color={color} />;
  }

  useEffect(() => {
    onHeroPrintingStateChange(!isSecondaryContentReady);
    onSecondaryContentVisibilityChange(isSecondaryContentReady);
  }, [
    isSecondaryContentReady,
    onHeroPrintingStateChange,
    onSecondaryContentVisibilityChange,
  ]);

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
    engineeringToolkitColon = <span>:</span>;
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

        <div className="mt-6 flex shrink-0 items-center justify-end gap-2 max-[1024px]:justify-start max-[639px]:flex-col max-[639px]:items-start max-[639px]:gap-1">
          <p className="text-[1.09375rem] uppercase text-white min-[1025px]:max-[1366px]:text-sm max-[1024px]:text-[1rem]">
            <TypingText text={needMoreDetailsText}>
              {needMoreDetailsText.slice(0, visibleNeedMoreDetailsChars)}
              {needMoreDetailsTypingCursor}
            </TypingText>
          </p>
          <a
            className="inline-flex cursor-pointer items-center py-1 text-[1.09375rem] text-white uppercase transition-colors duration-200 ease-out hover:text-[color:var(--color-accent)] focus-visible:text-[color:var(--color-accent)] min-[1025px]:max-[1366px]:text-sm max-[1024px]:text-[1.375rem]"
            href={CV_PATH}
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
    <div className="hero-info flex min-h-0 flex-col px-10 pt-11 pb-12 max-[1024px]:p-0">
      <div className="mb-4 flex shrink-0 items-center">
        <span className="text-xl font-bold uppercase text-white max-[1366px]:text-base">
          <TypingText text={hiText}>
            {hiText.slice(0, visibleHiChars)}
            {hiTypingCursor}
          </TypingText>
        </span>
        <span
          className="accent-line ml-6 inline-block h-px flex-1 origin-left transition-transform duration-500 ease-out"
          style={{
            transform: isLineVisible ? SCALE_X_VISIBLE : SCALE_X_HIDDEN,
          }}
        />
      </div>

      <div className="mt-2 flex shrink-0 items-start gap-6 max-[640px]:gap-4">
        <h1 className="text-6xl font-bold uppercase leading-none text-white max-[1366px]:text-5xl min-[640px]:max-[1024px]:flex min-[640px]:max-[1024px]:items-end min-[640px]:max-[1024px]:gap-3">
          <span className="block">
            <TypingText text={nameText}>
              {visibleName}
              {nameTypingCursor}
            </TypingText>
          </span>
          <span className="mt-1 block min-[640px]:mt-0 max-[640px]:mt-4">
            <TypingText text={surnameText}>
              {visibleSurname}
              {surnameTypingCursor}
            </TypingText>
          </span>
        </h1>
      </div>

      <p className="mt-6 shrink-0 text-[1.25rem] uppercase text-[color:var(--color-accent)] min-[1025px]:max-[1366px]:text-sm max-[768px]:text-[1.458rem]">
        <TypingText text={roleText}>
          {roleText.slice(0, visibleRoleChars)}
          {roleTypingCursor}
        </TypingText>
      </p>

      <p className="mt-4 shrink-0 text-[1rem] uppercase text-white min-[1025px]:max-[1366px]:text-[0.875rem] max-[1024px]:text-[0.9375rem]">
        <TypingText text={`${engineeringToolkitBaseText}:`}>
          {engineeringToolkitBaseText.slice(
            DEFAULT_CHAR_COUNT,
            visibleEngineeringToolkitBaseChars,
          )}
          {engineeringToolkitColon}
          {engineeringToolkitTypingCursor}
        </TypingText>
      </p>

      {description}
    </div>
  );
}
