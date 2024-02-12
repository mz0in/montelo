import { Log } from "@montelo/db";
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { omit } from "lodash";

export class LogDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  envId: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
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

  @ApiProperty()
  tags: any;

  @ApiProperty()
  extra: any;

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

  static fromLog(log: Log): LogDto {
    const baseLog = omit(log, ["startTime", "endTime", "createdAt", "updatedAt"]);

    return {
      ...baseLog,
      startTime: log.startTime?.toISOString(),
      endTime: log.endTime?.toISOString(),
      parentId: baseLog.parentId || null,
      score: baseLog.score || null,
      feedback: baseLog.feedback || null,
      sessionId: baseLog.sessionId || null,
      userId: baseLog.userId || null,
    };
  }
}
