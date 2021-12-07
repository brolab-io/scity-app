export class TxError extends Error {
  code: number | string;
  message: string;
  data?: {
    code: number;
    data: string;
    message: string;
  };
  stack: string | undefined;
  constructor(error: any) {
    const { code, message, stack, data } = error;
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.data = data;
    this.name = "TxError";
    this.message = this.getMessage();
    this.stack = stack || new Error().stack;
  }

  getMessage() {
    if (this.code === 4001) {
      return "An error occurred: You have denied the transaction.";
    }
    if (this.data?.message.startsWith("execution reverted")) {
      return (
        "An error occurred:" +
        this.data.message.replace("execution reverted", "")
      );
    }
    return "Something went wrong, please try again later.";
  }
}
