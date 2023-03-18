import ASCClient, { ConnectionStatus, ApiEndpoint, ChannelRepository, ChannelType } from "@amityco/js-sdk";

// Amity sample-app apiKey
const apiKey = "b0e8e95e3b8fa6651834d849010b17dc865fd9e7bf676d78";
export const client = ASCClient.create({ apiKey, apiEndpoint: ApiEndpoint.SG });

export let currentUserId = null;

// promisified client connection
export const connectClient = async (userId) => {
  return new Promise((resolve) => {
    client.on("connectionStatusChanged", ({ newValue }) => {
      if (newValue === ConnectionStatus.Connected) {
        currentUserId = userId;
        resolve();
      }
    });

    client.registerSession({ userId });
  });
};

// create channel function
export const createChannel = async (userId) => {
  
  try {

    const channel = await ChannelRepository.createChannel({ type: ChannelType.Conversation, userIds
    : [userId, "bot"] });
    console.log('channel created:', channel);
    return channel;
  } catch (error) {
    console.error('failed to create channel', error);
  }
  
};