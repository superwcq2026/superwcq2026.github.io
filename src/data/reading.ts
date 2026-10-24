export interface ReadingPassage {
  id: number;
  title: string;
  author: string;
  content: string[];
  questions: {
    id: number;
    question: string;
    options: string[];
    answer: string;
    explanation: string;
  }[];
}

export const readingPassages: ReadingPassage[] = [
  {
    id: 1,
    title: "Lulu Goes to Witch School (1)",
    author: "Jane O'Connor",
    content: [
      "It is the first day of witch school. Lulu Witch is happy. She is scared, too. She has never been to witch school before.",
      "Lulu cannot eat her breakfast. She has butterflies in her stomach. Part of Lulu hopes she is little, like Witch Baby. Part of Lulu hopes she is staying home with Mama Witch.",
      "Lulu gets her new broom and her lunch box. \"Goodbye,\" she calls.",
      "Mama Witch kisses Lulu Witch. Witch Baby waves bye-bye.",
      "Lulu walks to witch school as fast as she can. She doesn't want to be late. Lots of little witches are going into the witch school.",
      "A witch stands at the school gate. \"Hello, I am Miss Slime,\" she says. \"I am your teacher.\"",
      "\"Hello, I am Lulu Witch,\" says Lulu.",
      "Miss Slime smiles. She has a long nose. Lulu thinks Miss Slime is very pretty.",
      "Miss Slime takes Lulu to her classroom. \"Here is your locker,\" Miss Slime tells Lulu. \"It has a picture of a bat on it. You can put your broom and your lunch box here.\"",
      "Lulu sits down at a big table. A little witch with curly hair sits next to her.",
      "\"Hello, I am Lulu Witch,\" says Lulu.",
      "\"Hello, I am Sandy Witch,\" says the little witch with curly hair. \"Do you have your own magic wand?\"",
      "\"No,\" says Lulu Witch.",
      "\"I do,\" says Sandy Witch. \"Do you have your own black cat?\"",
      "\"Not yet,\" says Lulu Witch.",
      "\"I do,\" says Sandy Witch. \"Do you have your own broom?\" asks Lulu.",
      "\"Of course,\" says Sandy Witch. \"I got my first broom when I was three.\"",
    ],
    questions: [
      { id: 1, question: "How does Lulu feel on her first day of witch school?", options: ["A. Happy only", "B. Scared only", "C. Happy and scared", "D. Sad and angry"], answer: "C", explanation: "文中提到Lulu is happy. She is scared, too." },
      { id: 2, question: "What does \"butterflies in her stomach\" mean?", options: ["A. She ate butterflies for breakfast", "B. She feels nervous", "C. She likes butterflies", "D. She has a stomachache"], answer: "B", explanation: "这是一个习语，表示紧张、忐忑不安" },
      { id: 3, question: "Who is Miss Slime?", options: ["A. A student", "B. Lulu's mother", "C. Lulu's teacher", "D. The school gatekeeper"], answer: "C", explanation: "文中Miss Slime说I am your teacher" },
      { id: 4, question: "What does Sandy Witch have that Lulu doesn't have?", options: ["A. A broom", "B. A magic wand", "C. A lunch box", "D. Curly hair"], answer: "B", explanation: "Sandy有魔杖，Lulu没有" },
    ],
  },
  {
    id: 2,
    title: "Lulu Goes to Witch School (2)",
    author: "Jane O'Connor",
    content: [
      "Lulu Witch and Sandy Witch have to stop talking. Miss Slime is standing in front of the class. She tells all the little witches, \"You are going to be busy in witch school.\"",
      "First they sing a song called \"We Are Happy Witches\". Sandy Witch already knows the words. Then they draw pictures. Sandy Witch's picture is really good. Miss Slime puts it on the wall.",
      "At lunch, Sandy Witch gets to pass out the lizard tarts. After the little witches eat their tarts, Miss Slime tells them to get their brooms. She is going to show them how to fly.",
      "Miss Slime and all the little witches go out. One by one, the little witches try to fly on their brooms.",
      "One little witch falls as soon as she takes off.",
      "One little witch bumps into a tree.",
      "One little witch wobbles up and down.",
      "At last it is Lulu's turn. Up, up, up she flies. She does not wobble. She does not bump into anything. She even flies backward.",
      "Lulu flies backward all the way down. \"Very good, Lulu!\" says Miss Slime.",
      "Lulu Witch smiles. Miss Slime is proud of her!",
      "Then it is Sandy Witch's turn. Sandy Witch flies backward. She flies upside down. She even flies with no hands!",
      "\"Wow!\" shout the little witches.",
    ],
    questions: [
      { id: 1, question: "What song do they sing first?", options: ["A. We Are Sad Witches", "B. We Are Happy Witches", "C. Flying Witches", "D. Witch School Song"], answer: "B", explanation: "文中提到First they sing a song called 'We Are Happy Witches'" },
      { id: 2, question: "What happens at lunch time?", options: ["A. They sing songs", "B. Sandy passes out lizard tarts", "C. They learn to fly", "D. They draw pictures"], answer: "B", explanation: "文中提到At lunch, Sandy Witch gets to pass out the lizard tarts" },
      { id: 3, question: "How does Lulu fly?", options: ["A. She falls down", "B. She bumps into a tree", "C. She flies well without wobbling", "D. She cannot fly"], answer: "C", explanation: "文中描述Lulu飞得很好，不摇晃也不撞到东西" },
      { id: 4, question: "What does Sandy do when she flies?", options: ["A. She falls down", "B. She flies upside down and with no hands", "C. She bumps into a tree", "D. She wobbles up and down"], answer: "B", explanation: "文中提到Sandy Witch flies backward, upside down, and with no hands" },
    ],
  },
];

export const selfIntroTemplate = {
  title: "自我介绍模板",
  template: `Hello, everyone. My name is Li Ming. I'm 10 years old.

I'm a student in Yucai Primary School, and I'm in Class 3, Grade 5. I have black hair and brown eyes. I'm an outgoing person. I like to make friends with others. I have many hobbies. I like reading, such as reading storybooks. I also enjoy playing basketball, and I often play it with my classmates in my free time. There are four people in my family. They are my father, my mother, my sister and me. I love my family very much.

I hope we can be good friends and have a great time together. Thank you!`,
  hints: [
    "用英语写一段自我介绍",
    "介绍你的姓名、年龄和学校",
    "描述你的外貌和性格",
    "谈谈你的爱好",
    "介绍你的家庭成员",
  ],
};

export const movieRecommendations = [
  {
    title: "疯狂动物城 (Zootopia)",
    type: "动画电影",
    description: "在一个所有动物和平共处的动物城市，兔子朱迪通过自己努力奋斗完成儿时梦想，成为动物警察的故事。",
  },
  {
    title: "冰雪奇缘 (Frozen)",
    type: "动画电影",
    description: "小国阿伦黛尔因一个魔咒永远地被冰天雪地覆盖，为了寻回夏天，安娜公主和山民克里斯托夫以及他的驯鹿搭档组队出发，展开一段拯救王国的历险。",
  },
  {
    title: "寻梦环游记 (Coco)",
    type: "动画电影",
    description: "热爱音乐的小男孩米格和落魄乐手埃克托在五彩斑斓的神秘世界开启了一段奇妙冒险旅程的故事。",
  },
  {
    title: "飞屋环游记 (Up)",
    type: "动画电影",
    description: "老人卡尔用气球让他的房子飞上了天空，开始了他和老伴儿艾丽一直梦想的南美洲仙境瀑布之旅。",
  },
  {
    title: "功夫熊猫 (Kung Fu Panda)",
    type: "动画电影",
    description: "一只笨拙的熊猫立志成为武林高手的故事，充满中国元素和幽默。",
  },
  {
    title: "哈利·波特 (Harry Potter)",
    type: "剧情电影",
    description: "一个年轻巫师学生哈利·波特在霍格沃茨魔法学校的冒险故事。",
  },
  {
    title: "当幸福来敲门 (The Pursuit of Happyness)",
    type: "剧情电影",
    description: "一位濒临破产、老婆离家的落魄业务员，如何刻苦耐劳地善尽单亲责任，奋发向上成为股市交易员，最后成为知名的金融投资家的故事。",
  },
  {
    title: "奇迹男孩 (Wonder)",
    type: "剧情电影",
    description: "一个有面部缺陷的小男孩如何进入普通学校，重拾自信、积极面对生活的励志故事。",
  },
  {
    title: "查理和巧克力工厂 (Charlie and the Chocolate Factory)",
    type: "剧情电影",
    description: "小男孩查理参观神秘的巧克力工厂，经历了一场奇幻冒险。由蒂姆·波顿导演，充满想象力和视觉奇观。",
  },
  {
    title: "天才眼镜狗 (Mr. Peabody & Sherman)",
    type: "剧情电影",
    description: "一只聪明的狗和他的养子利用时光机穿越历史，展开了一系列妙趣横生的冒险故事。",
  },
  {
    title: "歌舞青春 (High School Musical)",
    type: "剧情电影",
    description: "高中生特洛伊和加布里埃尔克服重重困难，追逐音乐梦想的青春励志故事，充满动听的歌曲和舞蹈。",
  },
  {
    title: "公主日记 (The Princess Diaries)",
    type: "剧情电影",
    description: "普通旧金山女孩米娅突然被告知自己是欧洲小国吉诺维亚的公主，在祖母的帮助下学习成为公主的故事。",
  },
  {
    title: "辣妈辣妹 (Freaky Friday)",
    type: "剧情电影",
    description: "一对经常争吵的母女意外互换身体，在体验对方生活的过程中逐渐理解彼此，修复关系的温馨喜剧。",
  },
  {
    title: "高校天后 (Confessions of a Teenage Drama Queen)",
    type: "剧情电影",
    description: "一个充满戏剧梦想的女孩从纽约搬到新泽西后，在新学校里追寻明星梦想的青春喜剧。",
  },
  {
    title: "像乔丹一样 (Like Mike)",
    type: "剧情电影",
    description: "一个孤儿院的孩子偶然穿上乔丹穿过的球鞋后，获得了惊人球技，梦想成真的励志篮球故事。",
  },
];
