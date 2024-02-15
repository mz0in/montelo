import { Trace } from "@montelo/db";
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { omit } from "lodash";

export class TraceDto {
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
  userId: string | null;

  @ApiProperty()
  tags: string[];

  @ApiProperty()
  extra: any;

  static fromTrace(trace: Trace): TraceDto {
    return omit(trace, ["createdAt", "updatedAt"]);
  }
}
