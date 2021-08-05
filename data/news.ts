interface NewsMain {
  time: string;
  serialNo: number;
  headlines: string[];
  new?: boolean;
}


const NewsData:NewsMain[] = [
  {
    time: "9:00 pm",
    serialNo: 1,
    headlines: [
      "Bomb goes off",
      "Help me",
      "This is not fun"
    ]
  },
  {
    time: "9:15 pm",
    serialNo: 2,
    headlines: [
      "Trade towers fall",
      "All US stocks are down oops",
      "Invest in India lol"
    ]
  },
  {
    time: "9:30 pm",
    serialNo: 3,
    headlines: [
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, at.",
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illo nisi corrupti quidem delectus possimus rem similique exercitationem! Corporis, inventore beatae?",
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, at.",
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illo nisi corrupti quidem delectus possimus rem similique exercitationem! Corporis, inventore beatae?",
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, at.",
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illo nisi corrupti quidem delectus possimus rem similique exercitationem! Corporis, inventore beatae?"
    ]
  },
  {
    time: "9:45 pm",
    serialNo: 4,
    headlines: [
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illo nisi corrupti quidem delectus possimus rem similique exercitationem! Corporis, inventore beatae?",
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, at.",
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illo nisi corrupti quidem delectus possimus rem similique exercitationem! Corporis, inventore beatae?",
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, at.",
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illo nisi corrupti quidem delectus possimus rem similique exercitationem! Corporis, inventore beatae?",
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, at."
    ],
    new: true
  },

]

export default NewsData;