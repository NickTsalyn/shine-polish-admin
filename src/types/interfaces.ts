interface Item {
  title: string;
  description: string;
}

interface Services {
  title: string;
  text: string;
  item: Item[];
  summary?: string;
}

type Paragraph = {
  p: string;
};

export interface RoomService {
  title: string;
  paragraph: Paragraph[];
  description: string;
  processes: Services[];
  frequencies: Services[];
  need: Services[];
}
