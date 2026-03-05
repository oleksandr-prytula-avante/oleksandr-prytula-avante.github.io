import { useEffect, useState } from "react";

import { Tags } from "../components/Tags/Tags";
import { ATS_CV_PATH } from "../constants/paths";
import { SKILL_TAGS } from "../constants/skillTags";
import {
  TAG_REVEAL_DURATION_MS,
  TAG_REVEAL_STAGGER_MS,
} from "../components/Tags/Tags";
import { useI18n } from "../hooks/useI18n";
import { ETranslationKey } from "../i18n/types";
import { TypingCursor } from "../components/TypingCursor";

const ORANGE_LINE_REVEAL_DURATION_MS = 500;
const NAME_TYPING_START_EXTRA_DELAY_MS = 20;
const HI_TYPING_INTERVAL_MS = 70;
const ROLE_TYPING_INTERVAL_MS = 70;
const ENGINEERING_TOOLKIT_TYPING_INTERVAL_MS = 45;
const NAME_TYPING_INTERVAL_MS = 75;
const NEED_MORE_DETAILS_TYPING_INTERVAL_MS = 45;
const CV_DOWNLOAD_TYPING_INTERVAL_MS = 38;
const NAME_TYPING_START_DELAY_MS =
  ORANGE_LINE_REVEAL_DURATION_MS + NAME_TYPING_START_EXTRA_DELAY_MS;
const NEED_MORE_DETAILS_START_DELAY_MS =
  (SKILL_TAGS.length - 1) * TAG_REVEAL_STAGGER_MS + TAG_REVEAL_DURATION_MS;

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
  const [visibleHiChars, setVisibleHiChars] = useState(0);
  const [isLineVisible, setIsLineVisible] = useState(false);
  const [visibleNameChars, setVisibleNameChars] = useState(0);
  const [isNameTypingStarted, setIsNameTypingStarted] = useState(false);
  const [visibleRoleChars, setVisibleRoleChars] = useState(0);
  const [visibleEngineeringToolkitChars, setVisibleEngineeringToolkitChars] =
    useState(0);
  const [
    isEngineeringToolkitTypingStarted,
    setIsEngineeringToolkitTypingStarted,
  ] = useState(false);
  const [showSecondaryContent, setShowSecondaryContent] = useState(false);
  const [visibleNeedMoreDetailsChars, setVisibleNeedMoreDetailsChars] =
    useState(0);
  const [isNeedMoreDetailsTypingStarted, setIsNeedMoreDetailsTypingStarted] =
    useState(false);
  const [visibleCvDownloadChars, setVisibleCvDownloadChars] = useState(0);
  const [isCvDownloadTypingStarted, setIsCvDownloadTypingStarted] =
    useState(false);
  const [shouldPlayHeroAnimation, setShouldPlayHeroAnimation] = useState(true);

  const hiText = i18n.t(ETranslationKey.HeroHiIm);
  const nameText = i18n.t(ETranslationKey.HeroName);
  const surnameText = i18n.t(ETranslationKey.HeroSurname);
  const fullNameLength = nameText.length + surnameText.length;
  const visibleName = nameText.slice(
    0,
    Math.min(visibleNameChars, nameText.length),
  );
  const visibleSurname = surnameText.slice(
    0,
    Math.max(visibleNameChars - nameText.length, 0),
  );
  const roleText = i18n.t(ETranslationKey.HeroRole);
  const engineeringToolkitText = i18n.t(ETranslationKey.HeroEngineeringToolkit);
  const engineeringToolkitBaseText = engineeringToolkitText.endsWith(":")
    ? engineeringToolkitText.slice(0, -1)
    : engineeringToolkitText;
  const engineeringToolkitTotalLength = engineeringToolkitBaseText.length + 1;
  const visibleEngineeringToolkitBaseChars = Math.min(
    visibleEngineeringToolkitChars,
    engineeringToolkitBaseText.length,
  );
  let isEngineeringToolkitColonVisible =
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

  useEffect(
    function () {
      onSecondaryContentVisibilityChange(showSecondaryContent);
    },
    [onSecondaryContentVisibilityChange, showSecondaryContent],
  );

  useEffect(
    function () {
      onHeroPrintingStateChange(isHeroPrintingInProgress);
    },
    [isHeroPrintingInProgress, onHeroPrintingStateChange],
  );

  useEffect(
    function () {
      if (!shouldPlayHeroAnimation) {
        setVisibleHiChars(hiText.length);
        setIsLineVisible(true);
        setVisibleNameChars(fullNameLength);
        setIsNameTypingStarted(true);
        setVisibleRoleChars(roleText.length);
        setVisibleEngineeringToolkitChars(engineeringToolkitTotalLength);
        setIsEngineeringToolkitTypingStarted(true);
        setShowSecondaryContent(true);
        setVisibleNeedMoreDetailsChars(needMoreDetailsText.length);
        setIsNeedMoreDetailsTypingStarted(true);
        setVisibleCvDownloadChars(cvDownloadText.length);
        setIsCvDownloadTypingStarted(true);

        return;
      }

      setVisibleHiChars(0);
      setIsLineVisible(false);
      setVisibleNameChars(0);
      setIsNameTypingStarted(false);
      setVisibleRoleChars(0);
      setVisibleEngineeringToolkitChars(0);
      setIsEngineeringToolkitTypingStarted(false);
      setShowSecondaryContent(false);
      setVisibleNeedMoreDetailsChars(0);
      setIsNeedMoreDetailsTypingStarted(false);
      setVisibleCvDownloadChars(0);
      setIsCvDownloadTypingStarted(false);

      const timeoutIds: number[] = [];
      const intervalIds: number[] = [];

      function typeRole() {
        const roleIntervalId = window.setInterval(function () {
          setVisibleRoleChars(function (currentValue) {
            const nextValue = Math.min(currentValue + 1, roleText.length);

            if (nextValue >= roleText.length) {
              window.clearInterval(roleIntervalId);

              if (engineeringToolkitTotalLength === 0) {
                setShowSecondaryContent(true);
              } else {
                setIsEngineeringToolkitTypingStarted(true);

                const engineeringToolkitIntervalId = window.setInterval(
                  function () {
                    setVisibleEngineeringToolkitChars(
                      function (toolkitCurrentValue) {
                        const toolkitNextValue = Math.min(
                          toolkitCurrentValue + 1,
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
            const nextValue = Math.min(currentValue + 1, fullNameLength);

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
          const nextValue = Math.min(currentValue + 2, hiText.length);

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
        setVisibleNeedMoreDetailsChars(0);
        setIsNeedMoreDetailsTypingStarted(false);
        setVisibleCvDownloadChars(0);
        setIsCvDownloadTypingStarted(false);
        return;
      }

      setVisibleNeedMoreDetailsChars(0);
      setIsNeedMoreDetailsTypingStarted(false);

      let typingIntervalId: number | undefined;

      const typingStartTimeoutId = window.setTimeout(function () {
        setIsNeedMoreDetailsTypingStarted(true);

        typingIntervalId = window.setInterval(function () {
          setVisibleNeedMoreDetailsChars(function (currentValue) {
            const nextValue = Math.min(
              currentValue + 1,
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
        setVisibleCvDownloadChars(0);
        setIsCvDownloadTypingStarted(false);
        return;
      }

      setVisibleCvDownloadChars(0);
      setIsCvDownloadTypingStarted(true);

      const intervalId = window.setInterval(function () {
        setVisibleCvDownloadChars(function (currentValue) {
          const nextValue = Math.min(currentValue + 1, cvDownloadText.length);

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

  let hiTypingCursor = null;

  if (isHiTyping) {
    hiTypingCursor = <TypingCursor />;
  }

  let nameTypingCursor = null;

  if (isNameTyping && isTypingNameRow) {
    nameTypingCursor = <TypingCursor />;
  }

  let surnameTypingCursor = null;

  if (isNameTyping && !isTypingNameRow) {
    surnameTypingCursor = <TypingCursor />;
  }

  let roleTypingCursor = null;

  if (isRoleTyping) {
    roleTypingCursor = <TypingCursor color="var(--color-accent)" />;
  }

  let needMoreDetailsTypingCursor = null;

  let engineeringToolkitTypingCursor = null;

  if (isEngineeringToolkitTyping) {
    engineeringToolkitTypingCursor = <TypingCursor />;
  }

  if (
    isNeedMoreDetailsTypingStarted &&
    visibleNeedMoreDetailsChars < needMoreDetailsText.length
  ) {
    needMoreDetailsTypingCursor = <TypingCursor />;
  }

  let cvDownloadTypingCursor = null;

  if (
    isCvDownloadTypingStarted &&
    visibleCvDownloadChars < cvDownloadText.length
  ) {
    cvDownloadTypingCursor = <TypingCursor color="var(--color-accent)" />;
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

        <div className="mt-8 flex items-center justify-end gap-2">
          <p className="text-[17.5px] uppercase text-white max-[1366px]:text-sm">
            {needMoreDetailsText.slice(0, visibleNeedMoreDetailsChars)}
            {needMoreDetailsTypingCursor}
          </p>
          <a
            className="inline-flex cursor-pointer items-center py-1 text-[17.5px] uppercase text-[color:var(--color-accent)] transition-colors duration-200 ease-out hover:text-white max-[1366px]:text-sm"
            href={ATS_CV_PATH}
            target="_blank"
            rel="noreferrer"
            aria-hidden={!isCvDownloadTypingStarted}
            tabIndex={isCvDownloadTypingStarted ? 0 : -1}
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
    <div className="flex h-full flex-col px-10 pt-8 pb-12">
      <div className="mb-2 flex items-center">
        <span className="text-xl font-bold uppercase text-white max-[1366px]:text-base">
          {hiText.slice(0, visibleHiChars)}
          {hiTypingCursor}
        </span>
        <span
          className="ml-6 inline-block h-[4px] flex-1 origin-left bg-[color:var(--color-accent)] transition-transform duration-500 ease-out"
          style={{
            transform: isLineVisible ? "scaleX(1)" : "scaleX(0)",
          }}
        />
      </div>

      <h1 className="text-6xl font-bold uppercase leading-none text-white max-[1366px]:text-5xl">
        <span className="block">
          {visibleName}
          {nameTypingCursor}
        </span>
        <span className="mt-1 block">
          {visibleSurname}
          {surnameTypingCursor}
        </span>
      </h1>

      <p className="mt-4 text-[20px] uppercase text-[color:var(--color-accent)] max-[1366px]:text-sm">
        {roleText.slice(0, visibleRoleChars)}
        {roleTypingCursor}
      </p>

      <p className="mt-2 text-[17.5px] uppercase text-white max-[1366px]:text-sm">
        {engineeringToolkitBaseText.slice(
          0,
          visibleEngineeringToolkitBaseChars,
        )}
        {isEngineeringToolkitColonVisible ? (
          <span className="pl-1">:</span>
        ) : null}
        {engineeringToolkitTypingCursor}
      </p>

      {description}
    </div>
  );
}
