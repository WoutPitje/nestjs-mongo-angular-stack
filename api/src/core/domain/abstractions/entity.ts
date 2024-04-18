export abstract class Entity {
  public createdAt: Date;
  public updatedAt: Date;

  public updated() {
    this.updatedAt = new Date();
  }

  public created() {
    this.createdAt = new Date();
  }
}
