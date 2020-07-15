import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import axios from 'axios';

interface PushNotificationDTO {
  expoPushToken: string;
  sound: string;
  title: string;
  body: string;
  data: object;
}

export const getPushNotificationToken = async (): Promise<
  Notifications.ExpoPushToken
> => {
  return Notifications.getExpoPushTokenAsync();
};

export const getPushNotificationPermissions = async (): Promise<void> => {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS,
  );

  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    return;
  }

  getPushNotificationToken();
};

export const sendPushNotification = async ({
  expoPushToken,
  sound,
  title,
  body,
  data,
}: PushNotificationDTO): Promise<void> => {
  const message = {
    to: expoPushToken,
    sound,
    title,
    body,
    data,
  };

  await axios.post(
    'https://exp.host/--/api/v2/push/send',
    JSON.stringify(message),
    {
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
    },
  );
};
