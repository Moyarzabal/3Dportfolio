import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  QQBridge,
  utokyo,
  fujitsu,
  threejs,
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
  {
    id: "about",
    title: "About",
  },
  {
    id: "education",
    title: "Education",
  },
  {
    id: "research",
    title: "Research",
  },
  {
    id: "work",
    title: "Experience",
  },
  {
    id: "works",
    title: "Projects",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Web Developer",
    icon: web,
  },
  {
    title: "React Native Developer",
    icon: mobile,
  },
  {
    title: "Backend Developer",
    icon: backend,
  },
  {
    title: "Content Creator",
    icon: creator,
  },
];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Redux Toolkit",
    icon: redux,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "Three JS",
    icon: threejs,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "figma",
    icon: figma,
  },
  {
    name: "docker",
    icon: docker,
  },
];

const experiences = [
  {
    title: "C/C++ Developer",
    company_name: "University of Tokyo",
    icon: utokyo,
    iconBg: "#383E56",
    date: "March 2020 - April 2021",
    points: [
      "Updated university exercise lecture materials and programs at the request of a professor",
      "Developed and maintained exercise assignments on image processing, computer graphics, and AR/VR",
      "Migrated OpenCV/OpenGL programs from C to C++ implementations",
      "Addressed API specification changes, refactored and optimized code, and added comments and sample programs",
    ],
  },
  {
    title: "GCP Engineer",
    company_name: "QQBridge",
    icon: QQBridge,
    iconBg: "#E6DEDD",
    date: "Jun 2024 - Feb 2025",
    points: [
      "Built a serverless knowledge search & conversational QA platform on Google Cloud that automatically ingests, updates, and deletes documents from GCS, supports multi‑mode chat, and improves relevance via Gemini-based reranking.",
      "This system enables enterprise knowledge ingestion and conversational querying over documents stored in Google Cloud Storage. It orchestrates automated import, metadata updates, and deletion syncing into an Agent Builder datastore and exposes three chat endpoints with increasing sophistication (Search API, Conversation API, Answer API with reranking).",
    ],
  },
  {
    title: "Solution Engineer",
    company_name: "Fujitsu",
    icon: fujitsu,
    iconBg: "#383E56",
    date: "Apr 2025 - Present",
    points: [
      "Designed web and in-store operation screens for a major telecom service",
      "Worked across requirements definition, design, development, and testing within a framework structured into BFF, BS, and Integration layers",
      "Developed automation tools to generate YAML and DTOs directly from Excel-based API specification documents",
      "Implemented using VBA, PowerShell, Batch scripts, TypeScript/Java DTOs, and Python for file operations",
    ],
  },
];

const testimonials = [
  {
    testimonial:
      "I thought it was impossible to make a website as beautiful as our product, but Rick proved me wrong.",
    name: "Sara Lee",
    designation: "CFO",
    company: "Acme Co",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    testimonial:
      "I've never met a web developer who truly cares about their clients' success like Rick does.",
    name: "Chris Brown",
    designation: "COO",
    company: "DEF Corp",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    testimonial:
      "After Rick optimized our website, our traffic increased by 50%. We can't thank them enough!",
    name: "Lisa Wang",
    designation: "CTO",
    company: "456 Enterprises",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

const projects = [
  {
    name: "Gymini",
    description: "ジム入会者の96%が1年以内に辞めてしまうほど、筋トレを継続するのは大変なことです。原因は「何をすればいいか分からない」「成果が見えない」こと。Gyminiアプリは、AIトレーナーRooちゃんがあなたの目標や生活スタイルに合わせて、相談に乗ってくれるとともに最適なメニューを提案し、トレーニングを記録・可視化してくれるアプリです 。高額なパーソナルトレーナーではなく、いつでもポケットの中にいる専属トレーナーとして、初心者でも迷わず続けられる運動習慣をつくります。",
    tags: [
      { name: "Google Cloud", color: "blue-text-gradient" },
      { name: "flutter", color: "green-text-gradient" },
      { name: "Gemini", color: "pink-text-gradient" },
      { name: "Firebase", color: "orange-text-gradient" },
    ],
    image: Gymini,
    source_code_link: "https://github.com/Moyarzabal/GCP-Hackathon-F06",
    additional_links: [
      {
        type: "appstore",
        url: "https://apps.apple.com/jp/app/gymini/id6758005538#productRatings",
        label: "App Store"
      },
      {
        type: "zenn",
        url: "https://zenn.dev/douxsh/articles/gymini-hackathon-2026",
        label: "Zenn記事"
      },
      {
        type: "youtube",
        url: "https://youtu.be/mQ1dcKxOBv0",
        label: "デモ動画"
      }
    ]
  },
  {
    name: "Edibuddy",
    description: "Edibuddyは、冷蔵庫の食材をAIでキャラクター化し、賞味期限に応じて表情や感情を変化させるユニークなアプリです。ユーザーはまるで食材と友達のように接しながら、期限切れを楽しく防げます。さらにAIが冷蔵庫の中身から献立を提案することで、自然に食品ロスを減らし、持続可能な暮らしをサポートします。\n" +
      "「食材に愛着を持つことで、楽しくフードロスを削減する」――それがEdibuddyです。",
    tags: [
      { name: "Google Cloud", color: "blue-text-gradient" },
      { name: "flutter", color: "green-text-gradient" },
      { name: "ADK(Agent Development Kit)", color: "pink-text-gradient" },
      { name: "Firebase", color: "orange-text-gradient" },
    ],
    image: Edibuddy,
    source_code_link: "https://github.com/Moyarzabal/GCP-Hackathon-F06",
    additional_links: [
      {
        type: "zenn",
        url: "https://zenn.dev/moyarzabalstake/articles/d102dde6403bc9",
        label: "Zenn記事"
      },
      {
        type: "youtube",
        url: "https://youtu.be/tLUlEh-jQFA", // 実際のYouTube動画URLに置き換えてください
        label: "デモ動画"
      }
    ]
  },
  {
    name: "Rank Party",
    description: "あなたの価値観を可視化し、友達との価値観の違いを楽しく発見できるモバイルアプリです。出題者はお題に対する選択肢を順位づけして並べ，その順番を他のプレイヤーで当てるという，トランプで行われていた飲みゲームをアプリにしました！",
    tags: [
      { name: "React Native", color: "blue-text-gradient" },
      { name: "Expo", color: "green-text-gradient" },
      { name: "Gemini", color: "pink-text-gradient" },
    ],
    image: Ranking,
    source_code_link: "https://github.com/Moyarzabal/KachikanRanking",
    additional_links: [
      {
        type: "appstore",
        url: "https://apps.apple.com/jp/app/rank-party/id6758461422",
        label: "App Store"
      },
      {
        type: "youtube",
        url: "https://youtu.be/tsgqRMKCtU8",
        label: "デモ動画"
      }
    ]
  },
  {
    name: "3D Portfolio Website (Current Project)",
    description:
      "React、Three.js、Tailwind CSSで構築されたモダンでインタラクティブなポートフォリオサイト。3Dグラフィックスやレスポンシブ性，豊富なアニメーションを備えたUIが特徴。",
    tags: [
      { name: "react", color: "blue-text-gradient" },
      { name: "threejs", color: "green-text-gradient" },
      { name: "tailwind", color: "pink-text-gradient" },
      { name: "GSAP", color: "orange-text-gradient" },
    ],
    image: threeDportfolio,
    source_code_link: "https://github.com/Moyarzabal/3Dportfolio",
    additional_links: [
      {
        type: "website",
        url: "https://stake-portfolio.netlify.app/",
        label: "ポートフォリオサイト"
      }
    ]
  },
  {
    name: "Portfolio(学生時代)",
    description:
      "修士学生時代に作成したポートフォリオ。研究内容やインターンシップ参加情報、過去プロジェクトなどがシンプルにまとめられ、紹介されている。",
    tags: [
      {
        name: "HTML",
        color: "blue-text-gradient",
      },
      {
        name: "CSS",
        color: "green-text-gradient",
      },
      {
        name: "JavaScript",
        color: "pink-text-gradient",
      },
    ],
    image: portfolio,
    source_code_link: "https://github.com/Moyarzabal/virtual_rubik-s_cube",
    additional_links: [
      {
        type: "website",
        url: "https://main--shuntakenaka.netlify.app/",
        label: "ポートフォリオサイト"
      }
    ]
  },
  {
    name: "Back to the Childhood",
    description:
      "修士時代に研究でも使用したVRプロジェクトで、子どもまたは高齢者の姿をしたアバタに変身し、昭和の風景を体験可能。高齢者が体験することで、過去を回想し、心理的にも若返ることができる。",
    tags: [
      {
        name: "C#",
        color: "blue-text-gradient",
      },
      {
        name: "Unity",
        color: "green-text-gradient",
      },
      {
        name: "Meta Quest",
        color: "pink-text-gradient",
      },
    ],
    image: backToTheChildhood,
    source_code_link: "https://github.com/Moyarzabal/RejuvenationClassRoom",
  },
  {
    name: "VR野球BAN!",
    description:
      "2人対戦型のVR野球ゲーム。ピッチャーとバッターがそれぞれコントローラーを持ち、ピッチャーはスイング速度とジョイスティック操作により球速や変化球の方向を操作し、バッターはコントローラー連動のバットで打撃を行う。物理的にリアルな打球挙動や，現実では不可能な変化球軌道、また打球追従カメラ、スコアボード、効果音やBGMなども搭載され、臨場感の高いVR野球体験が可能。",
    tags: [
      {
        name: "C#/Unity",
        color: "blue-text-gradient",
      },
      {
        name: "Meta Quest",
        color: "green-text-gradient",
      },
    ],
    image: vrBaseball,
    source_code_link: "https://github.com/Moyarzabal/VR_Yakyu_BAN",
  },
  {
    name: "VoidStrike",
    description:
      "Photon Networkを用いたオンライン対戦が可能なVRでのマルチプレイヤーFPSゲーム。プレイヤーは対戦部屋を作成または検索して参加し、ジョイスティックで移動、Aボタンで走行、トリガーで射撃、マガジンのリロードといった操作が可能。",
    tags: [
      {
        name: "C#/Unity",
        color: "blue-text-gradient",
      },
      {
        name: "Meta Quest",
        color: "green-text-gradient",
      },
    ],
    image: voidStrike,
    source_code_link: "https://github.com/Moyarzabal/VR_multi_FPS",
  },
  {
    name: "Virtual Rubik's Cube",
    description:
      "大学3年次に制作した初のプログラミング作品で，2×2×2のルービックキューブを仮想空間で操作できるアプリケーション。キーボードで面の選択や回転、視点の移動ができ、現実のキューブに近い操作感を再現している。",
    tags: [
      {
        name: "C++",
        color: "blue-text-gradient",
      },
    ],
    image: virtualRubik,
    source_code_link: "https://github.com/Moyarzabal/virtual_rubik-s_cube",
  },
];

const words = [
  "Future",
  "World",
  "Dreams",
  "Destiny",
  "Innovation",
  "Future",
  "World",
  "Dreams",
  "Destiny",
  "Innovation",
];

const counterItems = [
  { value: 6, suffix: "+", label: "Years of Experience" },
  { value: 6, suffix: "+", label: "Published Papers" },
  { value: 8, suffix: "+", label: "Completed Projects" },
  { value: 2, suffix: "+", label: "Academic Degrees" },
];

const edcCards = [
  {
    // imgPath: "/images/exp1.png",
    logoPath: "/images/shibumaku2.png",
    title: "私立 渋谷教育学園幕張高等学校",
    date: "Apr. 2015 ~ Mar. 2018",
    responsibilities: ["Shibuya Education Academy Makuhari High School"],
  },
  {
    // imgPath: "/images/exp2.png",
    logoPath: "/images/utokyo.png",
    title: "東京大学\n理科一類 → 工学部 機械情報工学科",
    date: "Apr. 2019 ~ Mar. 2023",
    responsibilities: [
      "Bachelor's degree at the Department of Mechano-Infomatics, The University of Tokyo",
    ],
  },
  {
    // imgPath: "/images/exp3.png",
    logoPath: "/images/utokyo.png",
    title: "東京大学大学院 情報理工学系研究科 \n知能機械情報学専攻（修士課程）",
    date: "Apr. 2023 ~ Mar. 2025",
    responsibilities: [
      "Master's degree at the Department of Mechano-Informatics, Graduate School of Information Science and Technology, The University of Tokyo",
    ],
  },
];

export {
  services,
  technologies,
  experiences,
  testimonials,
  projects,
  words,
  counterItems,
  edcCards,
};
