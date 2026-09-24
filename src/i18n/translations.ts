import { ELocale, ETranslationKey } from "./types";
import type { Translations } from "./types";

const EN_TRANSLATIONS: Translations = {
  [ETranslationKey.LocaleEn]: "EN",
  [ETranslationKey.LocaleRu]: "RU",
  [ETranslationKey.LocaleSp]: "SP",
  [ETranslationKey.LocaleDe]: "DE",
  [ETranslationKey.NavAbout]: "About",
  [ETranslationKey.NavExperience]: "Experience",
  [ETranslationKey.NavEducation]: "Education",
  [ETranslationKey.NavProjects]: "Projects",
  [ETranslationKey.NavGithub]: "GitHub",
  [ETranslationKey.NavLinkedIn]: "LinkedIn",
  [ETranslationKey.NavLeetCode]: "LeetCode",
  [ETranslationKey.NavEmail]: "Gmail",
  [ETranslationKey.A11yLogo]: "Logo",
  [ETranslationKey.A11yOpenMenu]: "Open menu",
  [ETranslationKey.A11yCloseMenu]: "Close menu",
  [ETranslationKey.A11ySectionNavigation]: "Section navigation",
  [ETranslationKey.A11yLanguage]: "Language",
  [ETranslationKey.HeroHiIm]: "Hi, I'm",
  [ETranslationKey.HeroName]: "Oleksandr",
  [ETranslationKey.HeroSurname]: "Prytula",
  [ETranslationKey.HeroRolePrimary]: "Software Engineer",
  [ETranslationKey.HeroRoleSecondary]: "WEB Developer",
  [ETranslationKey.HeroEngineeringToolkit]: "My Core Engineering Toolkit:",
  [ETranslationKey.HeroNeedMoreDetails]: "Need more details?",
  [ETranslationKey.HeroCvDownload]: "Download CV (PDF)",
  [ETranslationKey.AboutParagraph1]:
    "I am a Software Engineer with over 10 years of experience in Full Stack WEB Development across E-Learning, E-Commerce, Marketplaces, Trading, Insurance, and Healthcare. My background encompasses projects of varying scale, including work in startup environments and outstaffing engagements. This breadth of experience has strengthened my ability to adapt to diverse team structures, engineering practices, and evolving business priorities while maintaining a consistent focus on software quality and delivering solutions that meet business needs.",
  [ETranslationKey.AboutParagraph2]:
    "My experience encompasses frontend applications, backend services, databases, and deployment infrastructure. I develop web interfaces with React, Vue, and Angular. On the backend, I use Go, Python, and Node.js to implement services, APIs, and background processing. I have experience with both monolithic and microservice architectures, REST and GraphQL APIs, and databases such as MySQL and MongoDB. I use Docker for containerization, Kubernetes for orchestration, and message brokers for asynchronous communication between services. I also configure continuous integration and deployment pipelines to automate software delivery. Automated testing with Playwright and Jest forms an integral part of my approach to code quality, maintainability, and system reliability. I incorporate AI-assisted development tools into my workflow to support implementation, debugging and refactoring, while critically reviewing generated code.",
  [ETranslationKey.AboutParagraph3]:
    "Throughout my career, I have worked in engineering teams ranging from 3 to 20 members, frequently within international and distributed environments. English is my primary working language for technical discussions and client communication. I am accustomed to working across teams, clarifying business requirements, and communicating technical considerations to both engineering colleagues and non-technical stakeholders. I also mentor junior developers, providing technical guidance, sharing knowledge, and supporting their professional development.",
  [ETranslationKey.AboutParagraph4]:
    "I hold a master’s degree in Software Engineering, which provided a solid foundation in software architecture, secure coding practices, algorithms, and systems thinking. I continue to expand my expertise by solving algorithmic problems on LeetCode, practicing system design, taking professional courses, pursuing certifications, and studying technical literature.",
  [ETranslationKey.EducationDuetUniversityName]:
    "State University of Economics and Technology",
  [ETranslationKey.EducationDuetDegree]:
    "Master's degree, Computer Software Engineering",
  [ETranslationKey.EducationDuetHighlight1]:
    "Undertook advanced study of mathematical modeling tools and algorithm design, with a focus on computational problem-solving and applied modeling techniques.",
  [ETranslationKey.EducationDuetHighlight2]:
    "Developed deeper expertise in 3D graphics technologies, including OpenGL, for scientific and high-performance software applications.",
  [ETranslationKey.EducationDuetHighlight3]:
    "Completed coursework in Scientific Research Methodology, covering research design, academic writing, and analytical methods.",
  [ETranslationKey.EducationDuetHighlight4]:
    "Studied IT Law, including the legal aspects of software development, digital technologies, and intellectual property.",
  [ETranslationKey.EducationDuetHighlight5]:
    "Mentored fellow students by providing academic and technical guidance in programming and related disciplines.",
  [ETranslationKey.EducationDuetHighlight6]:
    "Participated in student governance, contributing to academic initiatives and broader student community activities.",
  [ETranslationKey.EducationBinaryStudioTitle]: "Binary Studio Academy",
  [ETranslationKey.EducationBinaryStudioProgram]:
    "JS Full-Stack Developer Bootcamp & Internship",
  [ETranslationKey.EducationBinaryStudioHighlight1]:
    "Successfully passed the competitive selection process for the internship program.",
  [ETranslationKey.EducationBinaryStudioHighlight2]:
    "Attended technical lectures and completed practical assignments, consistently delivering strong results.",
  [ETranslationKey.EducationBinaryStudioHighlight3]:
    "Collaborated with a team of interns on the development of an internal CRM system for HR corporate processes, under the guidance of experienced mentors.",
  [ETranslationKey.EducationBinaryStudioHighlight4]:
    "Gained a solid foundation in software development practices, teamwork, and real-world project collaboration.",
  [ETranslationKey.EducationBinaryStudioHighlight5]:
    "Received positive feedback and professional referrals, enabling the start of a professional career in the IT industry.",
  [ETranslationKey.EducationKnuUniversityName]:
    "Kryvyi Rih National University",
  [ETranslationKey.EducationKnuDegree]:
    "Bachelor's degree, Computer Software Engineering",
  [ETranslationKey.EducationKnuHighlight1]:
    "Studied core software development concepts, including programming principles, algorithms, and data structures.",
  [ETranslationKey.EducationKnuHighlight2]:
    "Developed a solid understanding of systems programming, computer architecture, and low-level software interaction.",
  [ETranslationKey.EducationKnuHighlight3]:
    "Learned the fundamentals of web development, including client-server architecture and the development of web applications.",
  [ETranslationKey.EducationKnuHighlight4]:
    "Worked with database systems, covering relational databases, data modeling, and query design.",
  [ETranslationKey.EducationKnuHighlight5]:
    "Explored 3D graphics libraries and development tools for building interactive applications and web-based graphical solutions.",
  [ETranslationKey.EducationKnuHighlight6]:
    "Participated in local student programming competitions and IT olympiads, strengthening problem-solving abilities and algorithmic thinking.",
  [ETranslationKey.EducationKnuHighlight7]:
    "Studied practical aspects of enterprise software systems, including work with 1C platforms and business-oriented applications.",
  [ETranslationKey.ExperiencePresent]: "Present",
  [ETranslationKey.TimelineExpandDetails]: "More",
  [ETranslationKey.TimelineHideDetails]: "Less",
  [ETranslationKey.ExperienceToolsAndTechnologies]: "Tools and technologies",

  [ETranslationKey.ExperienceOmnoraCompanyName]:
    "Omnora (fka SlidePresenter) | Startup / Product",
  [ETranslationKey.ExperienceOmnoraJobTitle]: "Web Developer",
  [ETranslationKey.ExperienceOmnoraLocation]:
    "Frankfurt am Main, Hesse, Germany | Remote",
  [ETranslationKey.ExperienceOmnoraDescription]:
    "Web Developer | Startup / Product. Full-time.",
  [ETranslationKey.ExperienceOmnoraHighlight1]:
    "Took part in building the portal that serves over 650 companies in the German market, delivering interactive content with seamless LMS integration.",
  [ETranslationKey.ExperienceOmnoraHighlight2]:
    "Contributed to the development of an enterprise-grade learning platform as part of a cross-functional team of 20 engineers, collaborating with designers, product managers and QA specialists.",
  [ETranslationKey.ExperienceOmnoraHighlight3]:
    "Played a key role in building a custom multimedia player using Canvas API and WebRTC, enabling real-time streaming, multi-layer annotations, and embedding into third-party platforms.",
  [ETranslationKey.ExperienceOmnoraHighlight4]:
    "Helped develop an interactive audio/video editor that allows users to edit multimedia tracks add overlays and generate training content directly in the browser.",
  [ETranslationKey.ExperienceOmnoraHighlight5]:
    "Led implementation of SCORM and xAPI standards for detailed tracking of learner progress and interactions within external LMS platforms, ensuring e-learning compliance.",
  [ETranslationKey.ExperienceOmnoraHighlight6]:
    "Integrated AI APIs to enable features such as AI avatars, text-to-speech, and interactive video generation, improving automation and personalization.",
  [ETranslationKey.ExperienceOmnoraHighlight7]:
    "Directed FE modernization by refactoring the codebase into a reactive programming architecture using reactive approach and upgrading to the latest React and TypeScript, improving maintainability and performance.",
  [ETranslationKey.ExperienceOmnoraHighlight8]:
    "Enhanced testing by increasing unit test coverage and adding automated tests integrated into CI/CD pipelines for reliable, faster releases.",
  [ETranslationKey.ExperienceOmnoraHighlight9]:
    "Mentored junior developers, supported onboarding and promoted best practices within the team.",
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
    "Designed and developed web and mobile applications from the ground up, covering both frontend and backend architecture.",
  [ETranslationKey.ExperienceCodeAndCareHighlight2]:
    "Contributed to application complexity assessments, effort estimation, and architectural planning to support the development of scalable, maintainable solutions.",
  [ETranslationKey.ExperienceCodeAndCareHighlight3]:
    "Mentored junior developers through code reviews, technical guidance, and onboarding sessions, supporting their professional development.",
  [ETranslationKey.ExperienceCodeAndCareHighlight4]:
    "Developed a real-time medical sensor monitoring platform for the French market, enabling continuous tracking and alerts based on live data streams.",
  [ETranslationKey.ExperienceCodeAndCareHighlight5]:
    "Built and maintained cryptocurrency platforms and wallets, prioritizing security, performance, and scalability.",
  [ETranslationKey.ExperienceCodeAndCareHighlight6]:
    "Collaborated closely with core teams at Bitfinex to deliver key features, develop landing pages and mobile applications, and ensure adherence to protocol requirements.",
  [ETranslationKey.ExperienceLanarsCompanyName]:
    "LANARS | Outsource / Dedicated team",
  [ETranslationKey.ExperienceLanarsJobTitle]: "WEB Developer",
  [ETranslationKey.ExperienceLanarsLocation]:
    "Dnipropetrovsk, Ukraine | On-site",
  [ETranslationKey.ExperienceLanarsDescription]:
    "WEB Developer | Outsource / Dedicated team. Full-time.",
  [ETranslationKey.ExperienceLanarsHighlight1]:
    "Contributed to project planning and effort estimation, providing detailed assessments of the development time required for implementation.",
  [ETranslationKey.ExperienceLanarsHighlight2]:
    "Participated in technical discussions with team members and stakeholders, helping break down features into clearly defined development tasks.",
  [ETranslationKey.ExperienceLanarsHighlight3]:
    "Developed responsive landing pages for a range of products, prioritizing performance and maintainability.",
  [ETranslationKey.ExperienceLanarsHighlight4]:
    "Built backend APIs for mobile applications, including a pet-walking service and a marketplace platform.",
  [ETranslationKey.ExperienceLanarsHighlight5]:
    "Implemented a marketplace administration panel and a customer relationship management system for a gaming company, enabling operational teams to manage content, users, and workflows.",
};

const RU_TRANSLATIONS: Translations = {
  ...EN_TRANSLATIONS,
  [ETranslationKey.NavAbout]: "О себе",
  [ETranslationKey.NavExperience]: "Опыт",
  [ETranslationKey.NavEducation]: "Образование",
  [ETranslationKey.NavProjects]: "Проекты",
  [ETranslationKey.A11yLogo]: "Логотип",
  [ETranslationKey.A11yOpenMenu]: "Открыть меню",
  [ETranslationKey.A11yCloseMenu]: "Закрыть меню",
  [ETranslationKey.A11ySectionNavigation]: "Навигация по разделам",
  [ETranslationKey.A11yLanguage]: "Язык",
  [ETranslationKey.HeroHiIm]: "Дратути!",
  [ETranslationKey.HeroName]: "Александр",
  [ETranslationKey.HeroSurname]: "Притула",
  [ETranslationKey.HeroRolePrimary]: "Инженер-программист",
  [ETranslationKey.HeroRoleSecondary]: "WEB-разработчик",
  [ETranslationKey.HeroEngineeringToolkit]: "Мой инженерный стек:",
  [ETranslationKey.HeroNeedMoreDetails]: "НУЖНО БОЛЬШЕ ДЕТАЛЕЙ?",
  [ETranslationKey.HeroCvDownload]: "Скачать CV (PDF)",
  [ETranslationKey.AboutParagraph1]:
    "Я инженер-программист с более чем 10-летним опытом full-stack веб-разработки в сферах электронного обучения, электронной коммерции, маркетплейсов, трейдинга, страхования и здравоохранения. Мой опыт охватывает проекты разного масштаба, включая работу в стартапах и в формате аутстаффинга. Этот разнообразный опыт укрепил мою способность адаптироваться к различным структурам команд, инженерным практикам и меняющимся бизнес-приоритетам, сохраняя постоянное внимание к качеству программного обеспечения и созданию решений, отвечающих потребностям бизнеса.",
  [ETranslationKey.AboutParagraph2]:
    "Мой опыт охватывает фронтенд-приложения, бэкенд-сервисы, базы данных и инфраструктуру развертывания. Я разрабатываю веб-интерфейсы с использованием React, Vue и Angular. На бэкенде я использую Go, Python и Node.js для реализации сервисов, API и фоновой обработки. У меня есть опыт работы с монолитной и микросервисной архитектурой, REST и GraphQL API, а также с такими базами данных, как MySQL и MongoDB. Я использую Docker для контейнеризации, Kubernetes для оркестрации и брокеры сообщений для асинхронного взаимодействия между сервисами. Я также настраиваю конвейеры непрерывной интеграции и развертывания для автоматизации доставки программного обеспечения. Автоматизированное тестирование с Playwright и Jest — неотъемлемая часть моего подхода к качеству кода, удобству сопровождения и надежности систем. Я включаю инструменты разработки с поддержкой ИИ в свой рабочий процесс для помощи в реализации, отладке и рефакторинге, при этом критически проверяя сгенерированный код.",
  [ETranslationKey.AboutParagraph3]:
    "На протяжении карьеры я работал в инженерных командах численностью от 3 до 20 человек, часто в международной и распределенной среде. Английский — мой основной рабочий язык для технических обсуждений и общения с клиентами. Я привык взаимодействовать с разными командами, уточнять бизнес-требования и объяснять технические аспекты как коллегам-инженерам, так и нетехническим заинтересованным сторонам. Я также наставляю начинающих разработчиков, предоставляя технические рекомендации, делясь знаниями и поддерживая их профессиональное развитие.",
  [ETranslationKey.AboutParagraph4]:
    "У меня есть степень магистра по программной инженерии, которая дала прочную основу в архитектуре программного обеспечения, безопасном программировании, алгоритмах и системном мышлении. Я продолжаю расширять свои знания, решая алгоритмические задачи на LeetCode, практикуясь в проектировании систем, проходя профессиональные курсы, готовясь к сертификациям и изучая техническую литературу.",
  [ETranslationKey.EducationDuetUniversityName]:
    "State University of Economics and Technology",
  [ETranslationKey.EducationDuetDegree]:
    "Магистр, инженерия программного обеспечения",
  [ETranslationKey.EducationDuetHighlight1]:
    "Углубленно изучал инструменты математического моделирования и проектирование алгоритмов, уделяя особое внимание решению вычислительных задач и прикладным методам моделирования.",
  [ETranslationKey.EducationDuetHighlight2]:
    "Углубил знания в области технологий трехмерной графики, включая OpenGL, для научных и высокопроизводительных программных приложений.",
  [ETranslationKey.EducationDuetHighlight3]:
    "Прошел курс по методологии научных исследований, охватывающий планирование исследований, академическое письмо и аналитические методы.",
  [ETranslationKey.EducationDuetHighlight4]:
    "Изучал IT-право, включая правовые аспекты разработки программного обеспечения, цифровых технологий и интеллектуальной собственности.",
  [ETranslationKey.EducationDuetHighlight5]:
    "Выступал наставником для других студентов, предоставляя академические и технические рекомендации по программированию и смежным дисциплинам.",
  [ETranslationKey.EducationDuetHighlight6]:
    "Участвовал в студенческом самоуправлении, внося вклад в академические инициативы и более широкий круг мероприятий студенческого сообщества.",
  [ETranslationKey.EducationBinaryStudioProgram]:
    "Буткемп JS Full-Stack разработчика и стажировка",
  [ETranslationKey.EducationBinaryStudioHighlight1]:
    "Успешно прошел конкурентный отбор в программу стажировки.",
  [ETranslationKey.EducationBinaryStudioHighlight2]:
    "Посещал технические лекции и выполнял практические задания, стабильно показывая сильные результаты.",
  [ETranslationKey.EducationBinaryStudioHighlight3]:
    "Сотрудничал с командой стажеров над разработкой внутренней CRM-системы для корпоративных HR-процессов под руководством опытных менторов.",
  [ETranslationKey.EducationBinaryStudioHighlight4]:
    "Получил прочную базу в практиках разработки ПО, командной работе и взаимодействии в реальных проектах.",
  [ETranslationKey.EducationBinaryStudioHighlight5]:
    "Получил позитивную обратную связь и профессиональные рекомендации, что позволило начать карьеру в IT-индустрии.",
  [ETranslationKey.EducationKnuUniversityName]:
    "Kryvyi Rih National University",
  [ETranslationKey.EducationKnuDegree]:
    "Бакалавр, инженерия программного обеспечения",
  [ETranslationKey.EducationKnuHighlight1]:
    "Изучал ключевые концепции разработки программного обеспечения, включая принципы программирования, алгоритмы и структуры данных.",
  [ETranslationKey.EducationKnuHighlight2]:
    "Сформировал прочное понимание системного программирования, архитектуры компьютеров и низкоуровневого взаимодействия программного обеспечения.",
  [ETranslationKey.EducationKnuHighlight3]:
    "Освоил основы веб-разработки, включая клиент-серверную архитектуру и разработку веб-приложений.",
  [ETranslationKey.EducationKnuHighlight4]:
    "Работал с системами баз данных, изучая реляционные базы данных, моделирование данных и проектирование запросов.",
  [ETranslationKey.EducationKnuHighlight5]:
    "Изучал библиотеки трехмерной графики и инструменты разработки для создания интерактивных приложений и графических веб-решений.",
  [ETranslationKey.EducationKnuHighlight6]:
    "Участвовал в местных студенческих соревнованиях по программированию и IT-олимпиадах, развивая навыки решения задач и алгоритмическое мышление.",
  [ETranslationKey.EducationKnuHighlight7]:
    "Изучал практические аспекты корпоративных программных систем, включая работу с платформами 1C и приложениями для бизнеса.",
  [ETranslationKey.ExperiencePresent]: "Настоящее время",
  [ETranslationKey.TimelineExpandDetails]: "Показать больше",
  [ETranslationKey.TimelineHideDetails]: "Скрыть",
  [ETranslationKey.ExperienceToolsAndTechnologies]: "Инструменты и технологии",
  [ETranslationKey.ExperienceOmnoraCompanyName]:
    "Omnora (ранее SlidePresenter) | Стартап / Продукт",
  [ETranslationKey.ExperienceOmnoraJobTitle]: "WEB-разработчик",
  [ETranslationKey.ExperienceOmnoraLocation]:
    "Франкфурт-на-Майне, Гессен, Германия | Удаленно",
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
    "Руководил модернизацией frontend-части, выполнив рефакторинг кодовой базы с переходом на архитектуру реактивного программирования с использованием реактивного подхода и обновив React и TypeScript до последних версий, что улучшило поддерживаемость и производительность.",
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
    "Разработал административную панель для управления интерактивными чат-ботами (до активного внедрения AI-агентов), используемыми в B2B-приложениях для страхования, предоставив бизнес-пользователям возможность настраивать процессы, отслеживать взаимодействия и управлять сценариями общения с клиентами.",
  [ETranslationKey.ExperienceDigitalsuitsHighlight2]:
    "Разработал платформу недвижимости для рынка Великобритании с инструментами управления объявлениями о недвижимости, поиска и взаимодействия с клиентами, уделяя особое внимание масштабируемости, производительности и соблюдению нормативных требований.",
  [ETranslationKey.ExperienceDigitalsuitsHighlight3]:
    "Возглавил разработку нескольких веб-приложений с нуля в кросс-функциональной команде из 5 инженеров, тесно сотрудничая с командой управления продуктом и DevOps-инженерами для обеспечения бесперебойной поставки, готовности инфраструктуры и соответствия бизнес-приоритетам.",
  [ETranslationKey.ExperienceDigitalsuitsHighlight4]:
    "Определил и внедрил эффективные рабочие процессы команды, включая декомпозицию задач, расстановку приоритетов, процессы проверки кода и планирование релизов.",
  [ETranslationKey.ExperienceDigitalsuitsHighlight5]:
    "Оценивал трудозатраты на реализацию функциональности и всего объема проекта, согласовывая сроки поставки с технической реализуемостью.",
  [ETranslationKey.ExperienceDigitalsuitsHighlight6]:
    "Спроектировал общую архитектуру приложений, выбрал технологический стек и отвечал за ключевые технические решения на протяжении всего жизненного цикла проекта.",
  [ETranslationKey.ExperienceDigitalsuitsHighlight7]:
    "Ежедневно общался с представителями бизнеса, обеспечивая согласованность технической реализации с целями продукта.",
  [ETranslationKey.ExperienceDigitalsuitsHighlight8]:
    "Оказывал техническое наставничество с особым акцентом на качество frontend-разработки, помогая коллегам улучшать поддерживаемость кода, производительность и единообразие пользовательского интерфейса.",
  [ETranslationKey.ExperienceCodeAndCareCompanyName]: "Code & Care | Аутстафф",
  [ETranslationKey.ExperienceCodeAndCareJobTitle]:
    "WEB- и мобильный разработчик",
  [ETranslationKey.ExperienceCodeAndCareLocation]: "Харьков, Украина | Офис",
  [ETranslationKey.ExperienceCodeAndCareDescription]:
    "WEB- и мобильный разработчик | Аутстафф. Полная занятость.",
  [ETranslationKey.ExperienceCodeAndCareHighlight1]:
    "Проектировал и разрабатывал веб- и мобильные приложения с нуля, охватывая архитектуру как frontend-, так и backend-части.",
  [ETranslationKey.ExperienceCodeAndCareHighlight2]:
    "Участвовал в оценке сложности приложений, оценке трудозатрат и архитектурном планировании для создания масштабируемых и удобных в сопровождении решений.",
  [ETranslationKey.ExperienceCodeAndCareHighlight3]:
    "Наставлял начинающих разработчиков, проводя проверки кода, предоставляя технические рекомендации и помогая с адаптацией, поддерживая их профессиональное развитие.",
  [ETranslationKey.ExperienceCodeAndCareHighlight4]:
    "Разработал платформу мониторинга медицинских датчиков в реальном времени для французского рынка, обеспечивающую непрерывное отслеживание показателей и оповещения на основе потоковых данных.",
  [ETranslationKey.ExperienceCodeAndCareHighlight5]:
    "Создавал и поддерживал криптовалютные платформы и кошельки, уделяя первостепенное внимание безопасности, производительности и масштабируемости.",
  [ETranslationKey.ExperienceCodeAndCareHighlight6]:
    "Тесно сотрудничал с основными командами Bitfinex, реализуя ключевые функции, разрабатывая лендинги и мобильные приложения и обеспечивая соблюдение требований протоколов.",
  [ETranslationKey.ExperienceLanarsCompanyName]:
    "LANARS | Аутсорс / Выделенная команда",
  [ETranslationKey.ExperienceLanarsJobTitle]: "WEB-разработчик",
  [ETranslationKey.ExperienceLanarsLocation]: "Днепропетровск, Украина | Офис",
  [ETranslationKey.ExperienceLanarsDescription]:
    "WEB-разработчик | Аутсорс / Выделенная команда. Полная занятость.",
  [ETranslationKey.ExperienceLanarsHighlight1]:
    "Участвовал в планировании проектов и оценке трудозатрат, предоставляя подробные оценки времени разработки, необходимого для реализации.",
  [ETranslationKey.ExperienceLanarsHighlight2]:
    "Участвовал в технических обсуждениях с членами команды и заинтересованными сторонами, помогая разбивать функциональность на четко определенные задачи разработки.",
  [ETranslationKey.ExperienceLanarsHighlight3]:
    "Разрабатывал адаптивные лендинги для различных продуктов, уделяя первостепенное внимание производительности и удобству сопровождения.",
  [ETranslationKey.ExperienceLanarsHighlight4]:
    "Создавал backend API для мобильных приложений, включая сервис выгула домашних животных и платформу маркетплейса.",
  [ETranslationKey.ExperienceLanarsHighlight5]:
    "Реализовал административную панель маркетплейса и систему управления взаимоотношениями с клиентами для игровой компании, предоставив операционным командам возможность управлять контентом, пользователями и рабочими процессами.",
};

const SP_TRANSLATIONS: Translations = {
  ...EN_TRANSLATIONS,
  [ETranslationKey.NavAbout]: "Sobre mí",
  [ETranslationKey.NavExperience]: "Experiencia",
  [ETranslationKey.NavEducation]: "Educación",
  [ETranslationKey.NavProjects]: "Proyectos",
  [ETranslationKey.A11yLogo]: "Logotipo",
  [ETranslationKey.A11yOpenMenu]: "Abrir menú",
  [ETranslationKey.A11yCloseMenu]: "Cerrar menú",
  [ETranslationKey.A11ySectionNavigation]: "Navegación por secciones",
  [ETranslationKey.A11yLanguage]: "Idioma",
  [ETranslationKey.HeroHiIm]: "HOLA!",
  [ETranslationKey.HeroRolePrimary]: "Ingeniero de software",
  [ETranslationKey.HeroRoleSecondary]: "Desarrollador WEB",
  [ETranslationKey.HeroEngineeringToolkit]: "Mi stack de ingeniería:",
  [ETranslationKey.HeroNeedMoreDetails]: "¿NECESITAS MÁS DETALLES?",
  [ETranslationKey.HeroCvDownload]: "Descargar CV (PDF)",
  [ETranslationKey.AboutParagraph1]:
    "Soy ingeniero de software con más de 10 años de experiencia en desarrollo web full-stack en los sectores de aprendizaje en línea, comercio electrónico, marketplaces, trading, seguros y salud. Mi trayectoria abarca proyectos de distintas escalas, incluido el trabajo en startups y en modalidades de outstaffing. Esta diversidad de experiencias ha reforzado mi capacidad para adaptarme a diferentes estructuras de equipo, prácticas de ingeniería y prioridades empresariales en evolución, manteniendo un enfoque constante en la calidad del software y en la entrega de soluciones que satisfagan las necesidades del negocio.",
  [ETranslationKey.AboutParagraph2]:
    "Mi experiencia abarca aplicaciones frontend, servicios backend, bases de datos e infraestructura de despliegue. Desarrollo interfaces web con React, Vue y Angular. En el backend, utilizo Go, Python y Node.js para implementar servicios, API y procesamiento en segundo plano. Tengo experiencia con arquitecturas monolíticas y de microservicios, API REST y GraphQL, y bases de datos como MySQL y MongoDB. Utilizo Docker para la contenerización, Kubernetes para la orquestación y brokers de mensajes para la comunicación asíncrona entre servicios. También configuro pipelines de integración y despliegue continuos para automatizar la entrega de software. Las pruebas automatizadas con Playwright y Jest son una parte integral de mi enfoque de calidad del código, mantenibilidad y fiabilidad de los sistemas. Incorporo herramientas de desarrollo asistidas por IA en mi flujo de trabajo para apoyar la implementación, la depuración y la refactorización, revisando críticamente el código generado.",
  [ETranslationKey.AboutParagraph3]:
    "A lo largo de mi carrera, he trabajado en equipos de ingeniería de entre 3 y 20 integrantes, frecuentemente en entornos internacionales y distribuidos. El inglés es mi principal idioma de trabajo para las discusiones técnicas y la comunicación con clientes. Estoy acostumbrado a colaborar entre equipos, aclarar requisitos de negocio y comunicar consideraciones técnicas tanto a colegas de ingeniería como a las partes interesadas sin perfil técnico. También mentorizo a desarrolladores júnior, ofreciendo orientación técnica, compartiendo conocimientos y apoyando su desarrollo profesional.",
  [ETranslationKey.AboutParagraph4]:
    "Tengo un máster en Ingeniería de Software, que me proporcionó una base sólida en arquitectura de software, prácticas de programación segura, algoritmos y pensamiento sistémico. Continúo ampliando mis conocimientos resolviendo problemas algorítmicos en LeetCode, practicando el diseño de sistemas, realizando cursos profesionales, preparándome para certificaciones y estudiando literatura técnica.",
  [ETranslationKey.EducationDuetUniversityName]:
    "State University of Economics and Technology",
  [ETranslationKey.EducationDuetDegree]: "Máster, Ingeniería de Software",
  [ETranslationKey.EducationDuetHighlight1]:
    "Realicé estudios avanzados de herramientas de modelado matemático y diseño de algoritmos, con especial atención a la resolución de problemas computacionales y las técnicas de modelado aplicado.",
  [ETranslationKey.EducationDuetHighlight2]:
    "Profundicé mis conocimientos en tecnologías de gráficos 3D, incluido OpenGL, para aplicaciones de software científicas y de alto rendimiento.",
  [ETranslationKey.EducationDuetHighlight3]:
    "Completé estudios de Metodología de la Investigación Científica, que abarcaron el diseño de investigaciones, la escritura académica y los métodos analíticos.",
  [ETranslationKey.EducationDuetHighlight4]:
    "Estudié Derecho Informático, incluidos los aspectos legales del desarrollo de software, las tecnologías digitales y la propiedad intelectual.",
  [ETranslationKey.EducationDuetHighlight5]:
    "Mentoricé a otros estudiantes, proporcionando orientación académica y técnica en programación y disciplinas afines.",
  [ETranslationKey.EducationDuetHighlight6]:
    "Participé en órganos de representación estudiantil, contribuyendo a iniciativas académicas y a actividades más amplias de la comunidad estudiantil.",
  [ETranslationKey.EducationBinaryStudioProgram]:
    "Bootcamp de Desarrollador Full-Stack JS y prácticas",
  [ETranslationKey.EducationBinaryStudioHighlight1]:
    "Superé con éxito el proceso de selección competitivo para el programa de prácticas.",
  [ETranslationKey.EducationBinaryStudioHighlight2]:
    "Asistí a conferencias técnicas y completé tareas prácticas, manteniendo resultados sólidos de forma constante.",
  [ETranslationKey.EducationBinaryStudioHighlight3]:
    "Colaboré con un equipo de practicantes en el desarrollo de un sistema CRM interno para procesos corporativos de RR. HH., bajo la guía de mentores experimentados.",
  [ETranslationKey.EducationBinaryStudioHighlight4]:
    "Obtuve una base sólida en prácticas de desarrollo de software, trabajo en equipo y colaboración en proyectos reales.",
  [ETranslationKey.EducationBinaryStudioHighlight5]:
    "Recibí comentarios positivos y referencias profesionales, lo que permitió iniciar una carrera profesional en la industria de TI.",
  [ETranslationKey.EducationKnuUniversityName]:
    "Kryvyi Rih National University",
  [ETranslationKey.EducationKnuDegree]: "Grado, Ingeniería de Software",
  [ETranslationKey.EducationKnuHighlight1]:
    "Estudié conceptos fundamentales del desarrollo de software, incluidos los principios de programación, los algoritmos y las estructuras de datos.",
  [ETranslationKey.EducationKnuHighlight2]:
    "Desarrollé una comprensión sólida de la programación de sistemas, la arquitectura de computadores y la interacción del software a bajo nivel.",
  [ETranslationKey.EducationKnuHighlight3]:
    "Aprendí los fundamentos del desarrollo web, incluida la arquitectura cliente-servidor y el desarrollo de aplicaciones web.",
  [ETranslationKey.EducationKnuHighlight4]:
    "Trabajé con sistemas de bases de datos, abarcando bases de datos relacionales, modelado de datos y diseño de consultas.",
  [ETranslationKey.EducationKnuHighlight5]:
    "Exploré bibliotecas de gráficos 3D y herramientas de desarrollo para crear aplicaciones interactivas y soluciones gráficas basadas en la web.",
  [ETranslationKey.EducationKnuHighlight6]:
    "Participé en competiciones locales de programación para estudiantes y olimpiadas de informática, fortaleciendo mis habilidades de resolución de problemas y mi pensamiento algorítmico.",
  [ETranslationKey.EducationKnuHighlight7]:
    "Estudié aspectos prácticos de los sistemas de software empresarial, incluido el trabajo con plataformas 1C y aplicaciones orientadas al negocio.",
  [ETranslationKey.ExperiencePresent]: "Presente",
  [ETranslationKey.TimelineExpandDetails]: "Mostrar más",
  [ETranslationKey.TimelineHideDetails]: "Mostrar menos",
  [ETranslationKey.ExperienceToolsAndTechnologies]:
    "Herramientas y tecnologías",
  [ETranslationKey.ExperienceOmnoraCompanyName]:
    "Omnora (antes SlidePresenter) | Startup / Producto",
  [ETranslationKey.ExperienceOmnoraJobTitle]: "Desarrollador WEB",
  [ETranslationKey.ExperienceOmnoraLocation]:
    "Fráncfort del Meno, Hesse, Alemania | Remoto",
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
    "Dirigí la modernización del frontend mediante la refactorización de la base de código hacia una arquitectura de programación reactiva con un enfoque reactivo y la actualización a las últimas versiones de React y TypeScript, mejorando la mantenibilidad y el rendimiento.",
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
    "Desarrollé un panel de administración para gestionar chatbots interactivos (antes de la integración activa de agentes de IA) utilizados en aplicaciones B2B de seguros, permitiendo a los usuarios de negocio configurar flujos, supervisar interacciones y gestionar escenarios de comunicación con clientes.",
  [ETranslationKey.ExperienceDigitalsuitsHighlight2]:
    "Desarrollé una plataforma inmobiliaria adaptada al mercado del Reino Unido, con herramientas para gestionar anuncios de propiedades, realizar búsquedas e interactuar con clientes, con especial atención a la escalabilidad, el rendimiento y el cumplimiento normativo.",
  [ETranslationKey.ExperienceDigitalsuitsHighlight3]:
    "Lideré el desarrollo desde cero de varias aplicaciones web en un equipo multidisciplinar de 5 ingenieros, colaborando estrechamente con el equipo de gestión de producto y los ingenieros de DevOps para garantizar una entrega fluida, la preparación de la infraestructura y la alineación con las prioridades del negocio.",
  [ETranslationKey.ExperienceDigitalsuitsHighlight4]:
    "Definí e implementé flujos de trabajo eficaces para el equipo, incluida la descomposición de tareas, la priorización, los procesos de revisión de código y la planificación de lanzamientos.",
  [ETranslationKey.ExperienceDigitalsuitsHighlight5]:
    "Realicé estimaciones de esfuerzo para las funcionalidades y el alcance global del proyecto, equilibrando los plazos de entrega con la viabilidad técnica.",
  [ETranslationKey.ExperienceDigitalsuitsHighlight6]:
    "Diseñé la arquitectura general de las aplicaciones, seleccioné las tecnologías y asumí la responsabilidad de las decisiones técnicas clave durante todo el ciclo de vida del proyecto.",
  [ETranslationKey.ExperienceDigitalsuitsHighlight7]:
    "Mantuve una comunicación diaria con las partes interesadas del negocio, asegurando la alineación entre la implementación técnica y los objetivos del producto.",
  [ETranslationKey.ExperienceDigitalsuitsHighlight8]:
    "Proporcioné mentoría técnica con especial atención a la calidad del frontend, ayudando a mis compañeros a mejorar la mantenibilidad del código, el rendimiento y la coherencia de la interfaz de usuario.",
  [ETranslationKey.ExperienceCodeAndCareCompanyName]: "Code & Care | Outstaff",
  [ETranslationKey.ExperienceCodeAndCareJobTitle]: "Desarrollador WEB y Móvil",
  [ETranslationKey.ExperienceCodeAndCareLocation]:
    "Járkov, Ucrania | Presencial",
  [ETranslationKey.ExperienceCodeAndCareDescription]:
    "Desarrollador WEB y Móvil | Outstaff. Tiempo completo.",
  [ETranslationKey.ExperienceCodeAndCareHighlight1]:
    "Diseñé y desarrollé aplicaciones web y móviles desde cero, abarcando tanto la arquitectura frontend como la backend.",
  [ETranslationKey.ExperienceCodeAndCareHighlight2]:
    "Contribuí a la evaluación de la complejidad de las aplicaciones, la estimación de esfuerzo y la planificación arquitectónica para apoyar el desarrollo de soluciones escalables y mantenibles.",
  [ETranslationKey.ExperienceCodeAndCareHighlight3]:
    "Mentoricé a desarrolladores júnior mediante revisiones de código, orientación técnica y sesiones de incorporación, apoyando su desarrollo profesional.",
  [ETranslationKey.ExperienceCodeAndCareHighlight4]:
    "Desarrollé una plataforma de monitorización de sensores médicos en tiempo real para el mercado francés, permitiendo un seguimiento continuo y alertas basadas en flujos de datos en vivo.",
  [ETranslationKey.ExperienceCodeAndCareHighlight5]:
    "Creé y mantuve plataformas y monederos de criptomonedas, priorizando la seguridad, el rendimiento y la escalabilidad.",
  [ETranslationKey.ExperienceCodeAndCareHighlight6]:
    "Colaboré estrechamente con los equipos principales de Bitfinex para implementar funcionalidades clave, desarrollar páginas de destino y aplicaciones móviles, y garantizar el cumplimiento de los requisitos de los protocolos.",
  [ETranslationKey.ExperienceLanarsCompanyName]:
    "LANARS | Outsource / Equipo dedicado",
  [ETranslationKey.ExperienceLanarsJobTitle]: "Desarrollador WEB",
  [ETranslationKey.ExperienceLanarsLocation]:
    "Dnipropetrovsk, Ucrania | Presencial",
  [ETranslationKey.ExperienceLanarsDescription]:
    "Desarrollador WEB | Outsource / Equipo dedicado. Tiempo completo.",
  [ETranslationKey.ExperienceLanarsHighlight1]:
    "Contribuí a la planificación de proyectos y la estimación de esfuerzo, proporcionando evaluaciones detalladas del tiempo de desarrollo necesario para la implementación.",
  [ETranslationKey.ExperienceLanarsHighlight2]:
    "Participé en discusiones técnicas con miembros del equipo y partes interesadas, ayudando a descomponer las funcionalidades en tareas de desarrollo claramente definidas.",
  [ETranslationKey.ExperienceLanarsHighlight3]:
    "Desarrollé páginas de destino adaptables para diversos productos, priorizando el rendimiento y la mantenibilidad.",
  [ETranslationKey.ExperienceLanarsHighlight4]:
    "Creé API backend para aplicaciones móviles, incluido un servicio de paseo de mascotas y una plataforma de marketplace.",
  [ETranslationKey.ExperienceLanarsHighlight5]:
    "Implementé un panel de administración de marketplace y un sistema de gestión de relaciones con clientes para una empresa de videojuegos, permitiendo a los equipos de operaciones gestionar contenido, usuarios y flujos de trabajo.",
};

const DE_TRANSLATIONS: Translations = {
  ...EN_TRANSLATIONS,
  [ETranslationKey.NavAbout]: "Über mich",
  [ETranslationKey.NavExperience]: "Erfahrung",
  [ETranslationKey.NavEducation]: "Ausbildung",
  [ETranslationKey.NavProjects]: "Projekte",
  [ETranslationKey.A11yLogo]: "Logo",
  [ETranslationKey.A11yOpenMenu]: "Menu offnen",
  [ETranslationKey.A11yCloseMenu]: "Menu schliessen",
  [ETranslationKey.A11ySectionNavigation]: "Bereichsnavigation",
  [ETranslationKey.A11yLanguage]: "Sprache",
  [ETranslationKey.HeroHiIm]: "Hallo!",
  [ETranslationKey.HeroRolePrimary]: "Softwareingenieur",
  [ETranslationKey.HeroRoleSecondary]: "WEB-Entwickler",
  [ETranslationKey.HeroEngineeringToolkit]: "Mein Engineering-Toolkit",
  [ETranslationKey.HeroNeedMoreDetails]: "MEHR DETAILS NÖTIG?",
  [ETranslationKey.HeroCvDownload]: "CV (PDF) herunterladen",
  [ETranslationKey.AboutParagraph1]:
    "Ich bin Softwareingenieur mit über 10 Jahren Erfahrung in der Full-Stack-Webentwicklung in den Bereichen E-Learning, E-Commerce, Marktplätze, Handel, Versicherungen und Gesundheitswesen. Mein beruflicher Hintergrund umfasst Projekte unterschiedlicher Größenordnung, darunter Tätigkeiten in Startups und im Rahmen von Outstaffing-Einsätzen. Diese vielfältige Erfahrung hat meine Fähigkeit gestärkt, mich an unterschiedliche Teamstrukturen, Entwicklungspraktiken und sich wandelnde geschäftliche Prioritäten anzupassen, wobei ich stets auf Softwarequalität und die Bereitstellung von Lösungen achte, die den geschäftlichen Anforderungen entsprechen.",
  [ETranslationKey.AboutParagraph2]:
    "Meine Erfahrung umfasst Frontend-Anwendungen, Backend-Dienste, Datenbanken und Deployment-Infrastruktur. Ich entwickle Weboberflächen mit React, Vue und Angular. Im Backend nutze ich Go, Python und Node.js zur Implementierung von Diensten, APIs und Hintergrundverarbeitung. Ich habe Erfahrung mit monolithischen und Microservice-Architekturen, REST- und GraphQL-APIs sowie Datenbanken wie MySQL und MongoDB. Ich verwende Docker zur Containerisierung, Kubernetes zur Orchestrierung und Message Broker für die asynchrone Kommunikation zwischen Diensten. Außerdem konfiguriere ich Pipelines für kontinuierliche Integration und kontinuierliches Deployment, um die Softwarebereitstellung zu automatisieren. Automatisierte Tests mit Playwright und Jest sind ein wesentlicher Bestandteil meines Ansatzes für Codequalität, Wartbarkeit und Systemzuverlässigkeit. Ich integriere KI-gestützte Entwicklungswerkzeuge in meine Arbeitsabläufe, um Implementierung, Fehlersuche und Refactoring zu unterstützen, wobei ich den generierten Code kritisch prüfe.",
  [ETranslationKey.AboutParagraph3]:
    "Im Laufe meiner Karriere habe ich in Entwicklungsteams mit 3 bis 20 Mitgliedern gearbeitet, häufig in internationalen und verteilten Umgebungen. Englisch ist meine primäre Arbeitssprache für technische Diskussionen und die Kommunikation mit Kunden. Ich bin es gewohnt, teamübergreifend zusammenzuarbeiten, geschäftliche Anforderungen zu klären und technische Aspekte sowohl mit Kollegen aus der Entwicklung als auch mit nichttechnischen Stakeholdern zu besprechen. Zudem betreue ich Junior-Entwickler, gebe technische Hilfestellung, teile Wissen und unterstütze ihre berufliche Entwicklung.",
  [ETranslationKey.AboutParagraph4]:
    "Ich habe einen Masterabschluss in Software Engineering, der mir eine solide Grundlage in Softwarearchitektur, sicheren Programmierpraktiken, Algorithmen und systemischem Denken vermittelt hat. Ich erweitere mein Fachwissen kontinuierlich, indem ich algorithmische Aufgaben auf LeetCode löse, Systemdesign übe, Fachkurse belege, Zertifizierungen anstrebe und Fachliteratur studiere.",
  [ETranslationKey.EducationDuetUniversityName]:
    "State University of Economics and Technology",
  [ETranslationKey.EducationDuetDegree]: "Masterabschluss, Softwaretechnik",
  [ETranslationKey.EducationDuetHighlight1]:
    "Ich absolvierte ein vertieftes Studium von Werkzeugen der mathematischen Modellierung und des Algorithmendesigns mit Schwerpunkt auf computergestützter Problemlösung und angewandten Modellierungstechniken.",
  [ETranslationKey.EducationDuetHighlight2]:
    "Ich vertiefte mein Fachwissen über 3D-Grafiktechnologien, einschließlich OpenGL, für wissenschaftliche und hochperformante Softwareanwendungen.",
  [ETranslationKey.EducationDuetHighlight3]:
    "Ich absolvierte Lehrveranstaltungen zur Methodik wissenschaftlicher Forschung, die Forschungsdesign, akademisches Schreiben und analytische Methoden umfassten.",
  [ETranslationKey.EducationDuetHighlight4]:
    "Ich studierte IT-Recht, einschließlich der rechtlichen Aspekte der Softwareentwicklung, digitaler Technologien und des geistigen Eigentums.",
  [ETranslationKey.EducationDuetHighlight5]:
    "Ich betreute Mitstudierende und bot akademische sowie technische Unterstützung in Programmierung und verwandten Fachgebieten.",
  [ETranslationKey.EducationDuetHighlight6]:
    "Ich beteiligte mich an der studentischen Selbstverwaltung und trug zu akademischen Initiativen sowie zu weiteren Aktivitäten der Studierendengemeinschaft bei.",
  [ETranslationKey.EducationBinaryStudioProgram]:
    "JS Full-Stack Developer Bootcamp und Praktikum",
  [ETranslationKey.EducationBinaryStudioHighlight1]:
    "Ich habe den wettbewerbsintensiven Auswahlprozess für das Praktikumsprogramm erfolgreich bestanden.",
  [ETranslationKey.EducationBinaryStudioHighlight2]:
    "Ich besuchte technische Vorlesungen und absolvierte praktische Aufgaben mit durchgehend starken Ergebnissen.",
  [ETranslationKey.EducationBinaryStudioHighlight3]:
    "Ich arbeitete mit einem Team von Praktikanten an der Entwicklung eines internen CRM-Systems für unternehmensweite HR-Prozesse, unter Anleitung erfahrener Mentoren.",
  [ETranslationKey.EducationBinaryStudioHighlight4]:
    "Ich erwarb eine solide Grundlage in Softwareentwicklungspraktiken, Teamarbeit und der Zusammenarbeit an realen Projekten.",
  [ETranslationKey.EducationBinaryStudioHighlight5]:
    "Ich erhielt positives Feedback und professionelle Empfehlungen, die den Einstieg in eine berufliche Laufbahn in der IT-Branche ermöglichten.",
  [ETranslationKey.EducationKnuUniversityName]:
    "Kryvyi Rih National University",
  [ETranslationKey.EducationKnuDegree]: "Bachelorabschluss, Softwaretechnik",
  [ETranslationKey.EducationKnuHighlight1]:
    "Ich studierte grundlegende Konzepte der Softwareentwicklung, einschließlich Programmierprinzipien, Algorithmen und Datenstrukturen.",
  [ETranslationKey.EducationKnuHighlight2]:
    "Ich entwickelte ein fundiertes Verständnis von Systemprogrammierung, Rechnerarchitektur und der Interaktion von Software auf niedriger Systemebene.",
  [ETranslationKey.EducationKnuHighlight3]:
    "Ich erlernte die Grundlagen der Webentwicklung, einschließlich der Client-Server-Architektur und der Entwicklung von Webanwendungen.",
  [ETranslationKey.EducationKnuHighlight4]:
    "Ich arbeitete mit Datenbanksystemen und befasste mich dabei mit relationalen Datenbanken, Datenmodellierung und dem Entwurf von Abfragen.",
  [ETranslationKey.EducationKnuHighlight5]:
    "Ich erkundete 3D-Grafikbibliotheken und Entwicklungswerkzeuge zur Erstellung interaktiver Anwendungen und webbasierter Grafiklösungen.",
  [ETranslationKey.EducationKnuHighlight6]:
    "Ich nahm an lokalen studentischen Programmierwettbewerben und Informatikolympiaden teil und stärkte dabei meine Problemlösungsfähigkeiten und mein algorithmisches Denken.",
  [ETranslationKey.EducationKnuHighlight7]:
    "Ich studierte praktische Aspekte betrieblicher Softwaresysteme, einschließlich der Arbeit mit 1C-Plattformen und geschäftsorientierten Anwendungen.",
  [ETranslationKey.ExperiencePresent]: "Heute",
  [ETranslationKey.TimelineExpandDetails]: "Mehr anzeigen",
  [ETranslationKey.TimelineHideDetails]: "Weniger anzeigen",
  [ETranslationKey.ExperienceToolsAndTechnologies]: "Tools und Technologien",
  [ETranslationKey.ExperienceOmnoraCompanyName]:
    "Omnora (ehemals SlidePresenter) | Startup / Produkt",
  [ETranslationKey.ExperienceOmnoraJobTitle]: "WEB-Entwickler",
  [ETranslationKey.ExperienceOmnoraLocation]:
    "Frankfurt am Main, Hessen, Deutschland | Remote",
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
    "Ich leitete die Frontend-Modernisierung durch Refactoring der Codebasis hin zu einer Architektur für reaktive Programmierung unter Verwendung eines reaktiven Ansatzes und durch die Aktualisierung auf die neuesten Versionen von React und TypeScript, wodurch Wartbarkeit und Performance verbessert wurden.",
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
    "Ich entwickelte ein Admin-Panel zur Verwaltung interaktiver Chatbots (vor der aktiven Integration von KI-Agenten), die in B2B-Versicherungsanwendungen eingesetzt werden. Damit konnten Fachanwender Abläufe konfigurieren, Interaktionen überwachen und Szenarien für die Kundenkommunikation verwalten.",
  [ETranslationKey.ExperienceDigitalsuitsHighlight2]:
    "Ich entwickelte eine auf den britischen Markt zugeschnittene Immobilienplattform mit Werkzeugen zur Verwaltung von Immobilienanzeigen, zur Suche und zur Interaktion mit Kunden, mit Fokus auf Skalierbarkeit, Performance und die Einhaltung regulatorischer Vorgaben.",
  [ETranslationKey.ExperienceDigitalsuitsHighlight3]:
    "Ich leitete die Entwicklung mehrerer Webanwendungen von Grund auf in einem funktionsübergreifenden Team aus 5 Ingenieuren und arbeitete eng mit dem Produktmanagement und DevOps-Ingenieuren zusammen, um eine reibungslose Bereitstellung, die Einsatzbereitschaft der Infrastruktur und die Ausrichtung auf geschäftliche Prioritäten sicherzustellen.",
  [ETranslationKey.ExperienceDigitalsuitsHighlight4]:
    "Ich definierte und implementierte effektive Arbeitsabläufe im Team, einschließlich Aufgabenzerlegung, Priorisierung, Code-Review-Prozessen und Release-Planung.",
  [ETranslationKey.ExperienceDigitalsuitsHighlight5]:
    "Ich schätzte den Aufwand für Funktionen und den gesamten Projektumfang und brachte dabei Liefertermine und technische Machbarkeit in Einklang.",
  [ETranslationKey.ExperienceDigitalsuitsHighlight6]:
    "Ich entwarf die Gesamtarchitektur der Anwendungen, wählte den Technologie-Stack aus und verantwortete zentrale technische Entscheidungen während des gesamten Projektlebenszyklus.",
  [ETranslationKey.ExperienceDigitalsuitsHighlight7]:
    "Ich kommunizierte täglich mit Stakeholdern aus den Fachbereichen und stellte sicher, dass die technische Umsetzung mit den Produktzielen übereinstimmte.",
  [ETranslationKey.ExperienceDigitalsuitsHighlight8]:
    "Ich bot technisches Mentoring mit besonderem Fokus auf Frontend-Qualität und half Kollegen, die Wartbarkeit des Codes, die Performance und die Konsistenz der Benutzeroberfläche zu verbessern.",
  [ETranslationKey.ExperienceCodeAndCareCompanyName]:
    "Code & Care | Outstaffing",
  [ETranslationKey.ExperienceCodeAndCareJobTitle]: "WEB- und Mobile-Entwickler",
  [ETranslationKey.ExperienceCodeAndCareLocation]: "Charkiw, Ukraine | Vor Ort",
  [ETranslationKey.ExperienceCodeAndCareDescription]:
    "WEB- und Mobile-Entwickler | Outstaffing. Vollzeit.",
  [ETranslationKey.ExperienceCodeAndCareHighlight1]:
    "Ich entwarf und entwickelte Web- und Mobile-Anwendungen von Grund auf und deckte dabei sowohl die Frontend- als auch die Backend-Architektur ab.",
  [ETranslationKey.ExperienceCodeAndCareHighlight2]:
    "Ich beteiligte mich an der Bewertung der Anwendungskomplexität, der Aufwandsschätzung und der Architekturplanung, um die Entwicklung skalierbarer und wartbarer Lösungen zu unterstützen.",
  [ETranslationKey.ExperienceCodeAndCareHighlight3]:
    "Ich betreute Junior-Entwickler durch Code-Reviews, technische Anleitung und Onboarding-Sitzungen und unterstützte damit ihre berufliche Entwicklung.",
  [ETranslationKey.ExperienceCodeAndCareHighlight4]:
    "Ich entwickelte eine Plattform zur Echtzeitüberwachung medizinischer Sensoren für den französischen Markt, die eine kontinuierliche Überwachung und Benachrichtigungen auf Basis von Live-Datenströmen ermöglicht.",
  [ETranslationKey.ExperienceCodeAndCareHighlight5]:
    "Ich entwickelte und betreute Kryptowährungsplattformen und Wallets mit besonderem Augenmerk auf Sicherheit, Performance und Skalierbarkeit.",
  [ETranslationKey.ExperienceCodeAndCareHighlight6]:
    "Ich arbeitete eng mit den Kernteams von Bitfinex zusammen, um zentrale Funktionen umzusetzen, Landingpages und Mobile-Anwendungen zu entwickeln und die Einhaltung der Protokollanforderungen sicherzustellen.",
  [ETranslationKey.ExperienceLanarsCompanyName]:
    "LANARS | Outsourcing / Dediziertes Team",
  [ETranslationKey.ExperienceLanarsJobTitle]: "WEB-Entwickler",
  [ETranslationKey.ExperienceLanarsLocation]:
    "Dnipropetrowsk, Ukraine | Vor Ort",
  [ETranslationKey.ExperienceLanarsDescription]:
    "WEB-Entwickler | Outsourcing / Dediziertes Team. Vollzeit.",
  [ETranslationKey.ExperienceLanarsHighlight1]:
    "Ich beteiligte mich an der Projektplanung und Aufwandsschätzung und lieferte detaillierte Einschätzungen der für die Umsetzung erforderlichen Entwicklungszeit.",
  [ETranslationKey.ExperienceLanarsHighlight2]:
    "Ich nahm an technischen Diskussionen mit Teammitgliedern und Stakeholdern teil und half dabei, Funktionen in klar definierte Entwicklungsaufgaben zu zerlegen.",
  [ETranslationKey.ExperienceLanarsHighlight3]:
    "Ich entwickelte responsive Landingpages für verschiedene Produkte mit besonderem Augenmerk auf Performance und Wartbarkeit.",
  [ETranslationKey.ExperienceLanarsHighlight4]:
    "Ich entwickelte Backend-APIs für Mobile-Anwendungen, darunter einen Gassi-Service für Haustiere und eine Marktplatzplattform.",
  [ETranslationKey.ExperienceLanarsHighlight5]:
    "Ich implementierte ein Administrationspanel für einen Marktplatz und ein Kundenbeziehungsmanagementsystem für ein Gaming-Unternehmen, sodass operative Teams Inhalte, Nutzer und Arbeitsabläufe verwalten konnten.",
};

export const TRANSLATIONS: Record<ELocale, Translations> = {
  [ELocale.En]: EN_TRANSLATIONS,
  [ELocale.Ru]: RU_TRANSLATIONS,
  [ELocale.Sp]: SP_TRANSLATIONS,
  [ELocale.De]: DE_TRANSLATIONS,
};
