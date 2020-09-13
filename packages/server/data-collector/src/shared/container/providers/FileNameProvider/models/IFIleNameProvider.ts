export default interface IFileNameProvider {
  generate(prefix: string): string;
}
