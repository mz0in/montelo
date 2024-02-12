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
  traceId: string;

  @ApiProperty()
  @IsString()
  envId: string;

  @ApiProperty()
  parentLogId: string | null;

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
  extra: any;

  static fromLog(log: Log): LogDto {
    const baseLog = omit(log, ["startTime", "endTime", "createdAt", "updatedAt"]);

    return {
      ...baseLog,
      startTime: log.startTime?.toISOString(),
      endTime: log.endTime?.toISOString(),
      parentLogId: baseLog.parentLogId || null,
    };
  }
}
