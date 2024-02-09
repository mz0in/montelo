import { v4 as uuidv4 } from "uuid";

export type TObject = { [Key in string]?: TData };

export interface TArray extends Array<TData> {}

export type TData = string | number | boolean | TObject | TArray | null;

interface LogData {
  input?: TData;
  output?: TData;

  /**
   * A name for the log.
   */
  name?: string;
  /**
   * The temperature of the model.
   */
  temperature?: number;
  /**
   * The name of the model.
   */
  model?: string;
  /**
   * The depth level relative to the root trace.
   */
  depth?: number;

  /**
   * Any other values.
   */
  [k: string]: TData;
}

class Run {
  private readonly runId: string;

  constructor() {
    this.runId = uuidv4();
  }

  public async log(data: LogData): Promise<void> {
    try {
      await fetch("http://localhost:3001/env/380a5884-6cc9-4997-9a25-905b24fe78ae/log", {
        method: "POST",
        headers: {},
        body: JSON.stringify(data),
      });
    } catch (e) {
      console.error("Montelo Error: ", e);
    }
  }
}

class Montelo {
  private currentRun: Run | null = null;

  public init(): void {
    this.currentRun = new Run();
  }

  public log(data: LogData): void {
    if (!this.currentRun) {
      console.warn("Montelo has not been initialized. Log entry discarded.");
      return;
    }

    // Log asynchronously but don't wait for it
    void this.currentRun.log(data);
  }
}

const montelo = new Montelo();

const main = async () => {
  montelo.init();
  const llmInput = [
    { role: "system", content: "some system content" },
    { role: "user", content: "some user content" },
  ];
  const llmOutput = {
    choices: [
      {
        message: {
          content: "wowza!",
        },
      },
    ],
    usage: {
      input: 1,
      output: 3,
      total: 4,
    },
  };
  montelo.log({ input: llmInput, output: llmOutput, a: "1", depth: 2 });
};

void main();
