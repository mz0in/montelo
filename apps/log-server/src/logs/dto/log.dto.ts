import { Log } from "@montelo/db";
import { ApiProperty } from "@nestjs/swagger";
import { omit } from "lodash";

export class LogDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  envId: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  model: string;

  @ApiProperty()
  input: any;

  @ApiProperty()
  output: any;

  @ApiProperty()
  startTime: string;

  @ApiProperty()
  endTime: string;

  @ApiProperty()
  duration: number;

  @ApiProperty()
  inputTokens: number;

  @ApiProperty()
  outputTokens: number;

  @ApiProperty()
  totalTokens: number;

  @ApiProperty()
  inputCost: number;

  @ApiProperty()
  outputCost: number;

  @ApiProperty()
  totalCost: number;

  @ApiProperty({ type: [String] })
  tags: string[];

  @ApiProperty()
  parentId: string | null;

  @ApiProperty()
  score: number | null;

  @ApiProperty()
  feedback: string | null;

  @ApiProperty()
  sessionId: string | null;

  @ApiProperty()
  userId: string | null;

  @ApiProperty({ type: "object" })
  extra: Record<string, any>;

  static fromLog(log: Log): LogDto {
    const baseDto = omit(log, ["createdAt", "updatedAt"]);

    return {
      ...baseDto,
      startTime: baseDto.startTime.toISOString(),
      endTime: baseDto.endTime.toISOString(),
      tags: baseDto.tags as [],
      extra: baseDto.extra as Record<string, any>,
    };
  }
}
