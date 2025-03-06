export class Config {
  public databaseUrl: string;
  public httpPort: number;

  constructor() {
    this.databaseUrl = process.env.DATABASE_URL || "";
    if (!this.databaseUrl) {
      throw new Error("DATABASE_URL is not set");
    }

    this.httpPort = parseInt(process.env.HTTP_PORT || "3000");
  }
}
