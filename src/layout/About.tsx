import { useMemo } from "react";

import { SkillHighlights } from "../components/SkillHighlights";
import { useI18n } from "../hooks/useI18n";
import { ETranslationKey } from "../i18n/types";

type AboutProps = {
  hoveredSkill?: string | null;
  onSkillEnter: (skill: string) => void;
  onSkillLeave: () => void;
};

export function About(props: AboutProps) {
  const { hoveredSkill, onSkillEnter, onSkillLeave } = props;
  const i18n = useI18n();

  const paragraphs = [
    ETranslationKey.AboutParagraph1,
    ETranslationKey.AboutParagraph2,
    ETranslationKey.AboutParagraph3,
    ETranslationKey.AboutParagraph4,
    ETranslationKey.AboutParagraph5,
  ];

  const paragraphValues = useMemo(
    function () {
      return paragraphs.map(function (translationKey) {
        return i18n.t(translationKey);
      });
    },
    [i18n, paragraphs],
  );

  return (
    <article className="h-full min-h-0 max-h-full overflow-y-auto pr-4 [scrollbar-gutter:stable] text-[0.9625rem] leading-relaxed text-white max-[1366px]:text-[0.875rem] max-[1024px]:pr-0 max-[1024px]:text-[1.09375rem]">
      <div className="space-y-4">
        {paragraphValues.map(function (paragraphText, index) {
          return (
            <p key={paragraphs[index]} className="indent-6">
              <SkillHighlights
                value={paragraphText}
                hoveredSkill={hoveredSkill}
                onSkillEnter={onSkillEnter}
                onSkillLeave={onSkillLeave}
              />
            </p>
          );
        })}
      </div>
    </article>
  );
}
