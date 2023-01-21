import { concurrent, map, pipe, toArray, toAsync } from '@fxts/core';
import { Inject } from '@nestjs/common';
import {
  FindChatRoomsByDogIdInboundPort,
  FindChatRoomsByDogIdInboundPortInputDto,
  FindChatRoomsByDogIdInboundPortOutputDto,
} from '../inbound-port/find-chat-rooms-by-dog-id.inbound-port';
import {
  GetChatRoomsOutboundPort,
  GET_CHAT_ROOMS_OUTBOUND_PORT,
} from '../outbound-port/get-chat-rooms.outbound-port';
import {
  GetLastMessageByChatRoomIdOutboundPort,
  GET_LAST_MESSAGE_BY_CHAT_ROOM_ID_OUTBOUND_PORT,
} from '../outbound-port/get-last-message-by-chat-room-id.outbound-port';

export class FindChatRoomsByDogIdService
  implements FindChatRoomsByDogIdInboundPort
{
  constructor(
    @Inject(GET_CHAT_ROOMS_OUTBOUND_PORT)
    private readonly getChatRoomsOutboundPort: GetChatRoomsOutboundPort,
    @Inject(GET_LAST_MESSAGE_BY_CHAT_ROOM_ID_OUTBOUND_PORT)
    private readonly getLastMessageByChatRoomIdOutboundPort: GetLastMessageByChatRoomIdOutboundPort,
  ) {}

  async execute(
    params: FindChatRoomsByDogIdInboundPortInputDto,
  ): Promise<FindChatRoomsByDogIdInboundPortOutputDto> {
    try {
      const roomsAsHost = this.getChatRoomsOutboundPort.execute({
        where: { dogId: params.dogId },
      });

      const roomsAsGuest = this.getChatRoomsOutboundPort.execute({
        where: { chatPairId: params.dogId },
      });

      const chatRooms = (await Promise.all([roomsAsHost, roomsAsGuest])).flat();

      const lastMessages = await pipe(
        chatRooms,
        map((room) => room.id),
        toAsync,
        map((chatRoomId) =>
          this.getLastMessageByChatRoomIdOutboundPort.execute({ chatRoomId }),
        ),
        concurrent(50),
        toArray,
      );

      return chatRooms
        .map((room, idx) => {
          const lastMessage = lastMessages[idx];

          return {
            id: room.id,
            chatPairDog: {
              id: room.pairDogId,
              name: room.pairDogName,
            },
            lastMessage: {
              id: lastMessage.id,
              text: lastMessage.text,
              createdAt: lastMessage.createdAt,
            },
          };
        })
        .sort((a, b) => b.lastMessage.createdAt - a.lastMessage.createdAt);
    } catch (e) {
      console.log(e);
    }
  }
}
