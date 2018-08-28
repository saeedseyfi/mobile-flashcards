import {AsyncStorage} from 'react-native';
import {Notifications, Permissions} from 'expo';

const KEY = 'mobile-flashcards:notifications';

export const removeExistingNotification = () =>
    AsyncStorage
        .removeItem(KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync);

export const setNotification = () =>
    AsyncStorage.getItem(KEY)
        .then(JSON.parse)
        .then((json) => {
            if (!json) {
                return;
            }

            Permissions.askAsync(Permissions.NOTIFICATIONS)
                .then(({status}) => {
                    if (status !== 'granted') {
                        console.log('user did not consent');
                        return;
                    }

                    Notifications.cancelAllScheduledNotificationsAsync();
                    Notifications.scheduleLocalNotificationAsync(
                        {
                            title: 'Quiz time!',
                            body: 'Remember to do your daily quiz!',
                            ios: {
                                sound: true
                            },
                            android: {
                                sound: true
                            }
                        },
                        {
                            time: getDateTomorrow(),
                            repeat: 'day'
                        },
                    );

                    AsyncStorage.setItem(KEY, JSON.stringify(true));
                });
        });

const getDateTomorrow = () => {
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(20);
    tomorrow.setMinutes(0);
    return tomorrow;
};
