export type MenuProps = {
  data: [
    {
      title: string;
      menuItem: string;
      src: string;
    }
  ];
  setVisible?: any;
};

export type MenuItem = {
  id?: number;
  name?: string;
  price?: number;
  image?: string;
  description?: string;
  category?: string;
};

export type User = {
  username: string;
  password: string;
  id: string
};

export type Order = {
  id: number;
  name: string;
  price: number;
  img: string;
  quantity: number;
}