export type ProjectDataType = [{
  id: string,
  name: string,
  team: [
    {
      id:string,
      name:string,
      initials: string,
      image:string
    }
  ],
  tags: [string],
  color: string,
  logo: string,
}]

export const projectData: ProjectDataType = [
  {
    id: "41233",
    name: "Child with Pancreatitis Symptoms ER",
    tags: ['Pediatric', 'ER'],
    team: [
      {id: '120', name: 'Mary D', initials: 'MD', image: "https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"},
      {id: '350', name: 'John M', initials: 'JM', image: ''},
      {id: '720', name: 'John M', initials: 'SL', image: ''},
    ],
    color: "#EFACB8",
    logo: "https://logos-world.net/wp-content/uploads/2024/12/UCSF-Logo.png"
  },
  {
    id: "43432",
    name: "GI Bleed for Older Adult",
    tags: ['Gastroenterology', 'ER'],
    team: [
      {id:'965', name: 'John M', initials: 'JM', image: 'https://api.dicebear.com/8.x/fun-emoji/svg?seed=Surfer'},
      {id:'865', name: 'John M', initials: 'FN', image: ''},
      {id:'144', name: 'John M', initials: 'SW', image: ''},
      {id:'755', name: 'John M', initials: 'TD', image: ''},
    ],
    color: "#8BCEB6",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwBgmikc2JTlPK1cYYGeNGPNXMUBV5tanMAg&s"
  },
  {
    id: "12345",
    name: "Bleeding Ulcer",
    tags: ['Gastroenterology', 'Older Adult'],
    team: [
      {id:'453', name: 'John M', initials: 'JM', image: 'https://api.dicebear.com/8.x/fun-emoji/svg?seed=Mittens'},
      {id:'454', name: 'Alan T.', initials: 'AT', image: ''},
      {id:'864', name: 'Tony D.', initials: 'TD', image: ''},
      {id:'964', name: 'John M', initials: 'JM', image: ''},
    ],
    color: "#8BCEB6",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwBgmikc2JTlPK1cYYGeNGPNXMUBV5tanMAg&s"
  }
]
