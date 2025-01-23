export default class RSSFeed {
  public id: number;
  public Name: string;
  public Title: string;
  public Url: string;
  public Description: string;

  constructor({
    id,
    name,
    title,
    url,
    description,
  }: {
    id: number;
    name: string;
    title: string;
    url: string;
    description: string;
  }) {
    this.id = id;
    this.Name = name;
    this.Title = title;
    this.Url = url;
    this.Description = description;
  }

}

export { RSSFeed };
