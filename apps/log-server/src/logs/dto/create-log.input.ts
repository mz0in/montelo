import { ApiProperty } from "@nestjs/swagger";

export class LogInput {
  @ApiProperty({
    example: "Agent X",
  })
  name: string;

  @ApiProperty({
    example: "gpt-4",
  })
  model: string;

  @ApiProperty({
    example: "What is your name?",
  })
  input: any;

  @ApiProperty({
    example: "I am an AI. I do not have a name.",
  })
  output: any;

  @ApiProperty({
    example: "2024-02-12T03:55:29.161Z",
  })
  startTime: string;

  @ApiProperty({
    example: "2024-02-12T03:56:29.161Z",
  })
  endTime: string;

  @ApiProperty({
    example: 1.32,
  })
  duration: number;

  @ApiProperty({
    example: 5,
  })
  inputTokens: number;

  @ApiProperty({
    example: 5,
  })
  outputTokens: number;

  @ApiProperty({
    example: 10,
  })
  totalTokens: number;

  @ApiProperty({ type: "object" })
  extra: Record<string, any>;
}

export class TraceInput {
  @ApiProperty({
    example: "clsj9nupk000108jp9pxdcx5c",
  })
  id: string;

  @ApiProperty({
    example: "Top-level Trace",
  })
  name: string;

  @ApiProperty({
    nullable: true,
    type: String,
    example: null,
  })
  userId: string | null;

  @ApiProperty({
    example: null,
  })
  extra: Record<string, any> | null;
}

export class CreateLogInput {
  @ApiProperty()
  log: LogInput;

  @ApiProperty({
    type: TraceInput,
    example: {
      id: "clsj9nupk000108jp9pxdcx5c",
      name: "Top-level Trace",
      userId: null,
      extra: null,
    },
  })
  trace: TraceInput | null;
}
