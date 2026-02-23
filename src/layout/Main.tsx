// import { useI18n } from '../hooks/useI18n';

import { Header } from "../components/Header";
import { Links } from "../components/Links";
import { SectionDots } from "../components/SectionDots";

import "./Main.css";

export function Main() {
  // const i18n = useI18n();

  return (
    <div className="flex h-full flex-col overflow-hidden px-16 pb-8 text-white">
      <Header />
      <main className="w-full flex-1 overflow-hidden">
        <div className="grid h-full grid-cols-[5%_40%_55%]">
          <section className="relative">
            <Links />
          </section>

          <section className="relative">1</section>

          <section className="relative">
            <SectionDots />2
          </section>
        </div>
      </main>
    </div>
  );
}
