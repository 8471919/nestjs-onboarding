import { Controller, Get, Inject } from '@nestjs/common';
import {
  FindMembersInboundPort,
  FIND_MEMBERS_INBOUND_PORT,
} from '../inbound-port/find-members.inbound-port';

@Controller()
export class GetMembersController {
  constructor(
    // 토큰을 통해서 실제로 돌어오는건 port이다.
    // 내가 작성한 포트의 토큰을 주입하는데, 그 토큰의 실제 주인은 인터페이스이다.
    @Inject(FIND_MEMBERS_INBOUND_PORT)
    private readonly findMembersInboundPort: FindMembersInboundPort,
  ) {}

  @Get('/members')
  async handle() {
    return this.findMembersInboundPort.execute();
  }
}
