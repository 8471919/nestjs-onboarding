// 인터페이스를 작성할 건데, 이 인터페이스를 통해서 함수를 실행하면, Member들이 나오기를 기대할 수 있다.
// 인터페이스는 하나의 일만 한다.

// 이 포트에 들어올 때, 어떤 input으로 들어올 지 타입을 정한다.
export type FindMembersInboundPortInputDto = void;

// 이 포트에서 나갈 때, 어떤 output으로 나갈 지 타입을 정한다.
export type FindMembersInboundPortOutputDto = Array<{
  name: string;
  email: string;
  phone: string;
}>;

// 토큰
export const FIND_MEMBERS_INBOUND_PORT = 'FIND_MEMBERS_INBOUND_PORT' as const;

// 이 인터페이스는 하나의 일만 한다. (멤버들을 찾는다)
export interface FindMembersInboundPort {
  execute(
    params: FindMembersInboundPortInputDto,
  ): Promise<FindMembersInboundPortOutputDto>;
}

// 서비스 로직 마다 인터페이스를 하나씩 만들어 주어야 한다.
