import { ApiProperty } from "@nestjs/swagger";

export class CreateLogInput {
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

  @ApiProperty({
    example: ["some tag"],
  })
  tags: string[];

  @ApiProperty({
    example: null,
  })
  score: number | null;

  @ApiProperty({
    example: null,
  })
  feedback: string | null;

  @ApiProperty({
    example: null,
  })
  sessionId: string | null;

  @ApiProperty({
    example: null,
  })
  userId: string | null;

  @ApiProperty({ type: "object" })
  extra: Record<string, any>;
}
