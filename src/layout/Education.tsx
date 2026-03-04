import { useI18n } from "../hooks/useI18n";
import { ETranslationKey } from "../i18n/types";

type EducationTimelineItem = {
  id: string;
  universityNameKey: ETranslationKey;
  degreeKey: ETranslationKey;
  period: string;
  universityUrl: string;
};

const EDUCATION_TIMELINE_ITEMS: EducationTimelineItem[] = [
  {
    id: "duet",
    universityNameKey: ETranslationKey.EducationDuetUniversityName,
    degreeKey: ETranslationKey.EducationDuetDegree,
    period: "Sep 2022 - Jan 2024",
    universityUrl: "https://www.duet.edu.ua/",
  },
  {
    id: "knu",
    universityNameKey: ETranslationKey.EducationKnuUniversityName,
    degreeKey: ETranslationKey.EducationKnuDegree,
    period: "Sep 2012 - Jun 2016",
    universityUrl: "https://www.knu.edu.ua/",
  },
];

export function Education() {
  const i18n = useI18n();

  return (
    <article className="h-full overflow-y-auto pr-2 text-white">
      <ul className="h-full space-y-2 px-1 py-2">
        {EDUCATION_TIMELINE_ITEMS.map(function (item, index) {
          const isLast = index === EDUCATION_TIMELINE_ITEMS.length - 1;
          const universityName = i18n.t(item.universityNameKey);
          const degree = i18n.t(item.degreeKey);

          return (
            <li key={item.id} className="relative min-h-[7.5rem] pl-24">
              {!isLast ? (
                <span className="pointer-events-none absolute left-[2.05rem] top-[3rem] h-[calc(100%-1.5rem)] w-[2px] bg-[color:var(--color-accent)]/70" />
              ) : null}

              <a
                href={item.universityUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`${universityName} website`}
                className="absolute left-0 top-0 z-10 flex h-[4.25rem] w-[4.25rem] cursor-pointer items-center justify-center rounded-full border-2 border-[color:var(--color-accent)] bg-white"
              >
                <span className="h-4 w-4 rounded-full bg-[color:var(--color-accent)]" />
              </a>

              <div className="space-y-2 pb-8 text-sm text-white/95">
                <a
                  href={item.universityUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="block text-[1.09375rem] uppercase transition-colors duration-200 ease-out hover:text-[color:var(--color-accent)]"
                >
                  {universityName}
                </a>

                <div className="flex flex-wrap items-center gap-2">
                  <span>{degree}</span>
                  <span className="text-white/60">|</span>
                  <span>{item.period}</span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </article>
  );
}
