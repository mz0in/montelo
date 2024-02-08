import { ApiProperty } from "@nestjs/swagger";

class CostHistory {
  @ApiProperty()
  intervalStart: string;
  @ApiProperty()
  totalCost: number;
}

export class CostHistoryDto {
  @ApiProperty({
    type: [CostHistory],
  })
  costHistory: CostHistory[];
}
