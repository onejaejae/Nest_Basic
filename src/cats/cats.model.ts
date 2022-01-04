export type catType = {
  id: string;
  name: string;
  age: number;
  species: string;
  isCute: boolean;
  friends: string[];
};

export const Cat: catType[] = [
  {
    id: "asd",
    name: "blue",
    age: 8,
    species: "Russian Blue",
    isCute: true,
    friends: ["zxc", "zxczcv"],
  },
  {
    id: "zxc",
    name: "son",
    age: 18,
    species: "Sphynx cat",
    isCute: true,
    friends: ["asd", "zxczcv"],
  },
  {
    id: "zxczcv ",
    name: "won",
    age: 8,
    species: "Russian Yellow",
    isCute: true,
    friends: ["zxc"],
  },
  {
    id: "djklasd ",
    name: "jae",
    age: 28,
    species: "Russian Green",
    isCute: false,
    friends: [],
  },
];
