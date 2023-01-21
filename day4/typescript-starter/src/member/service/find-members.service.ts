import { Inject } from '@nestjs/common';
import {
  FindMembersInboundPort,
  FindMembersInboundPortInputDto,
  FindMembersInboundPortOutputDto,
} from 'src/member/inbound-port/find-members.inbound-port';
import {
  FindMembersOutboundPort,
  FIND_MEMBERS_OUTBOUND_PORT,
} from '../outbound-port/find-members.outbound-port';

export class FindMembersService implements FindMembersInboundPort {
  constructor(
    @Inject(FIND_MEMBERS_OUTBOUND_PORT)
    private readonly findMembersOutboundPort: FindMembersOutboundPort,
  ) {}

  async execute(
    params: FindMembersInboundPortInputDto,
  ): Promise<FindMembersInboundPortOutputDto> {
    return this.findMembersOutboundPort.execute();
  }
}
