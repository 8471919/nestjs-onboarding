import {
  FindMembersOutboundPort,
  FindMembersOutboundPortOutputDto,
} from '../outbound-port/find-members.outbound-port';
import { FindMembersService } from './find-members.service';

// Test할 때, DB가 망가질까봐 걱정할 필요가 없다.
// 왜냐하면, Service는 인터페이스만 알고 있다.
// 구현체(DB)랑 완전히 독립된 서비스의 로직이 되는 것.

class MockFindMembersOutboundPort implements FindMembersOutboundPort {
  private readonly result: FindMembersOutboundPortOutputDto;

  constructor(result: FindMembersOutboundPortOutputDto) {
    this.result = result;
  }

  async execute(params: void): Promise<FindMembersOutboundPortOutputDto> {
    return this.result;
  }
}

describe('FindMembersService Spec', () => {
  console.log(123);
  test('멤버 리스트를 반환한다', async () => {
    const member = [
      {
        name: 'A',
        email: 'A@gmail.com',
        phone: '010-1234-5678',
      },
    ];

    const findMembersService = new FindMembersService(
      new MockFindMembersOutboundPort(member),
    );

    const res = await findMembersService.execute();

    expect(res).toStrictEqual([
      {
        name: 'A',
        email: 'A@gmail.com',
        phone: '010-1234-5678',
      },
    ]);
  });
});
