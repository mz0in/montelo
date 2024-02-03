import { Log } from "@montelo/db";
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import _ from "lodash";

export class LogDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  messages: any;

  @ApiProperty()
  @IsString()
  model: string;

  @ApiProperty()
  rawInput: any;

  @ApiProperty()
  rawOutput: any;

  @ApiProperty()
  startTime: string;

  @ApiProperty()
  endTime: string;

  @ApiProperty()
  duration: number;

  @ApiProperty()
  inputTokenCount: number;

  @ApiProperty()
  outputTokenCount: number;

  @ApiProperty()
  totalTokenCount: number;

  static fromLog(log: Log): LogDto {
    const baseLog = _.pick(log, [
      "id",
      "messages",
      "model",
      "rawInput",
      "rawOutput",
      "duration",
      "inputTokenCount",
      "outputTokenCount",
      "totalTokenCount",
    ]);

    return {
      ...baseLog,
      startTime: log.startTime.toISOString(),
      endTime: log.endTime.toISOString(),
    };
  }
}
