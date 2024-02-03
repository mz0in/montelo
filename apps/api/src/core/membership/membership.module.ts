import { Module } from "@nestjs/common";

import { DatabaseModule } from "../../database";
import { MembershipController } from "./membership.controller";
import { MembershipService } from "./membership.service";

@Module({
  imports: [DatabaseModule],
  controllers: [MembershipController],
  providers: [MembershipService],
  exports: [MembershipService],
})
export class MembershipModule {}
