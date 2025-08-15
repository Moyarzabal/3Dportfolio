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
    meta,
    QQBridge,
    utokyo,
    fujitsu,
    threejs,
    threeDportfolio,
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
        "教授の依頼を受け，大学の演習講義用の資料の作成・更新を行なった．",
        "画像処理やコンピュータグラフィクス，AR/VRといった技術について，OpenCVやOpenGLといったライブラリを使ったプログラムとともに体系的に学習する講義．",
        "既存の講義用資料とプログラムがC言語を用いていたのに対し，OpenCV等のライブラリのAPI仕様の変更によりC++言語での実装が必要になり，その更新を行なった.",
      ],
    },
    {
      title: "GCP Engineer",
      company_name: "QQBridge",
      icon: QQBridge,
      iconBg: "#E6DEDD",
      date: "Jun 2024 - Feb 2025",
      points: [
        "Developing and maintaining web applications using React.js and other related technologies.",
        "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
        "Implementing responsive design and ensuring cross-browser compatibility.",
        "Participating in code reviews and providing constructive feedback to other developers.",
      ],
    },
    {
      title: "Solution Engineer",
      company_name: "Fujitsu",
      icon: fujitsu,
      iconBg: "#383E56",
      date: "Apr 2025 - Present",
      points: [
        "Developing and maintaining web applications using React.js and other related technologies.",
        "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
        "Implementing responsive design and ensuring cross-browser compatibility.",
        "Participating in code reviews and providing constructive feedback to other developers.",
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
    { text: "Ideas", imgPath: "/images/ideas.svg" },
    { text: "Concepts", imgPath: "/images/concepts.svg" },
    { text: "Designs", imgPath: "/images/designs.svg" },
    { text: "Code", imgPath: "/images/code.svg" },
    { text: "Ideas", imgPath: "/images/ideas.svg" },
    { text: "Concepts", imgPath: "/images/concepts.svg" },
    { text: "Designs", imgPath: "/images/designs.svg" },
    { text: "Code", imgPath: "/images/code.svg" },
  ];
  
  const counterItems = [
    { value: 15, suffix: "+", label: "Years of Experience" },
    { value: 200, suffix: "+", label: "Satisfied Clients" },
    { value: 108, suffix: "+", label: "Completed Projects" },
    { value: 90, suffix: "%", label: "Client Retention Rate" },
  ];

  const edcCards = [
    {
      // imgPath: "/images/exp1.png",
      logoPath: "/images/shibumaku2.png",
      title: "私立 渋谷教育学園幕張高等学校",
      date: "Apr. 2015 ~ Mar. 2018",
      responsibilities: [
        "Shibuya Education Academy Makuhari High School"
      ],
    },
    {
      // imgPath: "/images/exp2.png",
      logoPath: "/images/utokyo.png",
      title: "東京大学 理科一類 → 工学部 機械情報工学科",
      date: "Apr. 2019 ~ Mar. 2023",
      responsibilities: [
        "Bachelor's degree at the Department of Mechano-Infomatics, The University of Tokyo"
      ],
    },
    {
      // imgPath: "/images/exp3.png",
      logoPath: "/images/utokyo.png",
      title: "東京大学大学院 情報理工学系研究科 知能機械情報学専攻（修士課程）",
      date: "Apr. 2023 ~ Mar. 2025",
      responsibilities: [
        "Master's degree at the Department of Mechano-Informatics, Graduate School of Information Science and Technology, The University of Tokyo"
      ],
    },
  ];
  
  
  export { services, technologies, experiences, testimonials, projects, words, counterItems, edcCards };