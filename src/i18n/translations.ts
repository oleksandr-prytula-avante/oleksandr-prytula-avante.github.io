import { ELocale, ETranslationKey } from "./types";
import type { Translations } from "./types";

const EN_TRANSLATIONS: Translations = {
  [ETranslationKey.LocaleEn]: "EN",
  [ETranslationKey.LocaleRu]: "RU",
  [ETranslationKey.LocaleSp]: "SP",
  [ETranslationKey.LocaleDe]: "DE",
  [ETranslationKey.NavAbout]: "About",
  [ETranslationKey.NavExpirience]: "Expirience",
  [ETranslationKey.NavEducation]: "Education",
  [ETranslationKey.NavProjects]: "Projects",
  [ETranslationKey.NavGithub]: "GitHub",
  [ETranslationKey.NavLinkedIn]: "LinkedIn",
  [ETranslationKey.NavLeetCode]: "LeetCode",
  [ETranslationKey.NavEmail]: "Gmail",
  [ETranslationKey.HeroHiIm]: "Hi, I'm",
  [ETranslationKey.HeroName]: "Oleksandr",
  [ETranslationKey.HeroSurname]: "Prytula",
  [ETranslationKey.HeroRole]: "Software Engineer | WEB Developer",
  [ETranslationKey.HeroEngineeringToolkit]: "My Core Engineering Toolkit:",
  [ETranslationKey.HeroNeedMoreDetails]: "Need more details?",
  [ETranslationKey.HeroCvDownload]: "Download CV (PDF)",
  [ETranslationKey.AboutParagraph1]:
    "I’m a Software Engineer with over 10 years of hands-on experience in WEB development across next domains: e-Learning, e-Commerce / Marketplaces, Trading, Insurance and Health Care. I’ve contributed to products in various delivery models - from out-staffing to startups - adapting quickly to diverse workflows, business goals, and team dynamics. I’ve worked both independently and in teams of 3 to 20 engineers, often within international, distributed environments.",
  [ETranslationKey.AboutParagraph2]:
    "As a Full-Stack WEB Developer, I deliver solutions from frontend interfaces to backend services and infrastructure. I’m experienced with monolithic and microservice architectures, REST / GraphQL APIs, databases like SQL (MySQL, SQLite and PostrgeSQL) and MongoDB. I actively use Docker and implement CI / CD pipelines for automated deployment. Additionally, I use testing frameworks such as Playwright and Jest to ensure high code quality and reliability.",
  [ETranslationKey.AboutParagraph3]:
    "My responsibilities include product evaluation and planning, technical estimations, architecture design, and MVP scoping. I collaborate closely with stakeholders to define requirements, select appropriate technologies, and ensure maintainability. I also mentor junior developers, conduct code reviews, and support onboarding.",
  [ETranslationKey.AboutParagraph4]:
    "I’m committed to continuous learning and staying current with evolving technologies. I continue applying and expanding this knowledge through challenging production engineering tasks. I regularly solve complex programming and system design problems to sharpen my algorithmic thinking and technical skills.",
  [ETranslationKey.AboutParagraph5]:
    "Also I actively integrate AI-powered tools - such as automated code generation, intelligent testing frameworks, and performance optimization utilities - into my development workflows to boost productivity, reduce manual effort, and improve application scalability.",
  [ETranslationKey.EducationDuetUniversityName]:
    "State University of Economics and Technology",
  [ETranslationKey.EducationDuetDegree]:
    "Master's degree, Computer Software Engineering",
  [ETranslationKey.EducationKnuUniversityName]:
    "Kryvyi Rih National University",
  [ETranslationKey.EducationKnuDegree]:
    "Bachelor's degree, Computer Software Engineering",
  [ETranslationKey.ExperiencePresent]: "Present",
  [ETranslationKey.ExperienceExpandDetails]: "Show more",
  [ETranslationKey.ExperienceHideDetails]: "Show less",
  [ETranslationKey.ExperienceToolsAndTechnologies]: "Tools and technologies",

  [ETranslationKey.ExperienceOmnoraCompanyName]:
    "Omnora (fka SlidePresenter) | Startup / Product",
  [ETranslationKey.ExperienceOmnoraJobTitle]: "Web Developer",
  [ETranslationKey.ExperienceOmnoraLocation]: "Germany and Frankfurt | Remote",
  [ETranslationKey.ExperienceOmnoraDescription]:
    "Web Developer | Startup / Product. Full-time.",
  [ETranslationKey.ExperienceOmnoraHighlight1]:
    "Took part in building the portal that serves over 650 companies in the German market, delivering interactive content with seamless LMS integration.",
  [ETranslationKey.ExperienceOmnoraHighlight2]:
    "Contributed to the development of an enterprise-grade learning platform as part of a cross-functional team of 20 engineers, collaborating with designers, product managers, and QA specialists.",
  [ETranslationKey.ExperienceOmnoraHighlight3]:
    "Played a key role in building a custom multimedia player using Canvas API and WebRTC, enabling real-time streaming, multi-layer annotations, and embedding into third-party platforms.",
  [ETranslationKey.ExperienceOmnoraHighlight4]:
    "Helped develop an interactive audio/video editor that allows users to edit multimedia tracks, add overlays, and generate training content directly in the browser.",
  [ETranslationKey.ExperienceOmnoraHighlight5]:
    "Led implementation of SCORM and xAPI standards for detailed tracking of learner progress and interactions within external LMS platforms, ensuring e-learning compliance.",
  [ETranslationKey.ExperienceOmnoraHighlight6]:
    "Integrated AI APIs to enable features such as AI avatars, text-to-speech, and interactive video generation, improving automation and personalization.",
  [ETranslationKey.ExperienceOmnoraHighlight7]:
    "Directed FE modernization by refactoring the codebase into a reactive programming architecture and upgrading to the latest React and TypeScript, improving maintainability and performance.",
  [ETranslationKey.ExperienceOmnoraHighlight8]:
    "Enhanced testing by increasing unit test coverage and adding automated tests integrated into CI/CD pipelines for reliable, faster releases.",
  [ETranslationKey.ExperienceOmnoraHighlight9]:
    "Mentored junior developers, supported onboarding, and promoted best practices within the team.",
  [ETranslationKey.ExperienceDigitalsuitsCompanyName]:
    "DigitalSuits | Outsource / Dedicated Team",
  [ETranslationKey.ExperienceDigitalsuitsJobTitle]:
    "Web Developer & Technical Team Lead",
  [ETranslationKey.ExperienceDigitalsuitsLocation]:
    "Kharkiv, Ukraine | On-site",
  [ETranslationKey.ExperienceDigitalsuitsDescription]:
    "Web Developer & Technical Team Lead | Outsource / Dedicated Team. Full-time.",
  [ETranslationKey.ExperienceDigitalsuitsHighlight1]:
    "Developed an admin panel for managing an interactive chatbots (before active AI agent integrations) used in B2B insurance applications, enabling business users to configure flows, monitor interactions and manage customer communication scenarios.",
  [ETranslationKey.ExperienceDigitalsuitsHighlight2]:
    "Developed a real estate platform tailored for the UK market, providing tools for property listing management, search and client interactions, with a focus on scalability, performance and regulatory compliance.",
  [ETranslationKey.ExperienceDigitalsuitsHighlight3]:
    "Led the development of several web applications from scratch in a cross-functional team of 5 engineers, working in close collaboration with product management and DevOps engineers to ensure smooth delivery, infrastructure readiness and alignment with business priorities.",
  [ETranslationKey.ExperienceDigitalsuitsHighlight4]:
    "Defined and implemented effective team workflows, including task breakdown, prioritization, code review processes and release planning.",
  [ETranslationKey.ExperienceDigitalsuitsHighlight5]:
    "Conducted effort estimation for features and overall project scope, balancing delivery timelines with technical feasibility.",
  [ETranslationKey.ExperienceDigitalsuitsHighlight6]:
    "Designed the overall application architecture, selected the technology stack and was responsible for key technical decisions throughout the project lifecycle.",
  [ETranslationKey.ExperienceDigitalsuitsHighlight7]:
    "Maintained daily communication with business stakeholders, ensuring alignment between technical implementation and product goals.",
  [ETranslationKey.ExperienceDigitalsuitsHighlight8]:
    "Provided technical mentorship, with a strong focus on FE quality, helping coworkers to improve code maintainability, performance and UI consistency.",
  [ETranslationKey.ExperienceCodeAndCareCompanyName]: "Code & Care | Outstaff",
  [ETranslationKey.ExperienceCodeAndCareJobTitle]: "WEB & Mobile Developer",
  [ETranslationKey.ExperienceCodeAndCareLocation]: "Kharkiv, Ukraine | On-site",
  [ETranslationKey.ExperienceCodeAndCareDescription]:
    "WEB & Mobile Developer | Outstaff. Full-time.",
  [ETranslationKey.ExperienceCodeAndCareHighlight1]:
    "Designed and developed web and mobile applications from scratch, covering architecture on FE and BE parts.",
  [ETranslationKey.ExperienceCodeAndCareHighlight2]:
    "Participated in application complexity assessment, effort estimation and architectural planning to ensure scalable and maintainable solutions.",
  [ETranslationKey.ExperienceCodeAndCareHighlight3]:
    "Acted as a mentor for junior developers, supporting their growth through code reviews, technical guidance and onboarding sessions.",
  [ETranslationKey.ExperienceCodeAndCareHighlight4]:
    "Created a real-time monitoring platform for medical sensors for French market, enabling continuous tracking and alerting based on live data streams.",
  [ETranslationKey.ExperienceCodeAndCareHighlight5]:
    "Built and maintained cryptocurrency platforms and wallets, with a strong focus on security, performance and scalability.",
  [ETranslationKey.ExperienceCodeAndCareHighlight6]:
    "Closely collaborated with core teams of crypto platform Bitfinex (https://www.bitfinex.com/) to deliver high-impact features, implement landing pages and mobile applications and ensure protocol compliance.",
  [ETranslationKey.ExperienceLanarsCompanyName]:
    "LANARS | Outsource / Dedicated team",
  [ETranslationKey.ExperienceLanarsJobTitle]: "WEB Developer",
  [ETranslationKey.ExperienceLanarsLocation]:
    "Dnipropetrovsk, Ukraine | On-site",
  [ETranslationKey.ExperienceLanarsDescription]:
    "WEB Developer | Outsource / Dedicated team. Full-time.",
  [ETranslationKey.ExperienceLanarsHighlight1]:
    "Worked as a Full-Stack Developer, delivering both FE and BE solutions across several commercial projects.",
  [ETranslationKey.ExperienceLanarsHighlight2]:
    "Participated in project planning and estimation, providing accurate assessments of required development hours.",
  [ETranslationKey.ExperienceLanarsHighlight3]:
    "Took part in technical discussions and feature breakdowns with team members and stakeholders.",
  [ETranslationKey.ExperienceLanarsHighlight4]:
    "Built responsive landing pages for various products with a focus on performance and maintainability.",
  [ETranslationKey.ExperienceLanarsHighlight5]:
    "Developed backend APIs for mobile applications, including a pet walking service and a marketplace platform.",
  [ETranslationKey.ExperienceLanarsHighlight6]:
    "Implemented an admin panel for a marketplace and a CRM system for a gaming company, enabling operational teams to manage content, users and workflows.",
};

const RU_TRANSLATIONS: Translations = {
  ...EN_TRANSLATIONS,
  [ETranslationKey.NavAbout]: "О себе",
  [ETranslationKey.NavExpirience]: "Опыт",
  [ETranslationKey.NavEducation]: "Образование",
  [ETranslationKey.NavProjects]: "Проекты",
  [ETranslationKey.HeroHiIm]: "Дратути!",
  [ETranslationKey.HeroName]: "Александр",
  [ETranslationKey.HeroSurname]: "Притула",
  [ETranslationKey.HeroRole]:
    "Инженер-программист | WEB-разработчик",
  [ETranslationKey.HeroEngineeringToolkit]: "Мой инженерный стек:",
  [ETranslationKey.HeroNeedMoreDetails]: "НУЖНО БОЛЬШЕ ДЕТАЛЕЙ?",
  [ETranslationKey.HeroCvDownload]: "Скачать CV (PDF)",
  [ETranslationKey.AboutParagraph1]:
    "Я инженер-программист с более чем 10-летним практическим опытом WEB-разработки в следующих доменах: e-Learning, e-Commerce / Marketplaces, Trading, Insurance и Health Care. Я участвовал в создании продуктов в разных моделях сотрудничества — от аутстаффинга до стартапов — быстро адаптируясь к различным процессам, бизнес-целям и командной динамике. Я работал как самостоятельно, так и в командах от 3 до 20 инженеров, часто в международной распределенной среде.",
  [ETranslationKey.AboutParagraph2]:
    "Как Full-Stack WEB-разработчик, я создаю решения от frontend-интерфейсов до backend-сервисов и инфраструктуры. У меня есть опыт работы с монолитной и микросервисной архитектурой, REST/GraphQL API, базами данных SQL (MySQL, SQLite и PostrgeSQL) и MongoDB. Я активно использую Docker и внедряю CI / CD пайплайны для автоматизированного деплоя. Также я применяю фреймворки тестирования, такие как Playwright и Jest, чтобы обеспечивать высокое качество и надежность кода.",
  [ETranslationKey.AboutParagraph3]:
    "В мои обязанности входят оценка и планирование продукта, технические оценки, проектирование архитектуры и определение границ MVP. Я тесно взаимодействую со стейкхолдерами, чтобы формировать требования, выбирать подходящие технологии и обеспечивать поддерживаемость решений. Также я менторю junior-разработчиков, провожу code review и помогаю с онбордингом.",
  [ETranslationKey.AboutParagraph4]:
    "Я придерживаюсь принципа непрерывного обучения и слежу за развитием технологий. Я постоянно применяю и расширяю эти знания в сложных production-задачах. Я регулярно решаю комплексные задачи по программированию и системному дизайну, чтобы развивать алгоритмическое мышление и технические навыки.",
  [ETranslationKey.AboutParagraph5]:
    "Кроме того, я активно интегрирую AI-инструменты — такие как автоматизированная генерация кода, интеллектуальные фреймворки тестирования и утилиты оптимизации производительности — в рабочие процессы разработки, чтобы повышать продуктивность, снижать объем ручной работы и улучшать масштабируемость приложений.",
  [ETranslationKey.EducationDuetUniversityName]:
    "State University of Economics and Technology",
  [ETranslationKey.EducationDuetDegree]:
    "Магистр, инженерия программного обеспечения",
  [ETranslationKey.EducationKnuUniversityName]:
    "Kryvyi Rih National University",
  [ETranslationKey.EducationKnuDegree]:
    "Бакалавр, инженерия программного обеспечения",
  [ETranslationKey.ExperiencePresent]: "Настоящее время",
  [ETranslationKey.ExperienceExpandDetails]: "Показать больше",
  [ETranslationKey.ExperienceHideDetails]: "Скрыть",
  [ETranslationKey.ExperienceToolsAndTechnologies]: "Инструменты и технологии",
  [ETranslationKey.ExperienceOmnoraCompanyName]:
    "Omnora (ранее SlidePresenter) | Стартап / Продукт",
  [ETranslationKey.ExperienceOmnoraJobTitle]: "WEB-разработчик",
  [ETranslationKey.ExperienceOmnoraLocation]: "Германия, Франкфурт | Удаленно",
  [ETranslationKey.ExperienceOmnoraDescription]:
    "WEB-разработчик | Стартап / Продукт. Полная занятость.",
  [ETranslationKey.ExperienceOmnoraHighlight1]:
    "Участвовал в создании портала, который обслуживает более 650 компаний на немецком рынке, предоставляя интерактивный контент с бесшовной интеграцией в LMS.",
  [ETranslationKey.ExperienceOmnoraHighlight2]:
    "Участвовал в разработке корпоративной обучающей платформы в составе кросс-функциональной команды из 20 инженеров, взаимодействуя с дизайнерами, продакт-менеджерами и QA-специалистами.",
  [ETranslationKey.ExperienceOmnoraHighlight3]:
    "Сыграл ключевую роль в создании кастомного мультимедийного плеера на Canvas API и WebRTC, обеспечив потоковую передачу в реальном времени, многослойные аннотации и встраивание в сторонние платформы.",
  [ETranslationKey.ExperienceOmnoraHighlight4]:
    "Помог разработать интерактивный аудио/видео-редактор, позволяющий пользователям редактировать мультимедийные дорожки, добавлять оверлеи и генерировать обучающий контент прямо в браузере.",
  [ETranslationKey.ExperienceOmnoraHighlight5]:
    "Руководил внедрением стандартов SCORM и xAPI для детального трекинга прогресса и действий обучающихся во внешних LMS, обеспечивая соответствие e-learning требованиям.",
  [ETranslationKey.ExperienceOmnoraHighlight6]:
    "Интегрировал AI API для реализации функций AI-аватаров, преобразования текста в речь и генерации интерактивного видео, повышая автоматизацию и персонализацию.",
  [ETranslationKey.ExperienceOmnoraHighlight7]:
    "Курировал модернизацию frontend-части: рефакторинг кодовой базы к реактивной архитектуре и обновление до актуальных React и TypeScript, что повысило поддерживаемость и производительность.",
  [ETranslationKey.ExperienceOmnoraHighlight8]:
    "Улучшил качество тестирования, повысив покрытие unit-тестами и добавив автотесты в CI/CD пайплайны для более надежных и быстрых релизов.",
  [ETranslationKey.ExperienceOmnoraHighlight9]:
    "Менторил junior-разработчиков, помогал с онбордингом и продвигал лучшие инженерные практики в команде.",
  [ETranslationKey.ExperienceDigitalsuitsCompanyName]:
    "DigitalSuits | Аутсорс / Выделенная команда",
  [ETranslationKey.ExperienceDigitalsuitsJobTitle]:
    "WEB-разработчик и технический тимлид",
  [ETranslationKey.ExperienceDigitalsuitsLocation]: "Харьков, Украина | Офис",
  [ETranslationKey.ExperienceDigitalsuitsDescription]:
    "WEB-разработчик и технический тимлид | Аутсорс / Выделенная команда. Полная занятость.",
  [ETranslationKey.ExperienceDigitalsuitsHighlight1]:
    "Разработал админ-панель для управления интерактивными чат-ботами (до активного внедрения AI-агентов) в B2B страховых приложениях: настройка сценариев, мониторинг взаимодействий и управление коммуникацией с клиентами.",
  [ETranslationKey.ExperienceDigitalsuitsHighlight2]:
    "Разработал платформу недвижимости для рынка Великобритании с инструментами управления объявлениями, поиска и взаимодействия с клиентами, с фокусом на масштабируемость, производительность и соответствие требованиям.",
  [ETranslationKey.ExperienceDigitalsuitsHighlight3]:
    "Возглавил разработку нескольких веб-приложений с нуля в кросс-функциональной команде из 5 инженеров в тесной связке с product management и DevOps для стабильной поставки и соответствия бизнес-целям.",
  [ETranslationKey.ExperienceDigitalsuitsHighlight4]:
    "Определил и внедрил эффективные процессы команды: декомпозиция задач, приоритизация, code review и планирование релизов.",
  [ETranslationKey.ExperienceDigitalsuitsHighlight5]:
    "Проводил оценку трудозатрат по фичам и всему проектному скоупу, балансируя сроки поставки и техническую реализуемость.",
  [ETranslationKey.ExperienceDigitalsuitsHighlight6]:
    "Спроектировал общую архитектуру приложений, выбрал технологический стек и отвечал за ключевые технические решения на всем жизненном цикле проекта.",
  [ETranslationKey.ExperienceDigitalsuitsHighlight7]:
    "Поддерживал ежедневную коммуникацию с бизнес-стейкхолдерами, обеспечивая соответствие между технической реализацией и продуктовыми целями.",
  [ETranslationKey.ExperienceDigitalsuitsHighlight8]:
    "Оказывал техническое менторство с сильным фокусом на качестве frontend-кода, помогая коллегам улучшать поддерживаемость, производительность и консистентность UI.",
  [ETranslationKey.ExperienceCodeAndCareCompanyName]: "Code & Care | Аутстафф",
  [ETranslationKey.ExperienceCodeAndCareJobTitle]:
    "WEB- и мобильный разработчик",
  [ETranslationKey.ExperienceCodeAndCareLocation]: "Харьков, Украина | Офис",
  [ETranslationKey.ExperienceCodeAndCareDescription]:
    "WEB- и мобильный разработчик | Аутстафф. Полная занятость.",
  [ETranslationKey.ExperienceCodeAndCareHighlight1]:
    "Проектировал и разрабатывал веб- и мобильные приложения с нуля, включая архитектуру frontend и backend частей.",
  [ETranslationKey.ExperienceCodeAndCareHighlight2]:
    "Участвовал в оценке сложности приложений, расчете трудозатрат и архитектурном планировании для обеспечения масштабируемых и поддерживаемых решений.",
  [ETranslationKey.ExperienceCodeAndCareHighlight3]:
    "Выступал ментором для junior-разработчиков, поддерживая их рост через code review, техническое наставничество и онбординг.",
  [ETranslationKey.ExperienceCodeAndCareHighlight4]:
    "Создал платформу мониторинга медицинских сенсоров в реальном времени для французского рынка, обеспечив непрерывное отслеживание и алертинг на основе потоковых данных.",
  [ETranslationKey.ExperienceCodeAndCareHighlight5]:
    "Разрабатывал и поддерживал криптовалютные платформы и кошельки с акцентом на безопасность, производительность и масштабируемость.",
  [ETranslationKey.ExperienceCodeAndCareHighlight6]:
    "Тесно сотрудничал с core-командами криптоплатформы Bitfinex (https://www.bitfinex.com/), реализуя ключевые функции, landing pages и мобильные приложения, а также обеспечивая соответствие протоколам.",
  [ETranslationKey.ExperienceLanarsCompanyName]:
    "LANARS | Аутсорс / Выделенная команда",
  [ETranslationKey.ExperienceLanarsJobTitle]: "WEB-разработчик",
  [ETranslationKey.ExperienceLanarsLocation]: "Днепропетровск, Украина | Офис",
  [ETranslationKey.ExperienceLanarsDescription]:
    "WEB-разработчик | Аутсорс / Выделенная команда. Полная занятость.",
  [ETranslationKey.ExperienceLanarsHighlight1]:
    "Работал Full-Stack разработчиком, реализуя frontend и backend решения в нескольких коммерческих проектах.",
  [ETranslationKey.ExperienceLanarsHighlight2]:
    "Участвовал в планировании и оценке проектов, предоставляя точные оценки необходимых часов разработки.",
  [ETranslationKey.ExperienceLanarsHighlight3]:
    "Принимал участие в технических обсуждениях и декомпозиции фич с командой и стейкхолдерами.",
  [ETranslationKey.ExperienceLanarsHighlight4]:
    "Разрабатывал адаптивные landing pages для различных продуктов с фокусом на производительность и поддерживаемость.",
  [ETranslationKey.ExperienceLanarsHighlight5]:
    "Разрабатывал backend API для мобильных приложений, включая сервис выгула домашних животных и платформу маркетплейса.",
  [ETranslationKey.ExperienceLanarsHighlight6]:
    "Реализовал админ-панель для маркетплейса и CRM-систему для игровой компании, что позволило операционным командам управлять контентом, пользователями и рабочими процессами.",
};

const SP_TRANSLATIONS: Translations = {
  ...EN_TRANSLATIONS,
  [ETranslationKey.NavAbout]: "Sobre mí",
  [ETranslationKey.NavExpirience]: "Experiencia",
  [ETranslationKey.NavEducation]: "Educación",
  [ETranslationKey.NavProjects]: "Proyectos",
  [ETranslationKey.HeroHiIm]: "HOLA!",
  [ETranslationKey.HeroRole]:
    "Ingeniero de software | Desarrollador WEB",
  [ETranslationKey.HeroEngineeringToolkit]: "Mi stack de ingeniería:",
  [ETranslationKey.HeroNeedMoreDetails]: "¿NECESITAS MÁS DETALLES?",
  [ETranslationKey.HeroCvDownload]: "Descargar CV (PDF)",
  [ETranslationKey.AboutParagraph1]:
    "Soy Ingeniero de Software con más de 10 años de experiencia práctica en desarrollo WEB en los siguientes dominios: e-Learning, e-Commerce / Marketplaces, Trading, Insurance y Health Care. He contribuido a productos en distintos modelos de colaboración, desde outstaffing hasta startups, adaptándome rápidamente a diferentes flujos de trabajo, objetivos de negocio y dinámicas de equipo. He trabajado tanto de forma independiente como en equipos de 3 a 20 ingenieros, a menudo en entornos internacionales y distribuidos.",
  [ETranslationKey.AboutParagraph2]:
    "Como desarrollador Full-Stack WEB, entrego soluciones desde interfaces frontend hasta servicios backend e infraestructura. Tengo experiencia con arquitecturas monolíticas y de microservicios, APIs REST/GraphQL y bases de datos como SQL (MySQL, SQLite y PostrgeSQL) y MongoDB. Utilizo activamente Docker e implemento pipelines de CI / CD para despliegues automatizados. Además, uso frameworks de testing como Playwright y Jest para garantizar alta calidad y fiabilidad del código.",
  [ETranslationKey.AboutParagraph3]:
    "Mis responsabilidades incluyen evaluación y planificación de producto, estimaciones técnicas, diseño de arquitectura y definición del alcance del MVP. Colaboro estrechamente con stakeholders para definir requisitos, seleccionar tecnologías adecuadas y asegurar la mantenibilidad. También mentorizo a desarrolladores junior, realizo revisiones de código y apoyo el onboarding.",
  [ETranslationKey.AboutParagraph4]:
    "Estoy comprometido con el aprendizaje continuo y con mantenerme actualizado en tecnologías en evolución. Sigo aplicando y ampliando este conocimiento a través de tareas desafiantes de ingeniería en producción. Resuelvo regularmente problemas complejos de programación y diseño de sistemas para fortalecer mi pensamiento algorítmico y mis habilidades técnicas.",
  [ETranslationKey.AboutParagraph5]:
    "Además, integro activamente herramientas impulsadas por IA — como generación automática de código, frameworks de testing inteligentes y utilidades de optimización de rendimiento — en mis flujos de desarrollo para aumentar la productividad, reducir el trabajo manual y mejorar la escalabilidad de las aplicaciones.",
  [ETranslationKey.EducationDuetUniversityName]:
    "State University of Economics and Technology",
  [ETranslationKey.EducationDuetDegree]: "Máster, Ingeniería de Software",
  [ETranslationKey.EducationKnuUniversityName]:
    "Kryvyi Rih National University",
  [ETranslationKey.EducationKnuDegree]: "Grado, Ingeniería de Software",
  [ETranslationKey.ExperiencePresent]: "Presente",
  [ETranslationKey.ExperienceExpandDetails]: "Mostrar más",
  [ETranslationKey.ExperienceHideDetails]: "Mostrar menos",
  [ETranslationKey.ExperienceToolsAndTechnologies]:
    "Herramientas y tecnologias",
  [ETranslationKey.ExperienceOmnoraCompanyName]:
    "Omnora (antes SlidePresenter) | Startup / Producto",
  [ETranslationKey.ExperienceOmnoraJobTitle]: "Desarrollador WEB",
  [ETranslationKey.ExperienceOmnoraLocation]: "Alemania y Fráncfort | Remoto",
  [ETranslationKey.ExperienceOmnoraDescription]:
    "Desarrollador WEB | Startup / Producto. Tiempo completo.",
  [ETranslationKey.ExperienceOmnoraHighlight1]:
    "Participé en la creación de un portal que da servicio a más de 650 empresas del mercado alemán, ofreciendo contenido interactivo con integración fluida con LMS.",
  [ETranslationKey.ExperienceOmnoraHighlight2]:
    "Contribuí al desarrollo de una plataforma de aprendizaje empresarial como parte de un equipo multidisciplinar de 20 ingenieros, colaborando con diseñadores, product managers y especialistas de QA.",
  [ETranslationKey.ExperienceOmnoraHighlight3]:
    "Tuve un rol clave en la creación de un reproductor multimedia personalizado con Canvas API y WebRTC, habilitando streaming en tiempo real, anotaciones multicapa e integración en plataformas de terceros.",
  [ETranslationKey.ExperienceOmnoraHighlight4]:
    "Ayudé a desarrollar un editor interactivo de audio y video que permite editar pistas multimedia, añadir overlays y generar contenido formativo directamente en el navegador.",
  [ETranslationKey.ExperienceOmnoraHighlight5]:
    "Lideré la implementación de estándares SCORM y xAPI para el seguimiento detallado del progreso e interacciones de los alumnos en LMS externos, asegurando el cumplimiento en e-learning.",
  [ETranslationKey.ExperienceOmnoraHighlight6]:
    "Integré APIs de IA para habilitar funciones como avatares de IA, texto a voz y generación de video interactivo, mejorando la automatización y la personalización.",
  [ETranslationKey.ExperienceOmnoraHighlight7]:
    "Dirigí la modernización del frontend mediante el refactor de la base de código hacia una arquitectura reactiva y la actualización a React y TypeScript actuales, mejorando mantenibilidad y rendimiento.",
  [ETranslationKey.ExperienceOmnoraHighlight8]:
    "Mejoré la estrategia de testing aumentando la cobertura de pruebas unitarias e incorporando pruebas automáticas en pipelines de CI/CD para lanzamientos más rápidos y fiables.",
  [ETranslationKey.ExperienceOmnoraHighlight9]:
    "Mentoricé a desarrolladores junior, apoyé el onboarding y promoví buenas prácticas dentro del equipo.",
  [ETranslationKey.ExperienceDigitalsuitsCompanyName]:
    "DigitalSuits | Outsource / Equipo dedicado",
  [ETranslationKey.ExperienceDigitalsuitsJobTitle]:
    "Desarrollador WEB y Líder Técnico",
  [ETranslationKey.ExperienceDigitalsuitsLocation]:
    "Járkov, Ucrania | Presencial",
  [ETranslationKey.ExperienceDigitalsuitsDescription]:
    "Desarrollador WEB y Líder Técnico | Outsource / Equipo dedicado. Tiempo completo.",
  [ETranslationKey.ExperienceDigitalsuitsHighlight1]:
    "Desarrollé un panel de administración para gestionar chatbots interactivos (antes de la integración activa de agentes de IA) usados en aplicaciones B2B de seguros, permitiendo configurar flujos, monitorizar interacciones y gestionar escenarios de comunicación con clientes.",
  [ETranslationKey.ExperienceDigitalsuitsHighlight2]:
    "Desarrollé una plataforma inmobiliaria orientada al mercado del Reino Unido, con herramientas para gestión de propiedades, búsqueda e interacción con clientes, enfocada en escalabilidad, rendimiento y cumplimiento normativo.",
  [ETranslationKey.ExperienceDigitalsuitsHighlight3]:
    "Lideré el desarrollo desde cero de varias aplicaciones web en un equipo multidisciplinar de 5 ingenieros, colaborando estrechamente con product management y DevOps para asegurar entregas fluidas y alineación con prioridades de negocio.",
  [ETranslationKey.ExperienceDigitalsuitsHighlight4]:
    "Definí e implementé flujos de trabajo eficaces del equipo, incluyendo descomposición de tareas, priorización, revisiones de código y planificación de releases.",
  [ETranslationKey.ExperienceDigitalsuitsHighlight5]:
    "Realicé estimaciones de esfuerzo para funcionalidades y alcance global del proyecto, equilibrando plazos de entrega con viabilidad técnica.",
  [ETranslationKey.ExperienceDigitalsuitsHighlight6]:
    "Diseñé la arquitectura general de las aplicaciones, seleccioné el stack tecnológico y asumí decisiones técnicas clave durante todo el ciclo de vida del proyecto.",
  [ETranslationKey.ExperienceDigitalsuitsHighlight7]:
    "Mantuve comunicación diaria con stakeholders del negocio para asegurar la alineación entre implementación técnica y objetivos del producto.",
  [ETranslationKey.ExperienceDigitalsuitsHighlight8]:
    "Brindé mentoría técnica con fuerte foco en la calidad frontend, ayudando al equipo a mejorar mantenibilidad del código, rendimiento y consistencia de UI.",
  [ETranslationKey.ExperienceCodeAndCareCompanyName]: "Code & Care | Outstaff",
  [ETranslationKey.ExperienceCodeAndCareJobTitle]: "Desarrollador WEB y Móvil",
  [ETranslationKey.ExperienceCodeAndCareLocation]:
    "Járkov, Ucrania | Presencial",
  [ETranslationKey.ExperienceCodeAndCareDescription]:
    "Desarrollador WEB y Móvil | Outstaff. Tiempo completo.",
  [ETranslationKey.ExperienceCodeAndCareHighlight1]:
    "Diseñé y desarrollé aplicaciones web y móviles desde cero, cubriendo la arquitectura de frontend y backend.",
  [ETranslationKey.ExperienceCodeAndCareHighlight2]:
    "Participé en la evaluación de complejidad, estimación de esfuerzo y planificación arquitectónica para asegurar soluciones escalables y mantenibles.",
  [ETranslationKey.ExperienceCodeAndCareHighlight3]:
    "Actué como mentor de desarrolladores junior, apoyando su crecimiento mediante revisiones de código, guía técnica y sesiones de onboarding.",
  [ETranslationKey.ExperienceCodeAndCareHighlight4]:
    "Creé una plataforma en tiempo real para monitorización de sensores médicos para el mercado francés, permitiendo seguimiento continuo y alertas basadas en flujos de datos en vivo.",
  [ETranslationKey.ExperienceCodeAndCareHighlight5]:
    "Desarrollé y mantuve plataformas y billeteras de criptomonedas con fuerte foco en seguridad, rendimiento y escalabilidad.",
  [ETranslationKey.ExperienceCodeAndCareHighlight6]:
    "Colaboré estrechamente con equipos core de la plataforma cripto Bitfinex (https://www.bitfinex.com/) para entregar funcionalidades de alto impacto, implementar landing pages y aplicaciones móviles y asegurar cumplimiento de protocolos.",
  [ETranslationKey.ExperienceLanarsCompanyName]:
    "LANARS | Outsource / Equipo dedicado",
  [ETranslationKey.ExperienceLanarsJobTitle]: "Desarrollador WEB",
  [ETranslationKey.ExperienceLanarsLocation]:
    "Dnipropetrovsk, Ucrania | Presencial",
  [ETranslationKey.ExperienceLanarsDescription]:
    "Desarrollador WEB | Outsource / Equipo dedicado. Tiempo completo.",
  [ETranslationKey.ExperienceLanarsHighlight1]:
    "Trabajé como desarrollador Full-Stack, entregando soluciones frontend y backend en varios proyectos comerciales.",
  [ETranslationKey.ExperienceLanarsHighlight2]:
    "Participé en la planificación y estimación de proyectos, proporcionando evaluaciones precisas de horas de desarrollo requeridas.",
  [ETranslationKey.ExperienceLanarsHighlight3]:
    "Participé en discusiones técnicas y descomposición de funcionalidades con el equipo y stakeholders.",
  [ETranslationKey.ExperienceLanarsHighlight4]:
    "Desarrollé landing pages responsive para distintos productos, con foco en rendimiento y mantenibilidad.",
  [ETranslationKey.ExperienceLanarsHighlight5]:
    "Desarrollé APIs backend para aplicaciones móviles, incluyendo un servicio de paseo de mascotas y una plataforma marketplace.",
  [ETranslationKey.ExperienceLanarsHighlight6]:
    "Implementé un panel de administración para un marketplace y un sistema CRM para una empresa de videojuegos, permitiendo a los equipos operativos gestionar contenido, usuarios y flujos de trabajo.",
};

const DE_TRANSLATIONS: Translations = {
  ...EN_TRANSLATIONS,
  [ETranslationKey.NavAbout]: "Über mich",
  [ETranslationKey.NavExpirience]: "Erfahrung",
  [ETranslationKey.NavEducation]: "Ausbildung",
  [ETranslationKey.NavProjects]: "Projekte",
  [ETranslationKey.HeroHiIm]: "Hallo!",
  [ETranslationKey.HeroRole]: "Softwareingenieur | WEB-Entwickler",
  [ETranslationKey.HeroEngineeringToolkit]: "Mein Engineering-Toolkit",
  [ETranslationKey.HeroNeedMoreDetails]: "MEHR DETAILS NÖTIG?",
  [ETranslationKey.HeroCvDownload]: "CV (PDF) herunterladen",
  [ETranslationKey.AboutParagraph1]:
    "Ich bin Softwareingenieur mit über 10 Jahren praktischer Erfahrung in der WEB-Entwicklung in folgenden Domänen: e-Learning, e-Commerce / Marketplaces, Trading, Insurance und Health Care. Ich habe zu Produkten in verschiedenen Delivery-Modellen beigetragen — von Outstaffing bis zu Startups — und mich schnell an unterschiedliche Arbeitsabläufe, Geschäftsziele und Teamdynamiken angepasst. Ich habe sowohl eigenständig als auch in Teams von 3 bis 20 Ingenieuren gearbeitet, häufig in internationalen, verteilten Umgebungen.",
  [ETranslationKey.AboutParagraph2]:
    "Als Full-Stack WEB-Entwickler liefere ich Lösungen von Frontend-Oberflächen bis hin zu Backend-Services und Infrastruktur. Ich habe Erfahrung mit monolithischen und Microservice-Architekturen, REST/GraphQL-APIs sowie Datenbanken wie SQL (MySQL, SQLite und PostrgeSQL) und MongoDB. Ich nutze Docker aktiv und implementiere CI / CD-Pipelines für automatisierte Deployments. Außerdem setze ich Test-Frameworks wie Playwright und Jest ein, um hohe Codequalität und Zuverlässigkeit sicherzustellen.",
  [ETranslationKey.AboutParagraph3]:
    "Zu meinen Aufgaben gehören Produktevaluierung und -planung, technische Aufwandsabschätzungen, Architekturdesign und MVP-Abgrenzung. Ich arbeite eng mit Stakeholdern zusammen, um Anforderungen zu definieren, passende Technologien auszuwählen und Wartbarkeit sicherzustellen. Außerdem betreue ich Junior-Entwickler, führe Code-Reviews durch und unterstütze beim Onboarding.",
  [ETranslationKey.AboutParagraph4]:
    "Ich verfolge kontinuierliches Lernen und halte mich über technologische Entwicklungen auf dem Laufenden. Dieses Wissen wende ich in anspruchsvollen Production-Engineering-Aufgaben an und erweitere es fortlaufend. Ich löse regelmäßig komplexe Programmier- und Systemdesign-Probleme, um mein algorithmisches Denken und meine technischen Fähigkeiten zu schärfen.",
  [ETranslationKey.AboutParagraph5]:
    "Darüber hinaus integriere ich aktiv KI-gestützte Tools — wie automatische Codegenerierung, intelligente Test-Frameworks und Performance-Optimierungswerkzeuge — in meine Entwicklungsabläufe, um die Produktivität zu steigern, manuellen Aufwand zu reduzieren und die Skalierbarkeit von Anwendungen zu verbessern.",
  [ETranslationKey.EducationDuetUniversityName]:
    "State University of Economics and Technology",
  [ETranslationKey.EducationDuetDegree]: "Masterabschluss, Softwaretechnik",
  [ETranslationKey.EducationKnuUniversityName]:
    "Kryvyi Rih National University",
  [ETranslationKey.EducationKnuDegree]: "Bachelorabschluss, Softwaretechnik",
  [ETranslationKey.ExperiencePresent]: "Heute",
  [ETranslationKey.ExperienceExpandDetails]: "Mehr anzeigen",
  [ETranslationKey.ExperienceHideDetails]: "Weniger anzeigen",
  [ETranslationKey.ExperienceToolsAndTechnologies]: "Tools und Technologien",
  [ETranslationKey.ExperienceOmnoraCompanyName]:
    "Omnora (ehemals SlidePresenter) | Startup / Produkt",
  [ETranslationKey.ExperienceOmnoraJobTitle]: "WEB-Entwickler",
  [ETranslationKey.ExperienceOmnoraLocation]:
    "Deutschland und Frankfurt | Remote",
  [ETranslationKey.ExperienceOmnoraDescription]:
    "WEB-Entwickler | Startup / Produkt. Vollzeit.",
  [ETranslationKey.ExperienceOmnoraHighlight1]:
    "Ich war am Aufbau eines Portals beteiligt, das mehr als 650 Unternehmen im deutschen Markt bedient und interaktive Inhalte mit nahtloser LMS-Integration bereitstellt.",
  [ETranslationKey.ExperienceOmnoraHighlight2]:
    "Ich habe zur Entwicklung einer Enterprise-Lernplattform als Teil eines funktionsübergreifenden Teams aus 20 Ingenieuren beigetragen und eng mit Design, Produktmanagement und QA zusammengearbeitet.",
  [ETranslationKey.ExperienceOmnoraHighlight3]:
    "Ich spielte eine zentrale Rolle beim Aufbau eines kundenspezifischen Multimedia-Players mit Canvas API und WebRTC, inklusive Echtzeit-Streaming, mehrschichtiger Annotationen und Einbettung in Drittplattformen.",
  [ETranslationKey.ExperienceOmnoraHighlight4]:
    "Ich half bei der Entwicklung eines interaktiven Audio-/Video-Editors, mit dem Nutzer Multimedia-Spuren bearbeiten, Overlays hinzufügen und Trainingsinhalte direkt im Browser erstellen können.",
  [ETranslationKey.ExperienceOmnoraHighlight5]:
    "Ich leitete die Implementierung von SCORM- und xAPI-Standards für detailliertes Tracking von Lernfortschritt und Interaktionen in externen LMS-Systemen und stellte E-Learning-Compliance sicher.",
  [ETranslationKey.ExperienceOmnoraHighlight6]:
    "Ich integrierte KI-APIs für Funktionen wie KI-Avatare, Text-to-Speech und interaktive Videoerstellung, wodurch Automatisierung und Personalisierung verbessert wurden.",
  [ETranslationKey.ExperienceOmnoraHighlight7]:
    "Ich verantwortete die Frontend-Modernisierung durch Refactoring auf eine reaktive Architektur und ein Upgrade auf aktuelle React- und TypeScript-Versionen, was Wartbarkeit und Performance erhöhte.",
  [ETranslationKey.ExperienceOmnoraHighlight8]:
    "Ich verbesserte die Teststrategie durch höhere Unit-Test-Abdeckung und zusätzliche automatisierte Tests in CI/CD-Pipelines für schnellere und zuverlässigere Releases.",
  [ETranslationKey.ExperienceOmnoraHighlight9]:
    "Ich mentorierte Junior-Entwickler, unterstützte beim Onboarding und etablierte Best Practices im Team.",
  [ETranslationKey.ExperienceDigitalsuitsCompanyName]:
    "DigitalSuits | Outsourcing / Dediziertes Team",
  [ETranslationKey.ExperienceDigitalsuitsJobTitle]:
    "WEB-Entwickler und Technischer Teamleiter",
  [ETranslationKey.ExperienceDigitalsuitsLocation]:
    "Charkiw, Ukraine | Vor Ort",
  [ETranslationKey.ExperienceDigitalsuitsDescription]:
    "WEB-Entwickler und Technischer Teamleiter | Outsourcing / Dediziertes Team. Vollzeit.",
  [ETranslationKey.ExperienceDigitalsuitsHighlight1]:
    "Ich entwickelte ein Admin-Panel zur Verwaltung interaktiver Chatbots (vor der aktiven Integration von KI-Agenten) für B2B-Versicherungsanwendungen, inklusive Flow-Konfiguration, Interaktionsmonitoring und Verwaltung von Kundenkommunikationsszenarien.",
  [ETranslationKey.ExperienceDigitalsuitsHighlight2]:
    "Ich entwickelte eine Immobilienplattform für den britischen Markt mit Funktionen für Objektverwaltung, Suche und Kundeninteraktion, mit Fokus auf Skalierbarkeit, Performance und regulatorische Compliance.",
  [ETranslationKey.ExperienceDigitalsuitsHighlight3]:
    "Ich leitete die Entwicklung mehrerer Webanwendungen von Grund auf in einem funktionsübergreifenden Team von 5 Ingenieuren und arbeitete eng mit Produktmanagement und DevOps zusammen, um stabile Delivery sicherzustellen.",
  [ETranslationKey.ExperienceDigitalsuitsHighlight4]:
    "Ich definierte und implementierte effektive Teamprozesse, darunter Task-Breakdown, Priorisierung, Code-Review-Prozesse und Release-Planung.",
  [ETranslationKey.ExperienceDigitalsuitsHighlight5]:
    "Ich führte Aufwandsschätzungen für Features und den gesamten Projektscope durch und balancierte Liefertermine mit technischer Machbarkeit.",
  [ETranslationKey.ExperienceDigitalsuitsHighlight6]:
    "Ich entwarf die Gesamtarchitektur der Anwendungen, wählte den Technologie-Stack aus und verantwortete zentrale technische Entscheidungen über den gesamten Projektlebenszyklus.",
  [ETranslationKey.ExperienceDigitalsuitsHighlight7]:
    "Ich pflegte die tägliche Kommunikation mit Business-Stakeholdern, um die Ausrichtung zwischen technischer Umsetzung und Produktzielen sicherzustellen.",
  [ETranslationKey.ExperienceDigitalsuitsHighlight8]:
    "Ich leistete technisches Mentoring mit starkem Fokus auf Frontend-Qualität und half Kollegen, Wartbarkeit, Performance und UI-Konsistenz zu verbessern.",
  [ETranslationKey.ExperienceCodeAndCareCompanyName]:
    "Code & Care | Outstaffing",
  [ETranslationKey.ExperienceCodeAndCareJobTitle]: "WEB- und Mobile-Entwickler",
  [ETranslationKey.ExperienceCodeAndCareLocation]: "Charkiw, Ukraine | Vor Ort",
  [ETranslationKey.ExperienceCodeAndCareDescription]:
    "WEB- und Mobile-Entwickler | Outstaffing. Vollzeit.",
  [ETranslationKey.ExperienceCodeAndCareHighlight1]:
    "Ich entwarf und entwickelte Web- und Mobile-Anwendungen von Grund auf und deckte dabei die Architektur von Frontend und Backend ab.",
  [ETranslationKey.ExperienceCodeAndCareHighlight2]:
    "Ich beteiligte mich an Komplexitätsbewertung, Aufwandsschätzung und Architekturplanung, um skalierbare und wartbare Lösungen sicherzustellen.",
  [ETranslationKey.ExperienceCodeAndCareHighlight3]:
    "Ich war Mentor für Junior-Entwickler und unterstützte deren Wachstum durch Code-Reviews, technische Anleitung und Onboarding-Sessions.",
  [ETranslationKey.ExperienceCodeAndCareHighlight4]:
    "Ich entwickelte eine Echtzeit-Monitoring-Plattform für medizinische Sensoren für den französischen Markt, inklusive kontinuierlichem Tracking und Alerting auf Basis von Live-Datenströmen.",
  [ETranslationKey.ExperienceCodeAndCareHighlight5]:
    "Ich entwickelte und betreute Krypto-Plattformen und Wallets mit starkem Fokus auf Sicherheit, Performance und Skalierbarkeit.",
  [ETranslationKey.ExperienceCodeAndCareHighlight6]:
    "Ich arbeitete eng mit den Core-Teams der Krypto-Plattform Bitfinex (https://www.bitfinex.com/) zusammen, um wirkungsstarke Features, Landingpages und Mobile-Apps umzusetzen und Protokoll-Compliance sicherzustellen.",
  [ETranslationKey.ExperienceLanarsCompanyName]:
    "LANARS | Outsourcing / Dediziertes Team",
  [ETranslationKey.ExperienceLanarsJobTitle]: "WEB-Entwickler",
  [ETranslationKey.ExperienceLanarsLocation]:
    "Dnipropetrowsk, Ukraine | Vor Ort",
  [ETranslationKey.ExperienceLanarsDescription]:
    "WEB-Entwickler | Outsourcing / Dediziertes Team. Vollzeit.",
  [ETranslationKey.ExperienceLanarsHighlight1]:
    "Ich arbeitete als Full-Stack-Entwickler und lieferte Frontend- und Backend-Lösungen in mehreren kommerziellen Projekten.",
  [ETranslationKey.ExperienceLanarsHighlight2]:
    "Ich war an Projektplanung und Aufwandsschätzung beteiligt und lieferte präzise Einschätzungen der benötigten Entwicklungsstunden.",
  [ETranslationKey.ExperienceLanarsHighlight3]:
    "Ich nahm an technischen Diskussionen und Feature-Breakdowns mit Teammitgliedern und Stakeholdern teil.",
  [ETranslationKey.ExperienceLanarsHighlight4]:
    "Ich entwickelte responsive Landingpages für verschiedene Produkte mit Fokus auf Performance und Wartbarkeit.",
  [ETranslationKey.ExperienceLanarsHighlight5]:
    "Ich entwickelte Backend-APIs für Mobile-Anwendungen, darunter einen Haustier-Spazierdienst und eine Marketplace-Plattform.",
  [ETranslationKey.ExperienceLanarsHighlight6]:
    "Ich implementierte ein Admin-Panel für einen Marketplace sowie ein CRM-System für ein Gaming-Unternehmen, wodurch operative Teams Inhalte, Nutzer und Workflows verwalten konnten.",
};

export const TRANSLATIONS: Record<ELocale, Translations> = {
  [ELocale.En]: EN_TRANSLATIONS,
  [ELocale.Ru]: RU_TRANSLATIONS,
  [ELocale.Sp]: SP_TRANSLATIONS,
  [ELocale.De]: DE_TRANSLATIONS,
};
