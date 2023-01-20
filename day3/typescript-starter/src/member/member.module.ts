import { Module } from '@nestjs/common';
import { GetMembersController } from './controller/member.controller';
import { FIND_MEMBERS_INBOUND_PORT } from './inbound-port/find-members.inbound-port';
import { FindMembersRepository } from './outbound-adapter/find-members.repository';
import { FIND_MEMBERS_OUTBOUND_PORT } from './outbound-port/find-members.outbound-port';
import { FindMembersService } from './service/find-members.service';

@Module({
  controllers: [GetMembersController],
  providers: [
    // inbound-port
    // 내가 이런 인터페이스를 만들었는데, 이 인터페이스의 토큰은 이거야.
    // 예를 실제로 구현한 구현체는 service에 있어.
    {
      provide: FIND_MEMBERS_INBOUND_PORT,
      useClass: FindMembersService,
    },

    // outbound-port
    {
      provide: FIND_MEMBERS_OUTBOUND_PORT,
      useClass: FindMembersRepository,
    },
  ],
})
export class MemberModule {}
