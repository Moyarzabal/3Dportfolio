import {
  QQBridge,
  utokyo,
  fujitsu,
  threeDportfolio,
  Edibuddy,
  Gymini,
  Ranking,
  virtualRubik,
  portfolio,
  backToTheChildhood,
  vrBaseball,
  voidStrike,
} from "../assets";

export const navLinks = [
  { id: "about", title: "About" },
  { id: "education", title: "Education" },
  { id: "research", title: "Research" },
  { id: "experience", title: "Experience" },
  { id: "works", title: "Projects" },
  { id: "contact", title: "Contact" },
];

export const socials = {
  github: "https://github.com/Moyarzabal",
  linkedin: "https://linkedin.com/in/shun-takenaka",
  email: "moyarzabalstake@gmail.com",
};

export const heroWords = ["Future", "World", "Dreams", "Destiny", "Innovation"];

export const stats = [
  { value: 6, suffix: "+", label: "Years coding" },
  { value: 6, suffix: "", label: "Publications" },
  { value: 9, suffix: "+", label: "Projects shipped" },
  { value: 2, suffix: "", label: "Degrees" },
];

export const expertise = [
  "Full-Stack Development",
  "Human-Computer Interaction",
  "Virtual Reality",
  "Cloud Architecture",
  "AI-Driven Development",
  "Research & Development",
  "Mobile (Flutter / RN)",
  "Unity / C#",
  "Google Cloud",
  "Vibe Coding",
];

export const techStack = [
  "cplusplus",
  "csharp",
  "css3",
  "github",
  "html5",
  "javascript",
  "react",
  "tailwindcss",
  "threejs",
  "typescript",
  "VBA",
  "python",
  "Java",
  "GCP",
  "AWS",
  "unity",
  "vitejs",
  "git",
];

export const education = [
  {
    logo: "/images/shibumaku2.png",
    title: "渋谷教育学園幕張高等学校",
    subtitle: "Shibuya Education Academy Makuhari High School",
    date: "Apr. 2015 – Mar. 2018",
    year: "2015",
  },
  {
    logo: "/images/utokyo.png",
    title: "東京大学 工学部 機械情報工学科",
    subtitle: "B.Eng. — Department of Mechano-Informatics, The University of Tokyo",
    date: "Apr. 2019 – Mar. 2023",
    year: "2019",
  },
  {
    logo: "/images/utokyo.png",
    title: "東京大学大学院 情報理工学系研究科 知能機械情報学専攻",
    subtitle:
      "M.S. — Department of Mechano-Informatics, Graduate School of Information Science and Technology, The University of Tokyo",
    date: "Apr. 2023 – Mar. 2025",
    year: "2023",
  },
];

export const publications = [
  {
    title:
      "Who Are You, Again?: Effect of Changing Partners' Avatars and Virtual Environments on Profile Memory",
    venue: "ACM Symposium on Applied Perception (SAP '23)",
    year: "2023",
    type: "Conference",
    image: "/images/webp/Research11.webp",
    link: "/pdfs/SAPposter.pdf",
  },
  {
    title: "Effects of Human and Animal Partner-Avatars on Profile Memory in Virtual Reality",
    venue: "ACM Symposium on Applied Perception (SAP '24)",
    year: "2024",
    type: "Conference",
    image: "/images/webp/Research2.webp",
    link: "https://doi.org/10.1145/3675231.3675241",
  },
  {
    title: "セルフアバタによる身体化がVR回想法に与える効果",
    venue: "第29回日本バーチャルリアリティ学会大会論文集",
    year: "2024",
    type: "Domestic",
    image: "/images/webp/Research3.webp",
    link: "https://conference.vrsj.org/ac2024/program/doc/2D1-11.pdf",
  },
  {
    title:
      "Multiple Self-Avatar Effect: Effects of Using Diverse Self-Avatars on Memory Acquisition and Retention of Sign-Language Gestures",
    venue: "IEEE Transactions on Visualization and Computer Graphics (TVCG)",
    year: "2024",
    type: "Journal · 2nd author",
    image: "/images/webp/Research4.webp",
    link: "https://ieeexplore.ieee.org/abstract/document/10609545",
  },
  {
    title:
      "Exploring the Effects of Self-Avatars on Virtual Reality-Based Reminiscence Therapy for Young Adults",
    venue: "IEEE VR 2025 Workshops (VRW)",
    year: "2025",
    type: "Workshop",
    image: "/images/webp/Research5.webp",
    link: "https://doi.org/10.1109/VRW66409.2025.00158/",
  },
  {
    title:
      "Back to the Childhood: Investigating the Role of Self-Avatars in Virtual Reality-Based Reminiscence Therapy",
    venue: "Augmented Humans International Conference (AHs '25)",
    year: "2025",
    type: "Conference",
    image: "/images/webp/Research6.webp",
    link: "https://doi.org/10.1145/3745900.3746067",
  },
];

export const experiences = [
  {
    title: "C/C++ Developer",
    company: "The University of Tokyo",
    icon: utokyo,
    date: "Mar 2020 – Apr 2021",
    points: [
      "Updated exercise lecture materials and programs at a professor's request",
      "Developed and maintained assignments on image processing, computer graphics and AR/VR",
      "Migrated OpenCV / OpenGL programs from C to C++ and refactored for API changes",
    ],
  },
  {
    title: "GCP Engineer",
    company: "QQBridge",
    icon: QQBridge,
    date: "Jun 2024 – Feb 2025",
    points: [
      "Built a serverless knowledge-search & conversational QA platform on Google Cloud that ingests, updates and deletes documents from GCS automatically",
      "Exposed three chat endpoints of increasing sophistication (Search, Conversation, Answer API) with Gemini-based reranking",
      "Synced metadata into an Agent Builder datastore for enterprise document querying",
    ],
  },
  {
    title: "Solution Engineer",
    company: "Fujitsu",
    icon: fujitsu,
    date: "Apr 2025 – Present",
    current: true,
    points: [
      "Designed web and in-store operation screens for a major telecom service",
      "Worked across requirements, design, development and testing in a BFF / BS / Integration layered framework",
      "Built automation tools that generate YAML and DTOs directly from Excel-based API specifications",
      "Implemented with VBA, PowerShell, Batch, TypeScript/Java DTOs and Python",
    ],
  },
];

export const projects = [
  {
    name: "Gymini",
    tagline: "AI personal trainer in your pocket",
    description:
      "ジム入会者の96%が1年以内に辞めてしまうほど、筋トレを継続するのは大変なことです。AIトレーナーRooちゃんが目標や生活スタイルに合わせて相談に乗り、最適なメニューを提案し、トレーニングを記録・可視化。初心者でも迷わず続けられる運動習慣をつくります。",
    tags: ["Google Cloud", "Flutter", "Gemini", "Firebase"],
    image: Gymini,
    featured: true,
    source: "https://github.com/Moyarzabal/GCP-Hackathon-F06",
    links: [
      { type: "appstore", url: "https://apps.apple.com/jp/app/gymini/id6758005538", label: "App Store" },
      { type: "zenn", url: "https://zenn.dev/douxsh/articles/gymini-hackathon-2026", label: "Zenn" },
      { type: "youtube", url: "https://youtu.be/mQ1dcKxOBv0", label: "Demo" },
    ],
  },
  {
    name: "Edibuddy",
    tagline: "Make friends with your food, cut waste",
    description:
      "冷蔵庫の食材をAIでキャラクター化し、賞味期限に応じて表情や感情が変化。食材と友達のように接しながら期限切れを楽しく防ぎ、AIが冷蔵庫の中身から献立を提案して自然にフードロスを削減します。",
    tags: ["Google Cloud", "Flutter", "ADK", "Firebase"],
    image: Edibuddy,
    source: "https://github.com/Moyarzabal/GCP-Hackathon-F06",
    links: [
      { type: "zenn", url: "https://zenn.dev/moyarzabalstake/articles/d102dde6403bc9", label: "Zenn" },
      { type: "youtube", url: "https://youtu.be/tLUlEh-jQFA", label: "Demo" },
    ],
  },
  {
    name: "Rank Party",
    tagline: "A party game about how you see the world",
    description:
      "あなたの価値観を可視化し、友達との価値観の違いを楽しく発見できるモバイルアプリ。出題者がお題に対する選択肢を順位づけし、その順番を他のプレイヤーが当てる飲みゲームをアプリ化しました。",
    tags: ["React Native", "Expo", "Gemini"],
    image: Ranking,
    source: "https://github.com/Moyarzabal/KachikanRanking",
    links: [
      { type: "appstore", url: "https://apps.apple.com/jp/app/rank-party/id6758461422", label: "App Store" },
      { type: "youtube", url: "https://youtu.be/tsgqRMKCtU8", label: "Demo" },
    ],
  },
  {
    name: "3D Portfolio",
    tagline: "This very site",
    description:
      "React、Three.js、GSAP、Tailwind CSSで構築したインタラクティブなポートフォリオ。3Dシーン、慣性スクロール、スクロール連動アニメーションを備えています。",
    tags: ["React", "Three.js", "GSAP", "Tailwind"],
    image: threeDportfolio,
    source: "https://github.com/Moyarzabal/3Dportfolio",
    links: [{ type: "website", url: "https://stake-portfolio.netlify.app/", label: "Live" }],
  },
  {
    name: "Portfolio (Student era)",
    tagline: "Where it started",
    description:
      "修士学生時代に作成したポートフォリオ。研究内容やインターンシップ参加情報、過去プロジェクトなどをシンプルにまとめています。",
    tags: ["HTML", "CSS", "JavaScript"],
    image: portfolio,
    source: "https://github.com/Moyarzabal/virtual_rubik-s_cube",
    links: [{ type: "website", url: "https://main--shuntakenaka.netlify.app/", label: "Live" }],
  },
  {
    name: "Back to the Childhood",
    tagline: "VR reminiscence therapy",
    description:
      "子どもまたは高齢者の姿をしたアバタに変身し、昭和の風景を体験できるVRプロジェクト。高齢者が体験することで過去を回想し、心理的に若返る効果を研究しました。",
    tags: ["C#", "Unity", "Meta Quest"],
    image: backToTheChildhood,
    source: "https://github.com/Moyarzabal/RejuvenationClassRoom",
    links: [],
  },
  {
    name: "VR野球BAN!",
    tagline: "Two-player VR baseball",
    description:
      "ピッチャーはスイング速度とジョイスティックで球速や変化球を操作し、バッターはコントローラー連動のバットで打撃。リアルな打球挙動と現実では不可能な変化球軌道、追従カメラ、スコアボードを搭載。",
    tags: ["C# / Unity", "Meta Quest"],
    image: vrBaseball,
    source: "https://github.com/Moyarzabal/VR_Yakyu_BAN",
    links: [],
  },
  {
    name: "VoidStrike",
    tagline: "Multiplayer VR FPS",
    description:
      "Photon Networkを用いたオンライン対戦VR FPS。対戦部屋の作成・検索、ジョイスティック移動、ダッシュ、射撃、リロードといった操作に対応。",
    tags: ["C# / Unity", "Photon", "Meta Quest"],
    image: voidStrike,
    source: "https://github.com/Moyarzabal/VR_multi_FPS",
    links: [],
  },
  {
    name: "Virtual Rubik's Cube",
    tagline: "My first program",
    description:
      "大学3年次に制作した初のプログラミング作品。2×2×2のルービックキューブを仮想空間で操作でき、キーボードで面の選択・回転・視点移動が可能。",
    tags: ["C++", "OpenGL"],
    image: virtualRubik,
    source: "https://github.com/Moyarzabal/virtual_rubik-s_cube",
    links: [],
  },
];
