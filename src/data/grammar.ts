export interface GrammarQuestion {
  id: number;
  type: "fill_blank" | "multiple_choice" | "sentence_transform" | "error_correction";
  question: string;
  options?: string[];
  answer: string;
  explanation: string;
}

export interface GrammarDay {
  day: number;
  title: string;
  questions: GrammarQuestion[];
}

export const grammarDays: GrammarDay[] = [
  {
    day: 1,
    title: "名词专练",
    questions: [
      { id: 1, type: "fill_blank", question: "computer 的复数形式是 ______", answer: "computers", explanation: "一般名词变复数直接加-s" },
      { id: 2, type: "fill_blank", question: "apple 的复数形式是 ______", answer: "apples", explanation: "一般名词变复数直接加-s" },
      { id: 3, type: "fill_blank", question: "city 的复数形式是 ______", answer: "cities", explanation: "以辅音字母+y结尾的名词，变y为i再加-es" },
      { id: 4, type: "fill_blank", question: "house 的复数形式是 ______", answer: "houses", explanation: "一般名词变复数直接加-s" },
      { id: 5, type: "fill_blank", question: "sheep 的复数形式是 ______", answer: "sheep", explanation: "sheep是单复数同形的名词" },
      { id: 6, type: "fill_blank", question: "watch 的复数形式是 ______", answer: "watches", explanation: "以-s, -x, -ch, -sh结尾的名词加-es" },
      { id: 7, type: "fill_blank", question: "tomato 的复数形式是 ______", answer: "tomatoes", explanation: "以-o结尾的有生命名词加-es" },
      { id: 8, type: "fill_blank", question: "child 的复数形式是 ______", answer: "children", explanation: "child是不规则变化，复数为children" },
      { id: 9, type: "fill_blank", question: "tooth 的复数形式是 ______", answer: "teeth", explanation: "tooth是不规则变化，复数为teeth" },
      { id: 10, type: "fill_blank", question: "foot 的复数形式是 ______", answer: "feet", explanation: "foot是不规则变化，复数为feet" },
    ],
  },
  {
    day: 2,
    title: "冠词专练",
    questions: [
      { id: 1, type: "multiple_choice", question: "There is _____ old woman in the car.", options: ["A. /", "B. the", "C. a", "D. an"], answer: "D", explanation: "old以元音音素开头，用an" },
      { id: 2, type: "multiple_choice", question: "Bill is _____ English teacher. He likes playing _____ football.", options: ["A. a, the", "B. an, the", "C. an, /", "D. /, /"], answer: "C", explanation: "English以元音音素开头用an；球类运动前不加冠词" },
      { id: 3, type: "multiple_choice", question: "The museum is quite far. It will take you half _____ hour to go there by _____ bus.", options: ["A. an, /", "B. an, a", "C. a, /", "D. /, /"], answer: "A", explanation: "hour以元音音素开头用an；by+交通工具不加冠词" },
      { id: 4, type: "multiple_choice", question: "This is _____ interesting story-book and it is also _____ useful one.", options: ["A. a, a", "B. an, an", "C. an, a", "D. a, an"], answer: "C", explanation: "interesting以元音音素开头用an；useful以辅音音素开头用a" },
      { id: 5, type: "multiple_choice", question: "_____ woman over there is _____ popular teacher in our school.", options: ["A. A, an", "B. The, a", "C. The, the", "D. A, the"], answer: "B", explanation: "特指用the；泛指用a" },
      { id: 6, type: "multiple_choice", question: "Australia is _____ English-speaking country.", options: ["A. a", "B. an", "C. the", "D. /"], answer: "B", explanation: "English-speaking以元音音素开头用an" },
      { id: 7, type: "multiple_choice", question: "This is _____ orange. _____ orange is on the table.", options: ["A. a, The", "B. an, The", "C. an, An", "D. the, An"], answer: "B", explanation: "第一次提到用an；第二次提到特指用The" },
      { id: 8, type: "multiple_choice", question: "Have you had _____ breakfast?", options: ["A. a", "B. an", "C. the", "D. /"], answer: "D", explanation: "三餐前一般不加冠词" },
    ],
  },
  {
    day: 3,
    title: "介词专练",
    questions: [
      { id: 1, type: "multiple_choice", question: "I get up _____ 7 o'clock every morning.", options: ["A. in", "B. on", "C. at"], answer: "C", explanation: "具体时刻前用at" },
      { id: 2, type: "multiple_choice", question: "My parents work _____ a hospital.", options: ["A. on", "B. in", "C. at"], answer: "B", explanation: "在大地点用in" },
      { id: 3, type: "multiple_choice", question: "Look! The birds are flying _____ the sky.", options: ["A. on", "B. in", "C. under"], answer: "B", explanation: "在天空中用in the sky" },
      { id: 4, type: "multiple_choice", question: "The book is _____ the desk. You can see it.", options: ["A. on", "B. behind", "C. under"], answer: "A", explanation: "能看到书，说明在桌子上面" },
      { id: 5, type: "multiple_choice", question: "We have a party _____ Christmas Day.", options: ["A. in", "B. on", "C. at"], answer: "B", explanation: "具体某一天用on" },
      { id: 6, type: "fill_blank", question: "My grandparents live _____ a small village.", answer: "in", explanation: "在村庄里用in" },
      { id: 7, type: "fill_blank", question: "Put your shoes _____ the bed.", answer: "under", explanation: "鞋子通常放在床底下" },
      { id: 8, type: "fill_blank", question: "The bus stops _____ the bus station.", answer: "at", explanation: "小地点前用at" },
    ],
  },
  {
    day: 4,
    title: "一般现在时专练",
    questions: [
      { id: 1, type: "sentence_transform", question: "We usually write e-mails on Saturday evening.（对划线部分提问）", answer: "What do you usually do on Saturday evening?", explanation: "对动作提问用What...do?" },
      { id: 2, type: "sentence_transform", question: "He lives in Shanghai.（变一般疑问句）", answer: "Does he live in Shanghai?", explanation: "第三人称单数用Does提问，动词还原" },
      { id: 3, type: "sentence_transform", question: "Tom and Sally like listening to music after school.（对划线部分提问）", answer: "When do Tom and Sally like listening to music?", explanation: "对时间提问用When" },
      { id: 4, type: "sentence_transform", question: "Helen usually watches TV in the evening.（变否定句）", answer: "Helen doesn't usually watch TV in the evening.", explanation: "第三人称单数否定用doesn't+动词原形" },
      { id: 5, type: "fill_blank", question: "Jim's father _____ (work) in a bank.", answer: "works", explanation: "第三人称单数一般现在时加-s" },
      { id: 6, type: "fill_blank", question: "He _____ (go) to work by bus every morning.", answer: "goes", explanation: "第三人称单数，go变goes" },
      { id: 7, type: "fill_blank", question: "Jim _____ (like) his father very much.", answer: "likes", explanation: "第三人称单数加-s" },
      { id: 8, type: "fill_blank", question: "They often _____ (play) badminton in front of their house.", answer: "play", explanation: "复数主语动词用原形" },
    ],
  },
];
