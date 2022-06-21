export class ErrorGroup extends Error {
  get messages(): string[] {
    return this.errors.map((v) => v.message);
  }

  constructor(public errors: Error[]) {
    const length = errors.length;
    const unit = length === 1 ? "error" : "errors";
    const sErrorList = errors.map((v) => `- ${v.message}`).join("\n");
    const message = `${length} ${unit}\n${sErrorList}`;
    super(message);
  }
}
